/* index.js for Wiki Viewer */

//RANDOM COLORED BACKGROUND ON REFRESH/SITE VISIT
$(document).ready(function () {
    //var colors = ["#80d8ff", "#40c4ff", "#00b0ff", "#0091ea"]	//original color scheme
    var colors = ["#009688", "#00897B", "#00796B", "#00695C", "#004D40"];
    selectedColor = colors[Math.floor(Math.random() * colors.length)];		//global var for use in appending to css ruleset
    $("body").css("background-color", selectedColor);	//changes background color on every refresh
    $(".form-control").css("color", selectedColor);		//changed searchbar text to background color
    //$("footer").css("color", selectedColor);

/* TYPED.JS TYPING ANIMATION*/
$("#typedText").typed({
  	strings: ["Wiki View", "Wikipedia Search", "Wikipedia Search Viewer"],
    typeSpeed: 50,
    backDelay: 1000,
    loop: false
});	//END TYPED.JS ANIMATION


/* SEARCH BAR AUTOCOMPLETE FUNCTIONALITY*/
$("#input").autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "http://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term
            },
            success: function(data) {
                response(data[1]);
            }
        });
    }
});

/* CLICK TO SEARCH */
$("#clickSearch").on("click", function(event) {
	event.preventDefault(); 	//don't let browser override with defualt event
	var searchInput = $("#input").val();	//what gets typed in searchBar
	

})

});	//END DOCUMENT.READY