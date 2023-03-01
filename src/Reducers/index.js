import { combineReducers } from "redux";
import auth from "./auth";
import {
	userListReducer,
	userCreateReducer,
	userUpdateReducer,
	singleUserReducer,
} from "./users";
export default combineReducers({
	auth,
	userList: userListReducer,
	singleUser: singleUserReducer,
	userCreate: userCreateReducer,
	userUpdate: userUpdateReducer,
});
