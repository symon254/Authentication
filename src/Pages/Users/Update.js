import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "../../Components/Modal/Modal";
import { useStateContext } from "../../Context/ContextProvider";
import Icon from "../../Components/Button/Icon";
import { useDispatch, useSelector } from "react-redux";
import { retriveUser, updateUser } from "../../Actions/action/users";

const Add = ({}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	const initialUpdateState = {
		id: null,
		name: "",
		email: "",
		location: "",
	};
	const [currentUser, setCurrentUser] = useState(initialUpdateState);

	const [showModal, setShowModal] = useState(true);

	//context api
	const { currentColor } = useStateContext();

	//accsing our state from store
	const { user } = useSelector((state) => state.singleUser);
	//console.log("single user", user);

	// use effect
	useEffect(() => {
		dispatch(retriveUser(id));
	}, [dispatch, id]);
	//console.log("user id", id);
	useEffect(() => {
		if (user) {
			setCurrentUser({ ...user });
		}
	}, [user]);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setCurrentUser({ ...currentUser, [name]: value });
	};

	const handleClose = () => {
		navigate("/users");
	};

	const handleSubmit = () => {
		const params = {
			id: id,
		};
		const data = {
			name: currentUser.name,
			email: currentUser.email,
			location: currentUser.location,
		};
		console.log("data", data);
		dispatch(updateUser(params, data));
	};
	// const handleSubmit = () => {
	// 	const data = {
	// 		name: currentUser.name,
	// 		email: currentUser.email,
	// 		location: currentUser.location,
	// 	};
	// 	console.log("data", data);
	// 	dispatch(updateUser(id, data));
	// 	setCurrentUser({ ...currentUser });
	// };
	return (
		<div>
			<Modal
				size="sm"
				active={showModal}
				toggler={() => setShowModal(false)}
			>
				<ModalHeader
					toggler={() => {
						handleClose();
						setShowModal(false);
					}}
				>
					Update a User
				</ModalHeader>
				<ModalBody>
					<div>
						<div className="flex items-center border-b border-teal-500 py-2">
							<Icon.UserIcon
								color={currentColor}
								className="text-2xl bg-gray-200 p-1 rounded-sm -mb-2 "
							/>
							<input
								className="-mb-2 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
								type="text"
								id="name"
								required
								value={currentUser.name || ""}
								onChange={handleInputChange}
								name="name"
								placeholder="NAME"
							/>
						</div>
						<div className="flex items-center border-b border-teal-500 py-2">
							<Icon.EmailIcon
								color={currentColor}
								className="text-2xl bg-gray-200 p-1 rounded-sm -mb-2 "
							/>
							<input
								className="-mb-2 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
								type="email"
								id="email"
								required
								value={currentUser.email || ""}
								onChange={handleInputChange}
								name="email"
								placeholder="EMAIL"
							/>
						</div>
						<div className="flex items-center border-b border-teal-500 py-2">
							<Icon.LocationIcon
								color={currentColor}
								className="text-2xl bg-gray-200 p-1 rounded-sm -mb-2"
							/>
							<input
								className="-mb-2 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
								type="text"
								id="location"
								required
								value={currentUser.location || ""}
								onChange={handleInputChange}
								name="location"
								placeholder="LOCATION"
							/>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<button
						onClick={handleSubmit}
						className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ml-28"
					>
						Save Changes
					</button>
					<button
						type="link"
						onClick={(e) => {
							handleClose();
							setShowModal(false);
						}}
					>
						Close
					</button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default Add;
