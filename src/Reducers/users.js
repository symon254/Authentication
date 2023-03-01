import {
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_REQUEST,
	USER_SUCCESS,
	USER_FAIL,
	USER_CREATE_REQUEST,
	USER_CREATE_SUCCESS,
	USER_CREATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
} from "../Actions/constants/users";

export const userListReducer = (
	state = { users: [], totalCount: 0, pages: 0 },
	action
) => {
	const { type, payload } = action;
	switch (type) {
		case USER_LIST_REQUEST:
			return {
				...state,
				loading: true,
			};
		case USER_LIST_SUCCESS:
			return {
				loading: false,
				users: payload.data,

				totalCount: payload.total_pages,
				pages: payload.page,
			};

		case USER_LIST_FAIL:
			return {
				loading: false,
				error: payload,
			};

		default:
			return state;
	}
};

export const singleUserReducer = (state = { user: {} }, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_REQUEST:
			return {
				...state,
				loading: true,
			};
		case USER_SUCCESS:
			return {
				loading: false,
				user: payload,
			};

		case USER_FAIL:
			return {
				loading: false,
				error: payload,
			};
		case USER_UPDATE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case USER_UPDATE_SUCCESS:
			return {
				user: payload.data,
				loading: false,
			};

		case USER_UPDATE_FAIL:
			return {
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
};

export const userCreateReducer = (state = { user: {} }, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_CREATE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case USER_CREATE_SUCCESS:
			return {
				loading: false,
				user: payload.data,
			};

		case USER_CREATE_FAIL:
			return {
				loading: false,
				error: payload,
			};

		default:
			return state;
	}
};

export const userUpdateReducer = (state = { user: {} }, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_UPDATE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case USER_UPDATE_SUCCESS:
			return state.map((user) => {
				if (user.id === payload.id) {
					return {
						...state,
						...payload,
						loading: false,
					};
				} else {
					return state;
				}
			});

		case USER_UPDATE_FAIL:
			return {
				loading: false,
				error: payload,
			};

		default:
			return state;
	}
};
