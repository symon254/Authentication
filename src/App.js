import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { links } from "./Link/Links";

import Layout from "./Container/Layout";
//import { Login } from "./Pages";
import Login from "./Pages/Auth/TestLogin";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const App = () => {
	//const { isLoggedIn } = useSelector((state) => state.auth);

	return (
		<div>
			<BrowserRouter>
				<ToastContainer />
				<Routes>
					{["/", "login"].map((path, index) => (
						<Route key={index} path={path} element={<Login />} />
					))}

					{links.public.map((item, i) => (
						<Route
							key={i}
							path={item.path}
							element={
								<Layout
									pageRoute={
										<item.element
											render={(props) => ({
												...props,
											})}
										/>
									}
								/>
							}
						/>
					))}
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
