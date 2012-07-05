Stories = new Meteor.Collection("stories");
Todos = new Meteor.Collection("todos");

if(Meteor.is_client){

  Template.stories_list.stories = function(){
    return Stories.find({}, {sort: {points: -1}})
  };

  Template.new_story.events = {
    'click button': function(){
      if($("input[name='title']").val() !== ""){
        Stories.insert({
          title: $("input[name='title']").val(),
          points: $("input[name='points']").val()
        });
        return $("input").val("");
      }
    },
    'keydown': function(event){
      if (event.keyCode === 13 && $("input[name='title']").val() !== "") {
        event.preventDefault();
        Stories.insert({
          title: $("input[name='title']").val(),
          points: $("input[name='points']").val()
        });
        return $("input").val("");
      }
    }
  };

  Template.todos_list.todos = function(){
    return Todos.find({story_id:this._id, status:"todo"})
  };

  Template.wip_list.todos = function(){
    return Todos.find({story_id:this._id, status:"wip"})
  };

  Template.verify_list.todos = function(){
    return Todos.find({story_id:this._id, status:"verify"})
  };

  Template.done_list.todos = function(){
    return Todos.find({story_id:this._id, status:"done"})
  };

  Template.new_todo.events = {
    'click button.create_todo_btn':function(){
      if($("textarea").val() !== ""){
        Todos.insert({
          text: $("textarea").val(),
          status: "todo",
          person: $("input[name='person']").val(),
          story_id: $("input[name='sotry_id']").val()
        });
        return $("textarea, input[name='person']").val(""), $("#new_todo").hide();
      };
    },
    'keydown': function(event){
      if (event.keyCode === 13 && $("input[name='text']").val() !== "") {
        event.preventDefault();
        Todos.insert({
          text: $("textarea").val(),
          status: "todo",
          person: $("input[name='person']").val(),
          story_id: $("input[name='sotry_id']").val()
        });
        return $("textarea, input[name='person']").val(""), $("#new_todo").hide();
      }
    }
  };
};

if (Meteor.is_server) {
  Meteor.startup(function () {
    if (Stories.find().count() === 0) {
      console.log("OK")
    }
  });
}
