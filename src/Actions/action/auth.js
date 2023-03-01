import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_USER,
} from "../constants/auth";

import http from "../../Utils/api";

export const login = (email, password) => async (dispatch) => {
	dispatch({
		type: LOGIN_REQUEST,
	});
	try {
		const res = await http.post("/authaccount/login", { email, password });

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		localStorage.setItem("user", JSON.stringify(res.data.data));
		localStorage.setItem("userName", JSON.stringify(res.data.data.Name));
		localStorage.setItem("email", JSON.stringify(res.data.data.Email));
		localStorage.setItem("token", JSON.stringify(res.data.data.Token));
	} catch (err) {
		dispatch({
			type: LOGIN_FAIL,
			payload: err,
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.clear();
	dispatch({ type: LOGOUT_USER });
	document.location.href = "/login";
};
