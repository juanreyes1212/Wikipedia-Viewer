/* index.js for Wiki Viewer */

//RANDOM COLORED BACKGROUND ON REFRESH/SITE VISIT
$(document).ready(function() {
	//var colors = ["#80d8ff", "#40c4ff", "#00b0ff", "#0091ea"]	//original color scheme
	var colors = ["#009688", "#00897B", "#00796B", "#00695C", "#004D40"];
	var selectedColor = colors[Math.floor(Math.random() * colors.length)]; //global var for use in appending to css ruleset
	$("body").css("background-color", selectedColor); //changes background color on every refresh
	$(".form-control").css("color", selectedColor); //changed searchbar text to background color
	//$("footer").css("color", selectedColor);

	/* TYPED.JS TYPING ANIMATION*/
	$("#typedText").typed({
		strings: ["Wiki View", "Wikipedia Search", "Wikipedia Search Viewer"],
		typeSpeed: 50,
		backDelay: 1000,
		loop: false
	}); //END TYPED.JS ANIMATION

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
		event.preventDefault(); //don't let browser override with defualt event
		var searchInput = $("#input").val(); //what gets typed in searchBar
		var wikiURL = "https://en.wikipedia.org/w/api.php/w/api.php?action=opensearch&format=json&search=" + searchInput + "&limit=5&namespace=0&callback=?"; //call to wikipedia api search with query input
		if (searchInput === "") { //if the search input form is empty
			$("#searchResult").html("<h2 class = 'returnQuery'>No search query has been typed in!</h2>");
			return;
		}
		$.getJSON(wikiURL, function(data) {
			//console.log(data);
			var wikiData = data;
			var searchInput = wikiData[0];
			var wikiTitles = wikiData[1];
			var wikiSnippet = wikiData[2];
			var wikiLink = wikiData[3];
			var resultOutput = "<h2 class = 'returnQuery'>Search Results for \"" + searchInput + "\"</h2>"; //header var for results section under input form (to be used for appending div results below)

			for (var i = 0; i < wikiTitles.length; i++) {
				resultOutput += "<div class='well'><div class='entry'><a href='" + wikiLink[i] + "'><h3>" + wikiTitles[i] + "</h3></a>" + "<p>" + wikiSnippet[i] + "</p>" + "</div></div>";
			}
			//console.log(resultOutput);
			$("#searchResult").css("color", selectedColor);
			$("#searchResult").html(resultOutput); //adding header for results
		});
	});


	/* PRESSING ENTER TO SEARCH */ 
	$('#input').keydown(function(event) {
		
		var searchInput = $("#input").val(); //what gets typed in searchBar
		var wikiURL = "https://en.wikipedia.org/w/api.php/w/api.php?action=opensearch&format=json&search=" + searchInput + "&limit=5&namespace=0&callback=?"; //call to wikipedia api search with query input
		if (event.keyCode == 13) {
			if (searchInput === "") { //if the search input form is empty
				$("#searchResult").html("<h2 class = 'returnQuery'>No search query has been typed in!</h2>");
				return;
			}

			$.getJSON(wikiURL, function(data) {
				//console.log(data);
				var wikiData = data;
				var searchInput = wikiData[0];
				var wikiTitles = wikiData[1];
				var wikiSnippet = wikiData[2];
				var wikiLink = wikiData[3];
				var resultOutput = "<h2 class = 'returnQuery'>Search Results for \"" + searchInput + "\"</h2>"; //header var for results section under input form (to be used for appending div results below)

				for (var i = 0; i < wikiTitles.length; i++) {
					var snippetDescription = wikiSnippet[i];
					resultOutput += "<div class='well'><div class='entry'><a href='" + wikiLink[i] + "'><h3>" + wikiTitles[i] + "</h3></a>" + "<p>" + wikiSnippet[i] + "</p>" + "</div></div>";
				}
				//console.log(resultOutput);
				$("#searchResult").html(resultOutput); //adding header for results
			});
		}
	});
});