Twits = new Meteor.Collection("twits");

if (Meteor.isClient) {
  console.log("Hey");
  
  Template.twitboard.twits = function() {
    return Twits.find();
  };
  
  $("button").on("click", function() {
    console.log("YO");
    Twits.insert(
      {
        text: $("#postText").val(),
        author: "Bob",
        time: new Date().getTime().toString()
      });
    return false;
  });
  
  Template.post.events({
    'click #postSubmit': function() {
      console.log("YO");
      Twits.insert(
        {
          text: $("#postText").val(),
          author: "Bob",
          time: new Date().getTime().toString()
        });
      return false;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
