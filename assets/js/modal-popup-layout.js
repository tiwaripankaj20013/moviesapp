


// modal popup layouts 

var modalPopup = (movieName, movieImage, movieImgTitle,
    modalMovieDesc, modalMovieGenres, modalMovieCast,
    modalMovieDirector,modalRating, body) => {
var modalTemplate = document.getElementById("modalTemplate");

var modalTemplateLayout = modalTemplate.content.querySelector(".modal-container");
var modalTemplateNode = document.importNode(modalTemplateLayout, true);
    modalTemplateNode.style.display="block";

    modalTemplateNode.querySelector(".modal__header h2").prepend(document.createTextNode(movieName))
  
var modalFigure = modalTemplateNode.querySelector('.modal__figure img');
    modalFigure.src = movieImage;
    modalFigure.alt= movieImgTitle;
    modalFigure.title = movieImgTitle;

    modalTemplateNode.querySelector(".modal__description-movie p").prepend(document.createTextNode(modalMovieDesc));

    modalTemplateNode.querySelector(".modal__description--content.genres").append(document.createTextNode(modalMovieGenres));
  
    modalTemplateNode.querySelector(".modal__description--content.cast").append(document.createTextNode(modalMovieCast));
   
    modalTemplateNode.querySelector(".modal__description--content.director").append(document.createTextNode(modalMovieDirector));

    modalTemplateNode.querySelector(".modal__rating").innerHTML = modalRating;
    
    document.querySelector(body).append(modalTemplateNode);

var modalClose = document.querySelectorAll(".modal__popup--close");
    for(let i=0; i<modalClose.length;i++){
        modalClose[i].onclick = () => {
            document.querySelector('.modal-container').remove();
            }
    }
    
};
  
export {modalPopup};


