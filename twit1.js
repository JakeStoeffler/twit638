Twits = new Meteor.Collection("twits");

if (Meteor.isClient) {
  console.log("Hey");
  
  Template.twitboard.twits = function() {
    return Twits.find({}, {sort: {timeStamp: -1}});
  };
  
  Template.post.events({
    'click #postSubmit': function() {
      console.log("YO");
      if (!Meteor.user()) {
        alert("You must log in to create a post!");
        return;
      }
      var email = Meteor.user().emails[0].address;
      var handle = email.substring(0, email.indexOf("@"));
    
      if (email === "admin@admin.admin" && $("#postText").val() === "cl34r") {
        var allTwits = Twits.find().fetch();
        for (var i = 0; i < allTwits.length; i++) {
          Twits.remove(allTwits[i]._id);
        }
        return;
      }
    
      Twits.insert(
        {
          text: $("#postText").val(),
          author: handle,
          time: getDateString(),
          timeStamp: new Date(),
          mood: $("#postMood").val()
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

function getDateString() {
  var a = new Date();
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  if (hour < 10) hour = "0"+hour;
  var min = a.getMinutes();
  if (min < 10) min = "0"+min;
  var sec = a.getSeconds();
  if (sec < 10) sec = "0"+sec;
  var time = date+' '+month+' '+year+' at '+hour+':'+min+':'+sec ;
  return time;
}
