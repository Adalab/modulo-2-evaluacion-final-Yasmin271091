'use strict';

console.log(':)');

//VARIABLES Y CONSTANTES

const searchText = document.querySelector('.js-input-text');
const searchButton = document.querySelector('.js-search-btn');
let series = [];

const imgDefault= 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let favoritesSeries = [];


 //2.-Pintar los datos de la Api
 function paintSeries() {
    const listSeries = document.querySelector('.js-list');
    listSeries.innerHTML = ''; // Limpiar el contenido previo

    series.forEach((serie) => {
        const imageUrl = serie.show.image ? serie.show.image.medium : imgDefault;
        listSeries.innerHTML += `
            <li>
                <img src="${imageUrl}" alt="${serie.show.name}">
                <span>${serie.show.name}</span>
            </li>
        `;
    });
}

//1.-conseguir los datos de la Api
function handleClickSearch(event) {

    event.preventDefault();
    const inputValue = searchText.value;
    fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
     .then(response => response.json())
     .then((dataApi) => {
        console.log(series);
        series = dataApi;
        paintSeries();
    });
    
}

searchButton.addEventListener('click', handleClickSearch);