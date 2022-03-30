import {
  API_KEY, BASE_URL,
  IMG_URL,
  language,
} from './api.js'

var movieBox = document.querySelector(".movie_or_serie-info");
var movieTitle = document.querySelector(".movie_or_serie-title");
var movieSinopse = document.querySelector(".movie_or_serie-sinopse");
var movieImg = document.querySelector(".movie_or_serie-img");
var notFoundBox = document.querySelector(".not_found");
var releaseDate = document.querySelector(".release_date");
var actors = document.querySelector(".actors");



async function getActorsMovie(movie_id){
      var urlComplete = BASE_URL + movie_id + "/credits" + API_KEY
      var cast = null;
      await fetch(urlComplete ,{
        method : "GET",
        headers : {
           "Content-Type"  :"Application/Json"
        }
      }).then(res => res.json()).then((res) => {
           cast = res.cast;
      })
      return cast;
     
}

function handleFindMovieButton(){
      var randomMovie = Math.floor(Math.random() * 1000);
      var urlComplete = BASE_URL + randomMovie + API_KEY + "&" + language;
      actors.innerHTML = "";
      fetch(urlComplete, {
          method : "GET",
          headers : {
             "Content-Type"  :"Application/Json"
          }
      }).then(async res => { 
          if(res.status != 200 || !res.ok){
              notFoundBox.style.display = "flex";
              movieBox.style.display = "none";
              return;
          }
          var resposta = await res.json()
          console.log(resposta);
          notFoundBox.style.display = "none";
          movieBox.style.display = "flex";
          movieTitle.innerHTML = resposta.original_title;
          movieSinopse.innerHTML = resposta.overview;
          movieImg.setAttribute("src",IMG_URL+resposta.poster_path);
          var formatedReleaseDate = resposta.release_date.split("-");
          formatedReleaseDate = formatedReleaseDate.reverse().join("/");
          releaseDate.innerHTML = "Data de lançamento : "+ formatedReleaseDate;
          var cast = await getActorsMovie(resposta.id);
          cast.length = 4;
          console.log(cast)
          actors.innerHTML = "Elenco: "
          cast.forEach((element,index) => {
              actors.innerHTML+= element.name;
              console.log(index)
              if(index === cast.length - 1){
                console.log("entrou aq")
                  actors.innerHTML += "..."
              }else{
                  actors.innerHTML += ",";
              }
          });
      })

}


window.handleFindMovieButton = handleFindMovieButton;







