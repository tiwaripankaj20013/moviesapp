import  {generes,latestMovie,trandingMovie,popularMovie,movieDetail,similarMovie,actorDetail,actorFimography,searchMovie} from './api.js';
import {movieCard,modalPopup} from './card.js';
// import {dataMap} from './common.js';

const POSTER_PATH = `https://image.tmdb.org/t/p/w500/`;

let allMovie = [];

let moviId = 475557;
allMovie.push(
        generes(),
        latestMovie(),
        trandingMovie(),
        popularMovie(),
        movieDetail(moviId),
        similarMovie(),
        actorDetail(),
        actorFimography(),
        searchMovie()
        );

Promise.all(allMovie).then(data => {
    let generesData = data.shift();
    let latestMovieData = data.shift();
    let trendingMovieData = data.shift();
    let popularMovieData = data.shift();
    let movieDetailData = data.shift();
    let similarMovie = data.shift();
    let actorDetail = data.shift();
    let actorFimography = data.shift();
    let searchMovie= data.shift();

    function dataMap(data){
        let datas = '';
        data.map(dataItem => datas += dataItem.name + ', ');
        return datas;
       }

   function createGenres(genresid){
    const currentGenres = generesData.genres.filter(genre => genresid.includes(genre.id) )
    let genereName = '';
    currentGenres.map(item => genereName += item.name + ', ');
    genereName = genereName.slice(0, -2); 
    return genereName;
   }

    latestMovieData.results.slice(0,4).forEach((latestMovie) => {
        movieCard(
          `${POSTER_PATH}${latestMovie.poster_path}`,
            latestMovie.original_title,
            latestMovie.title,
            latestMovie.popularity,
            createGenres(latestMovie.genre_ids),
            starReview(Math.round(latestMovie.vote_average/2)),
            latestMovie.id,
            'temp-data'
        )
    });
  
    trendingMovieData.results.slice(0,4).forEach((trendingMovie) => {
         movieCard(
            `${POSTER_PATH}${trendingMovie.poster_path}`,
            trendingMovie.original_title,
            trendingMovie.title,
            trendingMovie.popularity,
            createGenres(trendingMovie.genre_ids),
            starReview(Math.round(trendingMovie.vote_average/2)),
            trendingMovie.id,
            'trendingMovies'
        )
    });

    popularMovieData.results.slice(0,4).forEach((popularMovie) => {
         movieCard(
            `${POSTER_PATH}${popularMovie.poster_path}`,
            popularMovie.original_title,
            popularMovie.title,
            popularMovie.popularity,
            createGenres(popularMovie.genre_ids),
            starReview(Math.round(popularMovie.vote_average/2)),
            popularMovie.id,  
            'mostWatchedMovies'
        )
    });

    // modalpopup Data  
        
    modalPopup(
             movieDetailData.title,
            `${POSTER_PATH}${movieDetailData.poster_path}`,
                movieDetailData.original_title,
                 movieDetailData.overview,
                 dataMap(movieDetailData.genres),
                dataMap(movieDetailData.credits.cast.slice(0,10)),
                    'Rajeev Kumar Verma',
                 starReview(Math.round(movieDetailData.vote_average/2)),
            
            'body'
        );
        
});

function starReview(rateing){
    let rate = ''
    for(let i =1 ; i<=5 ;i++){
        rate = `${rate} <i class= "fa ${rateing >= i ?'fa-star' : 'fa-star-o'}"></i>`
    }
    return rate;
}

 

