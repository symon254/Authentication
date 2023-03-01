import React from "react";
import { ButtonLogout } from "../Button/logoutButton";
import { useStateContext } from "../../Context/ContextProvider";
import { useDispatch } from "react-redux";
import { logout } from "../../Actions/action/auth";
import { MdOutlineCancel } from "react-icons/md";

import Button from "../Button/button";

const user = JSON.parse(localStorage.getItem("user"));

const LogoutPage = () => {
	const { currentColor } = useStateContext();
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<div className="nav-item absolute right-5 md:right-52 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
			<div className="flex justify-between items-center">
				<div className="flex justify-between gap-60 items-center">
					<p className="font-semibold text-lg">Logout</p>
					<Button
						icon={<MdOutlineCancel />}
						color="rgb(153, 171, 180)"
						bgHoverColor="light-gray"
						size="2xl"
						borderRadius="50%"
					/>
				</div>
			</div>
			<div className="gap-3 mt-7">
				<p className=" text-lg dark:text-gray-200">
					Thank You{" "}
					<span className="font-bold text-xl capitalize">{user.Name}</span>
				</p>
				<br />
			</div>
			<div className="mt-5">
				<ButtonLogout
					color="white"
					bgColor={currentColor}
					text="Logout"
					borderRadius="10px"
					width="full"
					onClick={handleLogout}
				/>
			</div>
		</div>
	);
};

export default LogoutPage;
