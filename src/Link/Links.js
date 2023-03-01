import { FiActivity, FiUser } from "react-icons/fi";
import { Dashboard, Users, Add } from "../Pages";

export const links = {
	title: "Dashboard",
	public: [
		{
			element: Dashboard,
			path: "/dashboard",
		},
		{
			element: Users,
			path: "/users",
		},
		{
			element: Add,
			path: "/users/:id",
		},
	],

	sidebar: [
		{
			path: "/dashboard",
			name: "Dashboard",
			icon: <FiActivity />,
		},
		{
			path: "/users",
			name: "User",
			icon: <FiUser />,
		},
	],
};
