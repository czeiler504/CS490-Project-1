

// declare and global variable movie_matches
var movie_matches = movies["movies"];

$(document).ready(function () {
    var controller = new Controller(movie_matches);
});


function Controller(data) {
    this.movies = data;
    /*** (attributes initialized) ***/
    this.movie_display_div = "#movie_display";
    this.grid_icon = "#grid_icon";
    this.list_icon = "#list_icon";
    this.sort_options = "#sort_options";
    this.grid_template = "grid_template.html";
    this.list_template = "list_template.html";
    
    /*** Bind some events ***/
    var self = this; // the variable self is now a reference to the controller
    var make_grid_function = function () {
        self.make_grid(self);
    };
    var make_list_function = function () {
        self.make_list(self);
    };
    var sort_movies = function () {
        self.sort_movies(self);
    };
    /* Set event handlers for clicking on list or grid, and for changing sort option */
    $(this.grid_icon).on("click", make_grid_function);
    $(this.list_icon).on("click", make_list_function);
    $(this.sort_options).on('change', sort_movies);
    /*** Set default to grid view then load movies ***/
    $("#list_icon").attr("src", "../images/list.jpg");
    $("#grid_icon").attr("src", "../images/grid_pressed.jpg");
    this.load_movies(this);
} // end of Controller function




// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ function prototypes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Controller.prototype.load_movies = function (self) {
    /*** Load movies using either list template or grid template as indicated ***/
    if ($("#list_icon").attr("src") == "../images/list_pressed.jpg") {
        $(self.movie_display_div).attr("class", "list"); //to facilitate access for css styling
        $.get(self.list_template, function (template) { // get the list_template and do the following with it
            var html_maker = new htmlMaker(template); //create an html Maker (template engine)
            var html = html_maker.getHTML(movie_matches); //generate dynamic HTML based on the data
            $(self.movie_display_div).html(html);
        });
        

        $(self.movie_display_div).attr("class", "grid"); //to facilitate access for css styling
        $.get(self.grid_template, function (template) {
            var html_maker = new htmlMaker(template); //create an html Maker (template engine)
            var html = html_maker.getHTML(movie_matches); //generate dynamic HTML based on the data
            $(self.movie_display_div).html(html);
        });
    }
}; // end of load_movies function


Controller.prototype.sort_movies = function (self) {
    var by = $(self.sort_options).val().toLowerCase();
    movie_matches = movie_matches.sort(
            function (a, b) {
                if (a[by] < b[by])
                    return -1;
                if (a[by] == b[by])
                    return 0;
                if (a[by] > b[by])
                    return 1;
            }
    );
    self.load_movies(self);
}; // end of sort_movies



Controller.prototype.make_grid = function (self) {
    $(self.movie_display_div).attr("class", "grid");
    $(self.grid_icon).attr("src", "grid_pressed.jpg");
    $(self.list_icon).attr("src", "list.jpg");
    this.load_movies(this);
};

Controller.prototype.make_list = function (self) {
    $(self.movie_display_div).attr("class", "list");
    $(self.grid_icon).attr("src", "grid.jpg");
    $(self.list_icon).attr("src", "list_pressed.jpg");
    this.load_movies(this);
};
