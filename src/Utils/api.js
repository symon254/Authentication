import axios from "axios";

//const user = JSON.parse(localStorage.getItem("user"));
const api = axios.create({
	baseURL: "http://restapi.adequateshop.com/api",
	headers: {
		"Content-Type": "application/json",
		//Authorization: `Bearer ${user.Token}`,
	},
});

// request interceptor to add the auth token header to requests

// api.interceptors.request.use(
// 	(config) => {
// 		config.headers = {
// 			Authorization: `Bearer ${user.Token}`,
// 		};

// 		return config;
// 	},
// 	(err) => {
// 		Promise.reject(err);
// 	}
// );

// api.interceptors.request.use(
// 	(config) => {
// 		const user = JSON.parse(localStorage.getItem("user"));
// 		let token = user.Token;

// 		config.headers = {
// 			Authorization: "Bearer " + token,
// 		};

// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );

export default api;
