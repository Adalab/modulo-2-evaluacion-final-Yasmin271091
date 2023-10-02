'use strict';

console.log(':)');

//VARIABLES Y CONSTANTES
const listFav = document.querySelector('.js-fav-list');
const listSeries = document.querySelector('.js-list');
const searchText = document.querySelector('.js-input-text');
const searchButton = document.querySelector('.js-search-btn');
const resetButton = document. querySelector('.js-reset-btn');

const imgDefault = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let series = [];

let favoritesSeries = [];
//8.-guardar en LocalStorage las series favoritas, y que aunque busque otras series, las favoritas se mantengan
const seriesFavLS = JSON.parse(localStorage.getItem('seriesFav'));
if (seriesFavLS !== null) {
  favoritesSeries = seriesFavLS;
  paintFavSeries();
}

//2.-Pintar las series
function paintSeries() {
  listSeries.innerHTML = ''; // Limpiar el contenido previo

  series.forEach((serie) => {
    const imageUrl = serie.show.image ? serie.show.image.medium : imgDefault;
    listSeries.innerHTML += `
    <li class="js-show" id="${serie.show.id}">
        <img src="${imageUrl}" alt="${serie.show.name}">
        <span>${serie.show.name}</span>
    </li>`;
  });
  addFavListener();
}
//7.- Pintar los favoritos
function paintFavSeries() {
  
  listFav.innerHTML = ''; // Limpiar el contenido previo
    

    favoritesSeries.forEach((serie) => {
      const imageUrl = serie.show.image? serie.show.image.medium : imgDefault;
      listFav.innerHTML += `
      <li class="js-show" id="${serie.show.id}">
          <img src="${imageUrl}" alt="${serie.show.name}">
          <span>${serie.show.name}</span>
      </li>`;

    });
    addFavListener();

}

// 5- Función para agregar una serie a favoritos
function addFavorite(serie) {
  favoritesSeries.push(serie);
}

// 6.-Función para quitar una serie de favoritos
function removeFavorite(serie) {
  const index = favoritesSeries.indexOf(serie);
  if (index !== -1) {
    favoritesSeries.splice(index, 1);
  }
}

// 4.- Función para manejar el clic en una serie favorita, buscar el id y le añade una clase para saber que la has seleccionado como favorita.
function handleClickFav(event) {
  event.preventDefault();
  const serieName = parseInt(event.currentTarget.id);
  console.log(serieName);

  let foundSerie = series.find((item) => item.show.id === serieName);
  const indexFavSerie = favoritesSeries.findIndex(
    (item) => item.show.id === serieName);
  if (indexFavSerie === -1) {
    favoritesSeries.push(foundSerie);
    event.currentTarget.classList.add('title-serie');
  } else {
    favoritesSeries.splice(indexFavSerie, 1);
    event.currentTarget.classList.remove('title-serie');
  }
  localStorage.setItem('seriesFav', JSON.stringify(favoritesSeries));
  paintFavSeries();
}


//3.- Función con bucle para recorrer todas las series al hacer click
function addFavListener() {
  const lishow = document.querySelectorAll('.js-show');
  for (const item of lishow) {
    item.addEventListener('click', handleClickFav);
  }
}

//1.-conseguir los datos de la Api
function handleClickSearch(event) {
  event.preventDefault();
  const inputValue = searchText.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
  .then((response) => response.json())
  .then((dataApi) => {
  console.log(series);
  series = dataApi;
 
      const filteredShows = series.filter((item) =>
        item.show.name.toLowerCase().includes(inputValue.toLowerCase()));
      paintSeries(filteredShows);
      console.log(series);
  
  });
}

searchButton.addEventListener('click', handleClickSearch);

//9.-Boton de reset(bonus)
function handleClickReset(event) {
  event.preventDefault();
  searchText.value = '';
  listSeries.innerHTML = '';
  listFav.innerHTML = '';
}

resetButton.addEventListener('click', handleClickReset)