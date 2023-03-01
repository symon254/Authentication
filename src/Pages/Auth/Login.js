import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import LoginPic from "../../Data/login.jpg";
import { login } from "../../Actions/action/auth";

const Login = () => {
	const initialLoginState = {
		email: "",
		password: "",
	};
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState(initialLoginState);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = () => {
		const { email, password } = formData;
		dispatch(login(email, password));
	};

	const { isLoggedIn } = useSelector((state) => state.auth);
	console.log("is he/she loged in", isLoggedIn);

	if (isLoggedIn) {
		//window.location.reload(false);
		return <Navigate to="/dashboard" />;
	}

	return (
		<div className="w-full h-screen flex">
			<div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]">
				<div className="w-full h-[550px] hidden md:block">
					<img className="w-full h-full" src={LoginPic} alt="/" />
				</div>
				<div className="p-4 flex flex-col justify-around">
					<div>
						<div className="mb-6">
							<label
								htmlFor="email"
								className="block mb-2 text-sm uppercase font-medium text-gray-900 dark:text-white"
							>
								email
							</label>
							<input
								type="email"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								id="email"
								required
								value={formData.email}
								onChange={handleInputChange}
								name="email"
							/>
						</div>
						<div className="form-group">
							<label
								htmlFor="password"
								className="block mb-2 text-sm uppercase font-medium text-gray-900 dark:text-white"
							>
								password
							</label>
							<input
								type="password"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								id="password"
								required
								value={formData.password}
								onChange={handleInputChange}
								name="password"
							/>
						</div>
						<br />
						<div>
							<button
								onClick={handleSubmit}
								className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Login;
