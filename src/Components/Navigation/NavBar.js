import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart, FiLogOut, FiUser } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import avatar from "../../Data/avatar.jpeg";
import { Cart, Chat, Notification, UserProfile, LogoutPage } from "../";
import { useStateContext } from "../../Context/ContextProvider";

const user = JSON.parse(localStorage.getItem("user"));

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
	<OverlayTrigger
		placement="bottom"
		overlay={
			<Tooltip
				style={{
					padding: "4px",
					background: "grey",
					color: "white",
					borderRadius: "5px",
				}}
			>
				{title}
			</Tooltip>
		}
	>
		<button
			type="button"
			onClick={() => customFunc()}
			style={{ color }}
			className="relative text-xl rounded-full p-3 hover:bg-light-gray"
		>
			<span
				style={{ background: dotColor }}
				className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
			/>
			{icon}
		</button>
	</OverlayTrigger>
);

const NavBar = () => {
	const {
		currentColor,
		activeMenu,
		setActiveMenu,
		handleClick,
		isClicked,
		setScreenSize,
		screenSize,
	} = useStateContext();

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (screenSize <= 900) {
			setActiveMenu(false);
		} else {
			setActiveMenu(true);
		}
	}, [screenSize]);

	const handleActiveMenu = () => setActiveMenu(!activeMenu);

	return (
		<div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
			<div className="-ml-10">
				<NavButton
					title="Menu"
					customFunc={handleActiveMenu}
					color={currentColor}
					icon={<AiOutlineMenu />}
				/>
			</div>

			<div className="flex">
				<NavButton
					title="Cart"
					customFunc={() => handleClick("cart")}
					color={currentColor}
					icon={<FiShoppingCart />}
				/>
				<NavButton
					title="Chat"
					dotColor="#03C9D7"
					customFunc={() => handleClick("chat")}
					color={currentColor}
					icon={<BsChatLeft />}
				/>
				<NavButton
					title="Notification"
					dotColor="rgb(254, 201, 15)"
					customFunc={() => handleClick("notification")}
					color={currentColor}
					icon={<RiNotification3Line />}
				/>
				<NavButton
					title="profile"
					customFunc={() => handleClick("userProfile")}
					color={currentColor}
					icon={<FiUser />}
				/>
				<NavButton
					title="Logout"
					customFunc={() => handleClick("logout")}
					color={currentColor}
					icon={<FiLogOut />}
				/>

				{isClicked.cart && <Cart />}
				{isClicked.logout && <LogoutPage />}
				{isClicked.chat && <Chat />}
				{isClicked.notification && <Notification />}
				{isClicked.userProfile && <UserProfile />}
			</div>
		</div>
	);
};

export default NavBar;
