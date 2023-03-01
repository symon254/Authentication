import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Pagination from "../../Components/Table/Pagination";
import {
	createUser,
	retrieveUsers,
	updateUser,
} from "../../Actions/action/users";
import { useStateContext } from "../../Context/ContextProvider";
import { InfinitySpin } from "react-loader-spinner";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "../../Components/Modal/Modal";
import Icon from "../../Components/Button/Icon";
import { Link } from "react-router-dom";

const Paginations = ({ children, className, ...rest }) => {
	return (
		<div
			className={`px-4 py-3 border-t  bg-gray-50 text-gray-600  ${className}`}
		>
			{children}
		</div>
	);
};

const Users = () => {
	//states for data, toggle icon, and modals
	const [dataView, setDataView] = useState({});
	const [updateData, setUpdateData] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [toggle, setToggle] = useState(true);

	const dispatch = useDispatch();

	//context api
	const { currentColor } = useStateContext();

	//pagination states
	const [page, setPage] = useState(1);
	const [pageSize] = useState(10);

	//accessing our states in store
	const userList = useSelector((state) => state.userList);
	const { loading, users, error, totalCount } = userList;

	//total pages
	const a = totalCount;
	const b = 10;
	const totalPages = parseInt(a) / parseInt(b);

	//retrieving users
	const tableData = () => {
		dispatch(retrieveUsers(page));
	};
	useEffect(tableData, [dispatch, page]);

	/*--add user section--*/
	const initialUserState = {
		name: "",
		email: "",
		location: "",
	};

	const [userCreate, setUserCreate] = useState(initialUserState);

	//inpute change handled here for adding user
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserCreate({ ...userCreate, [name]: value });
	};

	const saveUser = () => {
		const { name, email, location } = userCreate;
		dispatch(createUser(name, email, location))
			.then((data) => {
				setUserCreate({
					name: data.name,
					email: data.email,
					location: data.location,
				});
			})
			.catch((e) => {
				console.log(e);
			});
		setUserCreate(initialUserState);
		setShowAddModal(false);
	};
	/*--update user section--*/
	// const initialUpdateState = {
	// 	id: null,
	// 	name: "",
	// 	email: "",
	// 	location: "",
	// };
	// const [currentUser, setCurrentUser] = useState(initialUpdateState);

	// const updateUsers = () => {
	// 	const data = {
	// 		id: currentUser.id,
	// 		name: currentUser.name,
	// 		email: currentUser.email,
	// 		location: currentUser.location,
	// 	};
	// 	dispatch(updateUser(currentUser.id, data))
	// 		.then((response) => {
	// 			setCurrentUser({ ...currentUser });
	// 			console.log(response);
	// 		})
	// 		.catch((e) => {
	// 			console.log(e);
	// 		});
	// };

	return (
		<main className="mt-7 mb-10">
			<div className="mt-4">
				<label className="p-2 uppercase text-xl font-bold">
					list of users
				</label>
			</div>
			<div className="flex ">
				{loading ? (
					<p>
						<InfinitySpin width="100" color={currentColor} />
					</p>
				) : null}
				{error ? <p>error</p> : null}
			</div>
			<div className="mr-14 mb-3 float-right">
				<button
					type="button"
					data-te-toggle="tooltip"
					data-te-placement="bottom"
					data-te-ripple-init
					data-te-ripple-color="light"
					title="Add User"
					className={`hover:border-b-2 `}
					onClick={() => {
						setShowAddModal(true);
					}}
				>
					<Icon.AddUser color={currentColor} className="text-3xl " />
				</button>
			</div>
			<section className=" mx-auto max-w-full ml-2">
				<div className=" w-full shadow-lg overflow-hidden rounded-md ring-1 ring-black ring-opacity-5 mb-8">
					<div className="h-full w-full overflow-x-auto overflow-y-auto">
						<table className="h-full w-full whitespace-nowrap">
							<thead className="text-sm font-bold tracking-wide text-left text-gray-900 uppercase border-b border-gray-300 bg-gray-50 ">
								<tr className="border-b border-gray-300 hover:bg-gray-100">
									<th>ID</th>
									<th>name</th>
									<th>email</th>
									<th>location</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-300  text-gray-600 ">
								{users.map((userData) => {
									return (
										<tr
											key={userData.id}
											className="border-b border-gray-300 hover:bg-gray-100"
										>
											<td className="px-3 py-2">{userData.id}</td>
											<td className="px-3 py-2">{userData.name}</td>
											<td className="px-3 py-2">{userData.email}</td>
											<td className="px-3 py-2">
												{userData.location}
											</td>

											<td className="px-3 py-2">
												<div>
													{toggle ? (
														<button
															onClick={() => {
																setToggle(false);
																setDataView(userData);
																setShowModal(true);
															}}
														>
															<Icon.View
																color={currentColor}
																className="text-xl"
															/>
														</button>
													) : (
														<button
															onClick={() => {
																setDataView(userData);
																setShowModal(true);
															}}
														>
															<Icon.UnView
																color={currentColor}
																className="text-xl"
															/>
														</button>
													)}
													{/* <button
														onClick={() => {
															setUpdateData(userData);
															setShowUpdateModal(true);
														}}
													>
														<Icon.EditIcon
															color={currentColor}
															className="text-xl"
														/>
													</button> */}
													<button>
														<Link to={`/users/${userData.id}`}>
															<Icon.EditIcon
																color={currentColor}
																className="text-xl"
															/>
														</Link>
													</button>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						<Paginations>
							<div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 ">
								<span className="flex items-center font-semibold uppercase">
									showing {page} of {totalPages}
								</span>

								<div className="flex mt-2 sm:mt-auto sm:justify-end">
									<Pagination
										className="text-2xl"
										currentPage={page}
										totalCount={totalCount}
										pageSize={pageSize}
										onPageChange={(e) => setPage(e)}
									/>
								</div>
							</div>
						</Paginations>
						{dataView && (
							<Modal
								size="sm"
								active={showModal}
								toggler={() => {
									setShowModal(false);
								}}
							>
								<ModalHeader
									toggler={() => {
										setShowModal(false);
										setToggle(true);
									}}
								>
									<div className="p-4">User Details</div>
								</ModalHeader>
								<ModalBody>
									<div className="p-3">
										<div>
											<label className="font-bold text-xl uppercase mr-4">
												user_id:
											</label>
											<label className="text-md">
												{" "}
												{dataView.id}
											</label>
										</div>
										<div>
											<label className="font-bold text-xl uppercase mr-4">
												User_Name:
											</label>
											<label className="text-md">
												{" "}
												{dataView.name}
											</label>
										</div>
										<div>
											<label className="font-bold text-xl uppercase mr-4">
												User_Email:
											</label>
											<label className="text-md">
												{" "}
												{dataView.email}
											</label>
										</div>
										<div>
											<label className="font-bold text-xl uppercase mr-4">
												Location:
											</label>
											<label className="text-md">
												{dataView.location}
											</label>
										</div>
									</div>
								</ModalBody>
								<ModalFooter>
									<button
										type="link"
										onClick={(e) => {
											setShowModal(false);
											setToggle(true);
										}}
									>
										Close
									</button>
								</ModalFooter>
							</Modal>
						)}
					</div>
				</div>
			</section>
			<div>
				<Modal
					size="md"
					active={showAddModal}
					toggler={() => {
						setShowAddModal(false);
					}}
				>
					<ModalHeader
						toggler={() => {
							setShowAddModal(false);
						}}
					>
						<div className="p-4">Add User</div>
					</ModalHeader>
					<ModalBody>
						<div>
							<div>
								<div className="flex flex-wrap -mx-3 mb-6">
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<div className="flex items-center border-b border-teal-500 py-2">
											<Icon.UserIcon
												color={currentColor}
												className="text-xl "
											/>
											<input
												className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
												type="text"
												id="name"
												required
												value={userCreate.name}
												onChange={handleInputChange}
												name="name"
												placeholder="NAME"
											/>
										</div>
									</div>

									<div className="w-full md:w-1/2 px-3">
										<div className="flex items-center border-b border-teal-500 py-2">
											<Icon.EmailIcon
												color={currentColor}
												className="text-xl "
											/>
											<input
												className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
												type="email"
												id="email"
												required
												value={userCreate.email}
												onChange={handleInputChange}
												name="email"
												placeholder="EMAIL"
											/>
										</div>
									</div>
									<div className="w-full md:w-1/2 px-3">
										<div className="flex items-center border-b border-teal-500 py-2">
											<Icon.LocationIcon
												color={currentColor}
												className="text-xl "
											/>
											<input
												className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
												type="text"
												id="location"
												required
												value={userCreate.location}
												onChange={handleInputChange}
												name="location"
												placeholder="LOCATION"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</ModalBody>
					<ModalFooter>
						<button
							onClick={saveUser}
							className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ml-28"
						>
							Submit
						</button>
						<button
							type="link"
							onClick={(e) => {
								setShowModal(false);
							}}
						>
							Close
						</button>
					</ModalFooter>
				</Modal>
			</div>
		</main>
	);
};

export default Users;
