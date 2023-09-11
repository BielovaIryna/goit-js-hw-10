import axios from "axios";

const BASE_URL ='https://api.thecatapi.com/v1';
export const fetchBreeds = ()=>{
	return axios.get(`${BASE_URL}/breeds`).then((res)=>{
		return res.data;
	})
};
export const fetchCatByBreed =(breedId)=>{
	    return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`).then((res)=>{
		return res.data;
	})
}