import axios from "axios";
import Notiflix from "notiflix";

export const fetchBreeds = ()=>{
	return axios.get("https://api.thecatapi.com/v1/breeds").then((res)=>{
		return res.data;
	}).catch((error)=>{
		Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!", error);
	})
};
export const fetchCatByBreed =(breedId)=>{
	const endpoint = "https://api.thecatapi.com/v1/images/search?breed_ids="+ breedId;
	return axios.get(endpoint).then((res)=>{
		return res.data;
	}).catch((error)=>{
		Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!", error);
	})
}