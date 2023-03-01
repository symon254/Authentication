import "../App.css";
import React, { Suspense } from "react";
import { useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { NavBar, ThemeSettings, Footer, SideBar } from "../Components";

import { useStateContext } from "../Context/ContextProvider";

function Layout({ pageRoute }) {
	const {
		setCurrentColor,
		setCurrentMode,
		currentMode,
		activeMenu,
		currentColor,
		themeSettings,
		setThemeSettings,
	} = useStateContext();

	useEffect(() => {
		const currentThemeColor = localStorage.getItem("colorMode");
		const currentThemeMode = localStorage.getItem("themeMode");
		if (currentThemeColor && currentThemeMode) {
			setCurrentColor(currentThemeColor);
			setCurrentMode(currentThemeMode);
		}
	}, []);

	return (
		<div className={currentMode === "Dark" ? "dark" : ""}>
			<div className="flex relative dark:bg-main-dark-bg">
				<div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
					<OverlayTrigger
						placement="left"
						overlay={
							<Tooltip
								style={{
									padding: "6px",
									background: "grey",
									color: "white",
									marginRight: "5px",
									borderRadius: "5px",
								}}
							>
								Settings
							</Tooltip>
						}
					>
						<button
							type="button"
							onClick={() => setThemeSettings(true)}
							className="text-2sm p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
							style={{
								background: currentColor,
								borderRadius: "50%",
							}}
						>
							<FiSettings />
						</button>
					</OverlayTrigger>
				</div>
				{activeMenu ? (
					<div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
						<SideBar />
					</div>
				) : (
					<div className="w-0 dark:bg-secondary-dark-bg ">
						<SideBar />
					</div>
				)}
				<div
					className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${
						activeMenu ? "md:ml-72" : "flex-2"
					}`}
				>
					<div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
						<NavBar />
					</div>

					<div>
						<Suspense fallback={<div>Loading...</div>}>
							{pageRoute}
						</Suspense>
						{themeSettings && <ThemeSettings />}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Layout;
