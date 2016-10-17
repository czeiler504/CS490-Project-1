GridTemplate = function (movies) {
    var $movieDisplay = $(".movie_display").empty();
    if (movies[0].title == null) {
        $movieDisplay.append();
    }
    else {
        var currentMovie = {};
        sortMovies(movies);

        for (var i = 0, len = movies.length; i < len; i++) {
            currentMovie = movies[i];
            $movieDisplay.append(
                    "<div class='movie'>" + "<img class='movie_img' src='" + currentMovie.photo + "'>" +
                    "<div class='movie_caption'>" + currentMovie.title + "<br>" + "(" + currentMovie.year + ")" + "</div>" +
                    "<div class='movie_starring'><span class='bolded'>Starring:<br></span>" +
                    currentMovie.starring
                    );

            if (currentMovie.HD) {
                $(".movie").last().append(
                        "<div class='movie_HD'><img class='movie_HD_img' src='../images/HD.png'</div>"
                        );
            }
        }
    }
};


ListTemplate = function (movies) {
    var $movieDisplay = $(".movie_display").empty();
    if (movies[0].title == null) {
        $movieDisplay.append();
    }
    else {
        var selectedMovie = {};
        sortMovies(movies);

        for (var i = 0, length = movies.length; i < length; i++){
            selectedMovie = movies[i];
            $movieDisplay.append(
                    "<div class= 'listClass'>" + "<div class='listMovie'>" + "<img class='listMovieImage' src='" + selectedMovie.photo + "'>" + "</div>" +
                    "<div class= 'listTitleClass'><span class='listTitle'>" + selectedMovie.title + "</span>" +
                    "<span class = 'listDate'> (" + selectedMovie.year + ")</span></div>" +
                    "<div><span class='bolded'>Starring: </span>" + "<span>" + selectedMovie.starring + "</span></div>" +
                    "<div class= 'listRatingClass'>" + "<span class='bolded'>Rating: <span>" + rateMovies(selectedMovie.rating) + "</div>" +
                    "<div class='listDescriptionClass'>" + selectedMovie.description + "</div>" +
                    "</div>");

            if (selectedMovie.HD){
                $(".listMovie").last().append("<div class='movie_HD'><img class='movie_HD_img' src='../images/HD.png'</div>");
            }

        }
    }
};


MovieSearch = function (search_field_input, movies) {
    var SearchedMovie = [{}];
    var currentMovie = {};
    var index = 0;
    var length = movies.length;

    for (var i = 0; i < length; i++){
        currentMovie = movies[i];

        if (currentMovie.title.search(search_field_input) !== -1 || currentMovie.starring.search(search_field_input) !== -1 || currentMovie.description.search(search_field_input) !== -1 || currentMovie.year == search_field_input || currentMovie.rating == search_field_input || ((search_field_input.toLowerCase() === 'hd') && (currentMovie.HD === true))){
            SearchedMovie[index] = currentMovie;
            index++;
        }
        else if (currentMovie.title.search(search_field_input) !== -1){
            SearchedMovie[index] = currentMovie;
            index++;
        }
        else if (currentMovie.starring.search(search_field_input) !== -1){
            SearchedMovie[index] = currentMovie;
            index++;
        }
        else if (currentMovie.rating == search_field_input){
            SearchedMovie[index] = currentMovie;
            index++;
        }
        else if (currentMovie.year == search_field_input){
            SearchedMovie[index] = currentMovie;
            index++;
        }
        else if ((currentMovie.title.search(search_field_input) !== -1 || currentMovie.starring.search(search_field_input) !== -1 || currentMovie.description.search(search_field_input) !== -1 || currentMovie.year == search_field_input || currentMovie.rating == search_field_input) && (currentMovie.HD === true)){
            SearchedMovie[index] = currentMovie;
            index++;
        }
        else if (currentMovie.description.search(search_field_input) !== -1){
            SearchedMovie[index] = currentMovie;
            index++;
        }

    }
    return SearchedMovie;
};

sortMovies = function (movies) {
    var sortBy = $(".menu").val();
    if (sortBy === "rating") {
        movies.sort(function (a, b) {
            return a.rating - b.rating;
        });
    } else {
        movies.sort(function (a, b) {
            return a.year - b.year;
        });
    }
};


assignMovie = function (movie) {
    return {
        label: movie.title,
        value: movie.year,
        starring: movie.starring
    };
};


rateMovies = function (rating)
{
    var tempVar = "";
    for (var i = 0; i < 5; i++){
        if (i < rating){
            tempVar = tempVar + "<img class = 'ratingStar' src='../images/gold_star.png'>";
        } else{
            tempVar = tempVar + "<img class = 'ratingStar' src='../images/regular_star.png'>";
        }
    }
    return tempVar;
};
