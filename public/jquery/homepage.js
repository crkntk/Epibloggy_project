


console.log("IT LOADED!!!!!");


$(".btn-delete").on("click",function() {
    var usern = $("h1").attr("id");
    var id = $(this).attr("id");
    console.log("Ran the delete rout");
    console.log(usern);
    url = "/delete-post";
    data = {
        id: $(this).attr("id"),
        username: usern
    };
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-delete-modal",
          cancelButton: "btn btn-cancel-modal"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "Post " + $("#" +  id + ".post-item" + " .post-title").text() + " will be deleted",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    console.log($("#" +  data + ".post-item"));
                    
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your post has been deleted.",
                        icon: "success",
                        showConfirmButton: false,
                        timer:1500
                      });
                      setTimeout(function() {
                      $("#" +  data + ".post-item" ).animate({
                        opacity: 0.25,
                        top: "+=50",
                        width: "toggle"
                      }, 1000, function() {
                        // Animation complete.
                      });
                    },1500);
                },
                data: data
              })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
            Swal.fire({
                title: "Cancelled",
                text: "Your Post was not deleted :)",
                icon: "error",
                showConfirmButton: false,
                timer:1500
              });
          
        }
      });
    });

    $("#new-post-btn").on("click", async function (){
      var usern = $("h1").attr("id");
      var url = "/newPost";
      var title = $("#"+"new-post-title").val();
      var content = $("#" + "new-content").val();
      console.log(title, content);
      var dataPost = {
        id: "",
        title: title,
        content: content,
        username: usern
    };
      $.ajax({
        type: "POST",
        url: url,
        data: dataPost,
        success: function (data) {
            console.log(data);
           const postData = `<div id = "${data.id}" class="post-item" style="opacity: 0">
                <div class="border-post">
                    <h3 class="post-title">${data.title}</a></h3>
                    <p class="post-content">${data.content}</p>
                    <p class = "post-time">Posted on ${data.date} at ${data.time}</p>
                    <hr>
                    <button id = "${data.id}" type="button" class="btn btn-outline-update">Update</button>
                    <button id = "${data.id}"  type="button" class="btn btn-delete">Delete</button>
                </div>
        </div>`;
        //$("#"+"new-post-title").val("");
         // $("#" + "new-content").val("Write New Post..");
            $(".posts-container").prepend(postData);
              $("#" +  data.id ).animate({
                opacity: 1,
              }, 1500)
           
        }
    });
    });
  

      $(".btn-outline-update").on("click", async function (){
        var usern = $("h1").attr("id");
        var id = $(this).attr("id");
        var url = "/edit-post/" + id;
        var title = $("#" +  id + ".post-item" + " .post-title").text();
        var content = $("#" +  id + ".post-item" + " .post-content").text();
        //var updated_title = prompt("Enter new title:", title);
        //var updated_content = prompt("Enter new content:", content);
        
        const { value: updatedtitle } =  await Swal.fire({
            title: "Updated Title",
            input: "text",
            inputLabel: "New Title",
            inputPlaceholder: "Title",
            inputValue: title,
            confirmButtonText: "next",
            inputValue: title,
            inputAttributes: {
              "aria-label": "Type your message here"
            },
            showCancelButton: true
          });
          if (updatedtitle) {
            Swal.fire("Updated title is: " + updatedtitle);
          }
        const { value: updatedContent } = await Swal.fire({
            input: "textarea",
            inputLabel: "Content",
            inputPlaceholder: "Update content text here...",
            confirmButtonText: "Update",
            inputValue: content,
            inputAttributes: {
              "aria-label": "Type your message here"
            },
            showCancelButton: true
          });
          if (updatedContent) {
            Swal.fire(updatedContent);
          }


            if(updatedContent || updatedtitle){
                const dataUpdate = {
                    id: id,
                    title: updatedtitle,
                    content: updatedContent,
                    username: usern
                };
            $.ajax({
                type: "PUT",
                url: "update-post",
                data: dataUpdate,
                success: function (data) {
                    console.log(data);
                   // $("#" +  id + ".post-item" + " .post-title").text(updatedtitle);
                    //$("#" +  id + ".post-item" + " .post-content").text(updatedContent);

                    console.log($("#" +  data + ".post-item"));
                    
                      Swal.fire({
                        title: "Updated!",
                        text: "Your post has been updated.",
                        icon: "success",
                        showConfirmButton: false,
                        timer:1500
                      });

                      if(updatedtitle){
                      setTimeout(function() {
                      $("#" +  data + ".post-item" + " .post-title" ).animate({
                        opacity: 0.25,
                      }, 1500, function() {
                        // Animation complete.
                        $("#" +  data + ".post-item" + " .post-title" ).text(updatedtitle);
                        $("#" +  data + ".post-item" + " .post-title" ).animate({
                            opacity: 1,
                          }, 1500, function() {
                            // Animation complete.
                            
                          });
                      });
                    },1500);
                }
                if(updatedContent){
                    setTimeout(function() {
                        $("#" +  data + ".post-item" + " .post-content" ).animate({
                          opacity: 0.25,
                        }, 1500, function() {
                          // Animation complete.
                          $("#" +  data + ".post-item" + " .post-content" ).text(updatedContent);
                          $("#" +  data + ".post-item" + " .post-content" ).animate({
                              opacity: 1,
                            }, 1500, function() {
                              // Animation complete.
                              
                            });
                        });
                      },1500);


                }



                }
            });
        }
        
      });
