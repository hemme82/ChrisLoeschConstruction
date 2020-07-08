var arrayOfImages = [];
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
                            
                            
                        console.log(itemRef.location.path_);
                        console.log(itemRef.name);
                            arrayOfImages.push(url);
                        
                    })
                    
                });
                console.log(arrayOfImages);
            })
            // .catch(error => {
            //     console.log("error == ", error);
            // });
    

    $("#buttonAdmin").click(function(){
        $("#loginForm").toggle(500);
    });
    $("#buttonDelete").click(function(){
        $("#deleteForm").toggle(500);
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
            if(percentage == 100){
                
                setTimeout(
                    function() 
                    {
                        $('#modal-create').hide();
                        
                    }, 500);
                    window.location.reload();     
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
//list of images for delete modal
var storageReference = firebase.storage().ref();
var folderRef = storageReference.child("images");


    
        folderRef
            .listAll()
            .then(result => {
                
                result.items.forEach(itemRef => {
                    itemRef.getDownloadURL().then(url => {
                        $("#delete-form").append(`
                            
                        

                            <div>
                                <img class="responsive-img" src=${url}>
                            </div>
                        
                        <input class="btn yellow darken-2 z-depth-0 id=${itemRef.location.path_} type="button" value="Delete" onClick="deletePic(this.id)">  
                            
                         `)
                        //  var pictureID = document.getElementById(itemRef.location.path_);
                        //  console.log(pictureID);
                        //  var pictureRef = storageReference.child(pictureID);
                        //  console.log(pictureRef);
                        //     pictureRef.addEventListener("click", e => {
                        //         confirm("Picture will be deleted")
                        //         //delete the file
                        //         pictureRef.delete().then(function() {
                                
                        // })
                        //     });
                            
                    });
                    
                });
                
            })
            function deletePic(clicked_id){
                var storage = firebase.storage();
                var storageRef = storage.ref();
                // Create a child reference
                // var imagesRef = storageRef.child('images');
                console.log(clicked_id);
                var spaceRef = storageRef.child("images/" + clicked_id);
                    console.log("SpaceRef " + spaceRef);
                if(confirm("Picture will be deleted")){
                    spaceRef.delete().then(function(){
                    }).catch(function(error){
                        console.log(error);
                    })
                    window.location.reload();
                    }else{return false
                        window.location.reload();};
                
                console.log("I'm clicked")
            }







