import { movieCard } from './movie-card.js';
import { utility } from './utility.js';


    // get movies from local storage 
var localMovies = JSON.parse(localStorage.getItem('localUniqueMovies'));

    //   get genres name from local storage
var localGenresData = JSON.parse(localStorage.getItem('localGenres'));


let notFound= `<div class="not__found">
                <p class="text-center"><i class="fa fa-search text-gray fa-3x"></i></p>
                    <p class="text-center">Your search  Not found !<p>
                </div>`;

    let movieData = (movie, id, idName) => {
        movieCard(
            `${utility.posterPath()}${movie.backdrop_path}`,
            movie.original_title,
            movie.title,
            utility.createGenres(movie.genre_ids, localGenresData),
            utility.starReview(utility.rating(movie.vote_average )),
            id,
            idName
        )
    }



    

    // before search and filter show default movies list
    localMovies.slice(0, 12).forEach((localMovie) => {
        movieData(localMovie, localMovie.id, 'searcMovieResult');
    });

    document.querySelector('.searchMovie').addEventListener('keyup', getValue);
    document.querySelector('.filterMovie').addEventListener('input', getValue);

     function getValue (e) {
        /* serach movies by name */
        if (e && e.type == 'keyup') {
           let inputvalues = this.value.toLowerCase();

            if (inputvalues != '') {
                
                var searchMovies = localMovies.filter((singlemovie) => {
                    let localTitle = singlemovie.title.toLowerCase().includes(inputvalues);
                    let localGenres = utility.createGenres(singlemovie.genre_ids,localGenresData).includes(inputvalues);

                    //console.log(inputvalues)
                    return(localTitle || localGenres);
                });
                // remove previos movie card 
                document.querySelector('#searcMovieResult').innerHTML = '';
                
                printMovieCard();
                
                if (searchMovies.length == 0) {
                    document.querySelector('#searcMovieResult').innerHTML = notFound;
                }
            }
            
        }
            /* serach movies by name  end */

        /* filter value by range */
        else if (e && e.type == 'input') {
            let filterValue = this.value;
            /* show input rating on webpage*/
            document.querySelector('.filterValue').innerHTML=filterValue;

            //   utility.rating function convert rating 10 to 5 rating floor value
            var searchMovies = localMovies.filter((singleMovie) => {
              
                if (utility.rating(filterValue) <= utility.rating(singleMovie.vote_average)) {
                    return singleMovie;
                }
                return utility.rating(singleMovie.vote_average).toString().includes(utility.rating(filterValue).toString());
            });
            document.querySelector('#searcMovieResult').innerHTML = '';
            printMovieCard();
            if (searchMovies.length == 0) {
                document.querySelector('#searcMovieResult').innerHTML = notFound;
            }
        }

        function printMovieCard(){
            searchMovies.forEach((searchMovie) => {
                movieData(searchMovie, searchMovie.id, 'searcMovieResult');
          })
      };
     
    //   search and filtermovies after like
    utility.favouriteMovies();
      // show filter and seacrch  movies modal popup
      utility.modalPopupShow();
    }

// show similar movies modal popup
    utility.modalPopupShow();
    utility.favouriteMovies();
