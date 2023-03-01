import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_USER,
} from "../Actions/constants/auth";

const user = JSON.parse(localStorage.getItem("user"));

export default function (
	state = {
		user: user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: {} },
	},
	action
) {
	const { type, payload } = action;

	switch (type) {
		case LOGIN_REQUEST:
			return {
				loading: true,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				user: payload.user,
				loading: false,
			};
		case LOGIN_FAIL:
			return {
				...state,
				isLoggedIn: false,
				user: null,
				loading: false,
			};
		case LOGOUT_USER:
			return {};
		default:
			return state;
	}
}
