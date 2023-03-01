import React from "react";
import { Link, NavLink } from "react-router-dom";
import { GiCommercialAirplane } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useStateContext } from "../../Context/ContextProvider";
import { links } from "../../Link/Links";
import avatar from "../../Data/avatar.jpeg";

const user = JSON.parse(localStorage.getItem("user"));

const SideBar = () => {
	const { currentColor, activeMenu, setActiveMenu, screenSize } =
		useStateContext();

	const handleCloseSideBar = () => {
		if (activeMenu !== undefined && screenSize <= 900) {
			setActiveMenu(false);
		}
	};

	const activeLink =
		"flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
	const normalLink =
		"flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

	return (
		<div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
			{activeMenu && (
				<>
					<div className="flex justify-between items-center">
						<div className="justify-center ml-16 items-center mt-6 -mb-11">
							<img
								className="rounded-full w-20 h-20"
								src={avatar}
								alt="user-profile"
							/>
							<p>
								<span className="text-gray-600 text-14 ml-5">
									Hello,
								</span>
								<br />
								<span className="text-gray-900 font-bold ml-5 text-14">
									{user.Name}
								</span>
							</p>
						</div>

						<OverlayTrigger
							placement="bottom"
							overlay={
								<Tooltip
									style={{
										padding: "2px",
										background: "grey",
										color: "white",
										borderRadius: "5px",
									}}
								>
									Close
								</Tooltip>
							}
						>
							<button
								type="button"
								style={{ color: currentColor }}
								onClick={() => setActiveMenu(!activeMenu)}
								className="text-xl rounded-full p-3 hover:bg-light-gray -mt-10 block md:hidden "
							>
								<MdOutlineCancel />
							</button>
						</OverlayTrigger>
					</div>
					<ul className="min-h-min left-0 top-0 bottom-0 my-20 h-3/4 overflow-y-auto overflow-x-hidden pb-2 pt-1">
						{links.sidebar.map((route, index) => (
							<li key={index} className="rounded-full py-1 px-1 ">
								<NavLink
									key={index}
									to={route.path}
									style={({ isActive }) => ({
										backgroundColor: isActive ? currentColor : "",
									})}
									className={({ isActive }) =>
										`text-md m-1 flex items-center gap-5 rounded-lg pl-4 pt-3 pb-2.5 
               ${
						isActive
							? `text-white bg-[${currentColor}]`
							: "themeText mx-2 duration-200 ease-in hover:scale-x-105 hover:bg-light-gray dark:hover:bg-gray-200 dark:hover:text-black"
					}`
									}
								>
									{route.icon}
									<p className="ml-1 capitalize">{route.name}</p>
								</NavLink>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};

export default SideBar;
