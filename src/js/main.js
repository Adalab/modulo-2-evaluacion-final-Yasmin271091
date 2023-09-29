'use strict';

//VARIABLES Y CONSTANTES


const searchText = document.querySelector('.js-input-text');
const searchButton = document.querySelector('.js-search-btn');

const container = document.querySelector('.js-list');
const favorites = document.querySelector('.js-fav-list');

const img = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let series = [];
let favoritesSeries = [];

//conseguir los datos de la Api

