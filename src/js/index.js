import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds,  fetchCatByBreed} from './cat-api'

const breedsSelect = document.querySelector(".breed-select");
const catInfoEl = document.querySelector(".cat-info");
const loaderEl = document.querySelector(".loader")

axios.defaults.headers.common["x-api-key"] = "live_gowwcMSK5VenWMhy2BYt2wrqwqOtvqbLY97J5Qbm9GCH28v24bGmwmnPLSOUhrlY";

const toggleEl = (el, action) => {
	const method = action === "show" ? "remove" : "add";
	el.classList[method]("is-hidden");
  };


const renderOptions = (arr, container) => {
	const markup = arr.map((i) => `<option value ="${i.id}">${i.name}</option>`).join("");
	container.insertAdjacentHTML("beforeend", markup);
};
const fillSelect = () => {
	toggleEl(loaderEl, "show");
	toggleEl(breedsSelect, "hide")
	fetchBreeds().then((breedsInfo) => {
		toggleEl(loaderEl, "hide");
		toggleEl(breedsSelect, "show")
		renderOptions(breedsInfo, breedsSelect)}).catch((error) => Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!", error)).finally(()=>toggleEl(loaderEl, "hide"))
}
const renderCatCard = (arr, container) => {
	const markup = arr.map((i) => `<div class="cat-info-card"><img src="${i.url}" alt ="${i.breeds[0].name}" width ="1000"/><div><h2 class="breed-name">${i.breeds[0].name}</h2><p>${i.breeds[0].description}</p><p class ="breed-temp"><span class="temp-title">Temperament:</span> ${i.breeds[0].temperament}</p></div></div>`).join("")
	container.innerHTML = markup;
}
const addCatCard = (e) => {
	toggleEl(loaderEl, "show");
	fetchCatByBreed(e.target.value).then((catInfo) => {
		toggleEl(loaderEl, "hide");
		renderCatCard(catInfo, catInfoEl)
	}).catch((error) => Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!", error)).finally(()=>toggleEl(loaderEl, "hide"))

};
breedsSelect.addEventListener("change", addCatCard);
document.addEventListener("DOMContentLoaded", fillSelect);

