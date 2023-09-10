import axios from 'axios';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'
import { fetchBreeds } from './cat-api'
import { fetchCatByBreed } from './cat-api'
const breedsSelect = document.querySelector(".breed-select");
const catInfoEl = document.querySelector(".cat-info");
const loaderEl = document.querySelector(".loader")

axios.defaults.headers.common["x-api-key"] = "live_gowwcMSK5VenWMhy2BYt2wrqwqOtvqbLY97J5Qbm9GCH28v24bGmwmnPLSOUhrlY";

loaderEl.classList.add("is-hidden");

const renderOptions = (arr, container) => {
	const markup = arr.map((i) => `<option value ="${i.id}">${i.name}</option>`).join("");
	container.insertAdjacentHTML("beforeend", markup);
};
const fillSelect = () => {
	loaderEl.classList.remove("is-hidden");
	loaderEl.classList.add("loader");
	breedsSelect.classList.add("is-hidden")
	fetchBreeds().then((breedsInfo) => {
		loaderEl.classList.remove("loader");
		loaderEl.classList.add("is-hidden");
		breedsSelect.classList.remove("is-hidden");
		
		renderOptions(breedsInfo, breedsSelect)}).catch((error) => Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!", error))
}
const renderCatCard = (arr, container) => {
	const markup = arr.map((i) => `<div class="cat-info-card"><img src="${i.url}" alt ="${i.breeds[0].name}" width ="1000"/><div><h2 class="breed-name">${i.breeds[0].name}</h2><p>${i.breeds[0].description}</p><p class ="breed-temp"><span class="temp-title">Temperament:</span> ${i.breeds[0].temperament}</p></div></div>`).join("")
	container.innerHTML = markup;
}
const addCatCard = (e) => {
	loaderEl.classList.remove("is-hidden");
	loaderEl.classList.add("loader")
	fetchCatByBreed(e.target.value).then((catInfo) => {
		loaderEl.classList.remove("loader");
		loaderEl.classList.add("is-hidden")
		renderCatCard(catInfo, catInfoEl)
	}).catch((error) => Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!", error))

};
breedsSelect.addEventListener("change", addCatCard);
document.addEventListener("DOMContentLoaded", fillSelect);

