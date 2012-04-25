$(function(){
  $(document).on("click", "button.cross", function(){
    var story_id = $(this).parent().parent().attr("id");
    var form = $("#new_todo");

    form.show().css({ top:$(this).parent().position().top + 5 });

    form.find("textarea").focus()
    form.find("input[name='sotry_id']").val(story_id)
    
  });
})