import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../Actions/action/auth";
import Tilt from "react-parallax-tilt";
import LoginPic from "../../Data/login4.jpg";
import { MdEmail } from "react-icons/md";
import { Si1Password } from "react-icons/si";

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
		return <Navigate to="/dashboard" />;
	}
	return (
		<div className=" bg-gray-100 h-screen w-screen relative overflow-hidden flex justify-center items-center">
			<div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[300px] shadow-lg shadow-gray-700 sm:max-w-[900px] rounded-l-xl rounded-r-xl">
				<div className="w-[350px] rounded-l-xl blur-0 hidden md:block ">
					<img
						className="w-full h-full rounded-l-xl blur-0"
						src={LoginPic}
						alt="/"
					/>
				</div>
				<div className="p-4 flex flex-col justify-around rounded-tr-lg rounded-br-xl">
					<div className="">
						<p className="text-lg font-bold text-gray-900 ml-28">login</p>
					</div>
					<br />
					<div className="h-72 w-72 bg-gradient-to-r  from-green-200 via-green-400 to-green-700 rounded-full absolute left-[1150px] -top-28 transform rotate-160 animate-pulse"></div>
					<div className="h-72 w-72 bg-gradient-to-r  from-green-200 to-green-500 rounded-full absolute top-[500px] -left-28 transform rotate-180 animate-pulse"></div>
					<div>
						<div className="form-group">
							<div className="mb-6">
								<div className="flex items-center border-b border-teal-500 py-2">
									<MdEmail className="text-green-600" />
									<input
										className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
										type="email"
										id="email"
										required
										value={formData.email}
										onChange={handleInputChange}
										name="email"
									/>
								</div>
								<br />
								<div className="flex items-center border-b border-teal-500 py-2">
									<Si1Password className="text-green-600" />
									<input
										className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
										type="password"
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
										className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ml-28"
									>
										Submit
									</button>
								</div>
							</div>
						</div>
					</div>
					<Tilt></Tilt>
				</div>
			</div>
		</div>
	);
};

export default Login;
