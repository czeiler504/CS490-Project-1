
$(document).ready(function () {
    $('#grid_button').addClass('grid_button_pressed');
    GridTemplate(movies.movies);
    LayoutChanged = true;
});

LayoutChanged = false;

$(function () {
    //Using autocomplete jQuery widget
    $("#movie_input").autocomplete({
        //Source: https://api.jqueryui.com/autocomplete/#option-source
        source: function (request, response) {
            var movie_data = movies.movies.map(assignMovie);
            var results = $.ui.autocomplete.filter(movie_data, request.term);
            response(results.slice(0, 5));
        },

        //Source: https://api.jqueryui.com/autocomplete/#event-focus
        focus: function (event, ui) {
            $("#movie_input").val(ui.item.label);
            return false;
        },

        //Source: https://api.jqueryui.com/autocomplete/#event-search
        select: function (event, ui) {
            $("#movie_input").val(ui.item.label);
            return false;
        }
    })
            //Source: https://api.jqueryui.com/autocomplete/#method-_renderItem
            .autocomplete("instance")._renderItem = function (ul, item) {
        return $("<li>")
                .append("<span class='bolded'>" + item.label + "</span>" +
                        "<span>" + " (" + item.value + "),&nbsp" + "</span>" +
                        "<span>" + "Starring: " + item.starring + "</span>")
                .appendTo(ul); //Allows the above to show up when searching
    };

    //localStorage source: http://www.w3schools.com/html/html5_webstorage.asp
    //changes layout of movies to 'grid' on button click
    $("#grid_button").click(function () {
        $(this).addClass("grid_button_pressed");
        $("#list_button").removeClass("list_button_pressed").addClass("list_button");
        LayoutChanged = true;

        if (localStorage.getItem('SearchedMovie')) {
            GridTemplate(JSON.parse(localStorage.getItem('SearchedMovie')));
        } else {
            GridTemplate(movies.movies);
        }
    });

    //changes layout of movies to 'list' on button click
    $("#list_button").click(function () {
        $(this).addClass("list_button_pressed");
        $("#grid_button").removeClass("grid_button_pressed").addClass("grid_button");
        LayoutChanged = true;

        if (localStorage.getItem('SearchedMovie')) {
            ListTemplate(JSON.parse(localStorage.getItem('SearchedMovie')));
        } else {
            ListTemplate(movies.movies);
        }
    });

    $("#search_button").click(function () {
        var SearchedMovie = MovieSearch($("#movie_input").val(), movies.movies);

        //stringify() source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
        //setItem() source: https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem
        localStorage.setItem('SearchedMovie', JSON.stringify(SearchedMovie));

        //hasClass() source: https://api.jquery.com/hasclass/
        if ($("#grid_button").hasClass("grid_button_pressed") && LayoutChanged) {
            GridTemplate(SearchedMovie);
        } else if ($("#list_button").hasClass("list_button_pressed") && LayoutChanged) {
            ListTemplate(SearchedMovie);
        }
    });

    $(".menu").change(function () {
        if ($("#grid_button").hasClass("grid_button_pressed") && LayoutChanged) {
            GridTemplate(movies.movies);
        } else if ($("#list_button").hasClass("list_button_pressed") && LayoutChanged) {
            ListTemplate(movies.movies);
        }
    });

    $('#movie_input').on('keyup', function () {
        localStorage.removeItem("SearchedMovie");
        if ($("#grid_button").hasClass("grid_button_pressed") && LayoutChanged) {
            GridTemplate(movies.movies);
        } else if ($("#list_button").hasClass("list_button_pressed") && LayoutChanged) {
            ListTemplate(movies.movies);
        }
    });

});
