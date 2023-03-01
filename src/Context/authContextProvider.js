import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Actions/action/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			dispatch(login());
		}
	}, []);
	return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
