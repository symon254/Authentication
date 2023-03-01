import {
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	//USER_LIST_FAIL,
	USER_REQUEST,
	USER_SUCCESS,
	//USER_FAIL,
	USER_CREATE_REQUEST,
	USER_CREATE_SUCCESS,
	//USER_CREATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	//USER_UPDATE_FAIL
} from "../constants/users";
import http from "../../Utils/api";

//const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));

export const retriveUser = (id) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REQUEST,
		});
		const res = await http.get(`/users/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		dispatch({
			type: USER_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const retrieveUsers = (page) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LIST_REQUEST,
		});
		const res = await http.get(`/users?page=${page}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		dispatch({
			type: USER_LIST_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		// dispatch({
		// 	type: USER_LIST_FAIL,
		// 	payload: err.response
		// });
		console.log(err);
	}
};

export const createUser = (name, email, location) => async (dispatch) => {
	try {
		dispatch({
			type: USER_CREATE_REQUEST,
		});
		const res = await http.post(
			`/users`,
			{ name, email, location },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		dispatch({
			type: USER_CREATE_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const updateUser = (params) => async (dispatch) => {
	try {
		dispatch({
			type: USER_UPDATE_REQUEST,
		});
		const data = {
			name: params.name,
			email: params.email,
			location: params.location,
		};
		const res = await http.put(`/users/${params.id}`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		dispatch({
			type: USER_UPDATE_SUCCESS,
			payload: res.data,
		});
		console.log("response of update", res.data);
	} catch (err) {
		console.log(err);
	}
};
