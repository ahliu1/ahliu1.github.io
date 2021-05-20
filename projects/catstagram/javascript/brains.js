var counter1 = 0;
var counter2 = 0;
var counter3 = 0;
var counter4 = 0;
var counter5 = 0;

function likePhoto(numPhoto){
    if (numPhoto === 1){
        counter1 = counter1 + 1;
        document.getElementById("likeCount1").innerHTML = counter1;
    } else if (numPhoto === 2){
        counter2 = counter2 + 1;
        document.getElementById("likeCount2").innerHTML = counter2;
    } else if (numPhoto === 3){
        counter3 = counter3 + 1;
        document.getElementById("likeCount3").innerHTML = counter3;
    } else if (numPhoto === 4){
        counter4 = counter4 + 1;
        document.getElementById("likeCount4").innerHTML = counter4;
    } else {
        counter5 = counter5 + 1;
        document.getElementById("likeCount5").innerHTML = counter5;
    }
}

var user = {
  "name" : "amy",
  "name_last" : "liu",
  "followers" : ["mum", "dad", "scarlett", "friend", "bestie"],
  "profile_pic" : "https://i.pinimg.com/originals/b9/7e/23/b97e23ea82ddc2589ae3810e459e480c.jpg"
}

setTimeout(function(){ document.getElementById("name").innerHTML = user.name;}, 3000);
setTimeout(function(){ document.getElementById("name_last").innerHTML = user.name_last;}, 3000);
setTimeout(function(){ document.getElementById("followers").innerHTML = "Followers: " + user.followers.length;}, 3000);
setTimeout(function(){ $("#profile_pic").attr("src", user.profile_pic);}, 3000);