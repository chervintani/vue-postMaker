import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export function getNotes() {
	return axios.get(`${BASE_URL}/api/note/list`)
		.then(response => response.data);
}

export function deleteNote(id) {
	return axios.post(`${BASE_URL}/api/note/delete/${id}`)
		.then(response => response.data)
		.catch(err => Promise.reject(err.message));
}
export function createNote(data) {
	return axios.post(`${BASE_URL}/api/note/create`, { title: data.title, body: data.body, location: data.location, filename: data.filename,image: data.image })
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


