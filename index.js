// main document ready function to check if dom is loaded fully or not

let facebookToken;



$(document).ready(() => {

   


//diaplay user info
    $("#link1").click(()=>{
        $(".feedData").fadeOut();
        $(".rowStyle1").fadeOut();
        $(".rowStyle").fadeIn();
    }) ;

// display feed data
    $("#link2").click(()=>{
        $(".rowStyle").fadeOut();
        $(".rowStyle1").fadeOut();
        $(".feedData").fadeIn();
    }) ;

    
// navbar operation
$("#navv1").click(()=>{
        $(".feedData").fadeOut();
        $(".rowStyle1").fadeOut();
        $(".rowStyle").fadeIn();
    }) ;


//take token as prompt

    facebookToken = prompt("Please enter your Facebook Token:", "");

    if (facebookToken == null || facebookToken == "") {

        alert("No user Token found");

    } else {

        getUserDetails();

    } // end if condition

}); // end document.ready function

//Function for getting user information
let getUserDetails = () => {


    // API call to get user details

    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://graph.facebook.com/me?fields=id,email,birthday,hometown,gender,age_range,relationship_status,cover,picture.type(large),posts{created_time,type,full_picture,story,story_tags,message,source,likes,comments,with_tags,link},name&access_token=' + facebookToken,

        success: (response) => {

            $('#mainData').css('display', 'block');

            console.log(response);

            
            $('#userName').append(response.name);
            $("#myEmail").append(response.email);
            $("#myProfileId").html('<a target="blank" href="https://facebook.com/'+response.id+'">https://facebook.com/'+response.id+'</a>');
            $("#myHomeTown").append(response.hometown.name);
            $("#myBirthday").append(response.birthday);
            $("#myGender").append(response.gender);
            $("#myRelation").append(response.relationship_status);
            
            $('#profilePhoto').html('<img src="' + response.picture.data.url + '" class="img-fluid profileHeight"/>');

            $('#cover').css('background-image', 'url(' + response.cover.source + ')');

            
        //get feed data
            let myFeed = $.map(response.posts.data, function(x) 
                    {
                        
                            //for status
                            if (x.type == "status") {
                                return "<p>"+x.story +"</p>"+ "<br>" + "<p>"+x.message +"</p>"+"<br>"+"<hr>"+"<br>";
                            
                              }

                              //for photo
                              else if (x.type == "photo") {
                                  let images ="<p>"+ x.story +"</p>"+"<br>" + "<img src=" + x.full_picture+">" +"<br>"+"<hr>"+"<br>";
                                  
                                  return images;
                                
                              }

                    
                                //for video
                              else if (x.type == "video"){
                            let videos = "<p>"+ x.story +"</p>"+"<br>"+"<video controls src=" + "" + x.source + " " + "type= " + "video/mp4" + " height='200vmax' width='200vmax'></video>"+"<br>";    
                            
                            return videos;      
                        }
                              
                              
                              
                    
                                });
                   $("#myFeed").html(myFeed);

                    }, 

            //timeout in msec
            timeout: 5000,
            //in case of error 
        error: (err) => {

            console.log(err.responseJSON.error.message);
            alert(err.responseJSON.error.message)

        },

            

    });// end ajax call 

}