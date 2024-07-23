console.log("IT LOADED!!!!!");
$(".btn-delete").hover(
    function() {
        $(this).css("background-color", "#D71313");
        $(this).css("color", "white");
    },
    function() {
        $(this).css("background-color", "white");
        $(this).css("color", "#D71313");
    }
);

$(".btn-outline-update").hover(
    function() {
        $(this).css("background-color", "#378CE7");
        $(this).css("color", "white");
    },
    function() {
        $(this).css("background-color", "white");
        $(this).css("color", "#378CE7");
    }
);

$(".btn-delete").on("click",function() {
    var usern = $("h1").attr("id");
    console.log("Ran the delete rout");
    console.log(usern);
    url = "/delete-post";
    data = {
        id: $(this).attr("id"),
        username: usern
    };
    $.ajax({
        type: "DELETE",
        url: url,
        data: data,
        success: function() {
            alert( "success" );},
        dataType: "string"
      })
    });
