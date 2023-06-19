function searchContent() {
    var searchQuery = document.getElementById('Search-Input').value.toLowerCase();
    var items = document.getElementsByClassName('searchable');

    for (var i = 0; i < items.length; i++) {
        var content = items[i].textContent.toLowerCase();
        if (content.includes(searchQuery)) {
            items[i].style.display = 'block';
        } else {
            items[i].style.display = 'none';
        }
    }
}



$(document).ready(function() {
    
    $('#search-btn').click(function() {
        
        var searchQuery = $('#search-input').val();

        // Make the API request
        $.getJSON('http://www.omdbapi.com/', {
            apikey: '98d90405',
            s: searchQuery
        }).done(function(response) {
            // Process the API response
            if (response.Response === 'True') {
                
                var movies = response.Search;
                var results = '';

                for (var i = 0; i < movies.length; i++) {
                    results += '<div class="card-mb-6">';
                    results += '<img src="' + movies[i].Poster + '" alt="Movie Poster" width="400" height="280" >';
                    results += '<div class="card-body ">';
                    results += '<div><h5>' + movies[i].Title + '</h5>';
                    results += '<p>Year: ' + movies[i].Year + '</p>';
                    results += '<p>Type: ' + movies[i].Type + '</p></div>';
                    
                    results += '<button type="button" class="btn btn-primary" onclick="searchGoogle(\'' + movies[i].Title + '\')">More Details</button>';
                    results += '</div></div>';

                    /* results += createMovieModal(movies[i], i); */
                }

                $('#results').html(results);
            } else {
               
                $('#results').html('<p>No results found.</p>');
            }
        }).fail(function() {
           
            $('#results').html('<p>Error occurred while fetching data.</p>');
        });
    });
});

function searchGoogle(movieTitle) {
    var searchQuery = movieTitle + ' movie';
    var searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(searchQuery);

    // Open a new tab/window with the Google search
    window.open(searchUrl, '_blank');
}