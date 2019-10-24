import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export function getNotes() {
	return axios.get(`${BASE_URL}/api/note/list`)
		.then(response => response.data);
}

export function deleteNote(id){
	return axios.post(`${BASE_URL}/api/note/delete/${id}`)
		.then(response => response.data)
		.catch(err => Promise.reject(err.message));
}
export function createNote(data) {
	return axios.post(`${BASE_URL}/api/note/create`, { title: data.title, body: data.body })
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
