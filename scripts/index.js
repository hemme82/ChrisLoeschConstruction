$(document).ready(function(){
    // first side nav is id. second is method from materialize
    $('.sidenav').sidenav();
    $('.materialboxed').materialbox();
    $('.parallax').parallax();
    $('.carousel').carousel();
    $('.scrollspy').scrollSpy();



    // $('#logout').hide();
    // $('#uploadPic').hide();

    $("#buttonAdmin").click(function(){
        $("#loginForm").toggle(500);
    });
})

document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });

var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');


//listen for file selection
fileButton.addEventListener('change', function(e) {
    //get file
    var file = e.target.files[0];
    // create a storage ref
    var storageRef = firebase.storage().ref('images/' + file.name);

    //upload file
    var task = storageRef.put(file);
    //update progress bar
    task.on('state_changed', 

        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;
            console.log(percentage);
        },

        function error(err) {

        },

        function complete() {
            storageRef.getDownloadURL().then(function(url){
                var img = document.getElementById('testID');
                img.src = url;
                console.log(url);
            })

        }
    )
})

