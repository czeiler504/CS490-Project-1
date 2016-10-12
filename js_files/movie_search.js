$("document").ready(function () {

//    var movie_data = movies["movies"];

    /***** this is what happens when user clicks in the search bar to begin entering text *****/
    $("#search_text").on('click', clear_text_box);
    
    /***** upon keyup, search for matches *****/
    $("#search_text").on('keyup', find_matches);
    
    /***** what happens when user clicks search button *****/
    $("#search_button").on('click', search_button_clicked);
    
    /***** what happens when user clicks on any part of the screen outside the suggestion box *****/
    $("body").on('click', function () {
        $("#suggestions_box").css("visibility", "hidden");
    });

}); // end of ready function


function clear_text_box() {
    $("#search_text").attr("value", ""); //clear search_text field when user clicks there to begin typing
    $("#search_text").css({"color": "black", "font-size": "14px"});
}


function find_matches() {
    $("#suggestions_box").css("visibility", "visible");
    movie_matches = [];
    console.log("length of movie matches = " + movie_matches.length);
    var JSON_data = movies["movies"];
    var html = "";
    var user_search_entry = $("#search_text").val(); // get value user has typed into text field
    var show_suggestions = false; // don't show suggestions yet
    var suggestion_count = 0; // specifications call for a max of five suggestions
    $.each(JSON_data, function (i, val) { //for each movie (that is, for each line of the JSON file)
        var line = JSON_data[i];
        for (var key in line) { // for each key in the line
            var item = line[key];
            var found_index = String(item).toLowerCase().search(String(user_search_entry).toLowerCase().trim()); // search for user entry in each item of the given line
            if (found_index != -1 && suggestion_count < 5) { // if user text matches item in line
                html += "<div class='sub_suggestions' name='" + line["title"] + "' data-item='" + line["title"] + "' >";
                html += "<b>" + line["title"] + "</b>" + " (" + line["year"] + "), Starring: " + line["starring"];
                html += "</div>";
                show_suggestions = true;
                suggestion_count++;
                console.log("MATCH! Line " + i + " Item " + key + ". Suggestion_count is now " + suggestion_count);
                movie_matches.unshift(line);
                break;
            }
        }
    });

    if ($("#search_text").val() == "")
        show_suggestions = false;

    if (show_suggestions) { // this happens if matches are found as user types in search box
        $("#suggestions_box").html(html); // html for matched elements is added to suggestions_box element which makes it visible
        $("#suggestions_box").children(".sub_suggestions").on('click', function (event) {
            event.stopPropagation();
        });
        $("#search_text").on('click', function (event) {
            event.stopPropagation();
        });
        $("#suggestions_box").children(".sub_suggestions").on('click', function () {
            var item = $(this).attr('data-item'); //get the data
            $("#search_text").val(item); //show it in the field
            $("#suggestions_box").hide(); //hide the suggestion box

        });
        $("#suggestions_box").show();
    } else // if there is no match to the user's entered text
        $("#suggestions_box").hide();
    console.log("CHARACTER MATCH COMPLETED. There are " + movie_matches.length + " movies in movie_matches.");
} // end search function



function search_button_clicked() {
    find_matches();
    display_movies(movie_matches);
}

function display_movies(array_of_movies) {
    /*** Load movies using either list template or grid template as indicated ***/
    if ($("#list_icon").attr("src") == "../images/list_pressed.jpg") {
        $("#movie_display").attr("class", "list"); //to facilitate access for css styling
        $.get("../html/list_template.html", function (template) { // get the list_template and do the following with it
            var html_maker = new htmlMaker(template); //create an html Maker (template engine)
            var html = html_maker.getHTML(array_of_movies); //generate dynamic HTML based on the current matches
            $("#movie_display").html(html);
        });
    } else {
        $("#movie_display").attr("class", "grid"); //to facilitate access for css styling
        $.get("../html/grid_template.html", function (template) {
            var html_maker = new htmlMaker(template); //create an html Maker (template engine)
            var html = html_maker.getHTML(array_of_movies); //generate dynamic HTML based on the data
            $("#movie_display").html(html);
        });
    }
}
