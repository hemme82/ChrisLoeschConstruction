$(document).ready(function(){
    // first side nav is id. second is method from materialize
    $('.sidenav').sidenav();
    $('.materialboxed').materialbox();
    $('.parallax').parallax();
    $('.scrollspy').scrollSpy();
     //init carousel
    var slider = $('.carousel');
    slider.carousel();
    //  add a new item
	// slider.append(
    //     '<a class="carousel-item active" href="#eleven!"><img src="http://lorempixel.com/250/250/nature/3"></a>');
     
        var arrayOfImages = [];
        var storageReference = firebase.storage().ref();
        var folderRef = storageReference.child("images");
    
        folderRef
            .listAll()
            .then(result => {
                // result.prefixes.forEach(folderRef => {
                //     console.log("folder == ", folderRef);
                // });
                result.items.forEach(itemRef => {
                    itemRef.getDownloadURL().then(url => {
                        slider.append(`
                        <a class="carousel-item"><img src=${url}></a>
                        `);
                        if (slider.hasClass('initialized')){
                            slider.removeClass('initialized')
                            }
                
                            //just reinit the carousel
                            slider.carousel();
                            
                            
                        console.log(url);
                            arrayOfImages.push(url);
                        
                    })
                    
                });
                console.log(arrayOfImages);
            })
            // .catch(error => {
            //     console.log("error == ", error);
            // });
    
        
        // arrayOfImages.forEach(link => {
        //     console.log(link);
        //     slider.append(
        //         '<a class="carousel-item active" href="#eleven!"><img src="http://lorempixel.com/250/250/nature/3"></a>');
            
            // let carousel = document.createElement("div");
            // carousel.className = "carousel-item";
            // carousel.innerHTML = '<img src="img/floor_plan.jpg">';
            // document.body.append(carousel);

            //remove the 'initialized' class which prevents slider from initializing itself again when it's not needed
            
    
    

    // $('#logout').hide();
    // $('#uploadPic').hide();

    $("#buttonAdmin").click(function(){
        $("#loginForm").toggle(500);
    });
})

document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
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
            if(percentage == 100){
                setTimeout(
                    function() 
                    {
                        $('#modal-create').hide();
                    }, 500);
            }
        },

        function error(err) {

        },

        function complete() {
            // storageRef.getDownloadURL().then(function(url){
            //     var img = document.getElementById('testID');
            //     img.src = url;
            //     console.log(url);
                
                
            // })

        }
    )
})



