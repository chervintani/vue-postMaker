import axios from 'axios';

const BASE_URL = 'https://chervin-backend.herokuapp.com';

export function getNotes() {
	return axios.get(`${BASE_URL}/api/note/list`)
		.then(response => response.data);
}

export function getProfile(){
	return axios.get(`${BASE_URL}/api/profile`)
		.then(response => response.data);
}

export function deleteNote(id) {
	return axios.post(`${BASE_URL}/api/note/delete/${id}`)
		.then(response => response.data)
		.catch(err => Promise.reject(err.message));
}

export function register(data) {
	return axios.post(`${BASE_URL}/api/account/create`, {
		username: data.username,
		password: data.password,
	})
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err.message));
}

export function login(data) {
	return axios.post(`${BASE_URL}/api/account/login`, {
		username: data.username,
		password: data.password,
	})
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err.message));
}

export function createNote(data) {
	return axios.post(`${BASE_URL}/api/note/create`, {
		title: data.title,
		body: data.body,
		people: data.people,
		location: data.location,
		creator: data.creator,
		datetime: data.datetime,
		filename: data.filename,
		image: data.image,
		date_created: data.date_created,
		date_updated: data.date_updated
	})
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err.message));
}

export function updateNote(data, id) {
	return axios.post(`${BASE_URL}/api/note/update/${id}`, { data })
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err.message));
}

export function searchNote(data) {
	return axios.get(`${BASE_URL}/api/note/search/${data}`)
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err.message));
}

export function uploadImage(data) {
	return axios.post(`${BASE_URL}/upload`, { data })
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err.message));
}



// export function undoNote() {
// 	return axios.post(`${BASE_URL}/api/note/undo`)
// 		.then(response => {
// 			return response
// 		})
// 		.catch(err => Promise.reject(err.message));
// }


