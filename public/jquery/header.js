$(".nav-button").on("mouseleave", function(event) {
    $(this).css("background-color", "#378CE7");
    $(this).css("opacity", 1);
    $(this).css("color", "#378CE7");
    $(this).css("text-shadow", "");
});
$(".nav-button").on("mouseenter", function(event) {
    $(this).css("opacity", .9);
    $(this).css("color", "white");
    $(this).css("text-shadow", "2px 2px 2px rgba(0, 0, 0)");
});