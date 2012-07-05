$(function(){
  $(document).on("click", "button.cross", function(){

    var story_id = $(this).parent().parent().attr("id");
    var form = $("#new_todo");

    form.show().css({ top:$(this).parent().position().top + 5 });

    form.find("textarea").focus()
    form.find("input[name='sotry_id']").val(story_id)
    
  });

  $(document).bind("DOMSubtreeModified",function(){
    initSortable();
  })

  var currentTodo, 
      currentStatus, 
      currentStory

  var initSortable = function(){

    var updateCurrentTodo = function(item){
      item.parent().effect("highlight", {}, 1000);
      item.remove();
    }

    $(".sortable").sortable({
      connectWith:".sortable",
      forcePlaceholderSize:true,
      tolerance:'pointer',
      start: function(e, ui) { ui.item.addClass("dragging"); console.log(ui.item) },
      stop: function(e, ui) { ui.item.removeClass("dragging") },
      update:function(e, ui){
        currentTodo = ui.item.attr("id");
        currentStatus = ui.item.parent().data("status");
        currentStory = ui.item.parent().parent().attr("id");
        Todos.update(currentTodo, { $set : { status:currentStatus, story_id:currentStory }}, updateCurrentTodo(ui.item))
      }
    }).disableSelection()

    $("tbody").sortable({
      handle: 'td:eq(0)',
      opacity: 0.6,
      start: function(e, ui) { ui.item.addClass("sorting-story") },
      stop: function(e, ui) { ui.item.removeClass("sorting-story") }
    }).disableSelection()
  }

})