$(function(){
  $(document).on("click", "button.cross", function(){ 
    $(this).hide();
    $(this).parent().find(".create_todo").show();
  });
})