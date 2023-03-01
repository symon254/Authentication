import React from "react";
import PropTypes from "prop-types";

export const ModalHeader = ({ children, toggler }) => {
	return (
		<div className="flex items-center justify-between mb-6">
			<h5 className="text-gray-900 text-2xl font-semibold mt-0 mb-0">
				{children}
			</h5>
			<button
				className="p-1 bg-transparent absolute top-2 right-4 text-gray-900 text-3xl leading-none outline-none focus:outline-none"
				onClick={toggler}
			>
				<span className="text-gray-900 text-3xl block">&times;</span>
			</button>
		</div>
	);
};

export const ModalBody = ({ children }) => {
	return <div className=" mb-6">{children}</div>;
};

export const ModalFooter = ({ children }) => {
	return <div className="flex items-center justify-end gap-4">{children}</div>;
};

export const Modal = ({ children, size, active, toggler }) => {
	let modalSize;

	if (size === "sm") {
		modalSize = "max-w-sm";
	} else if (size === "md") {
		modalSize = "max-w-xl";
	} else if (size === "lg") {
		modalSize = "max-w-6xl";
	} else {
		modalSize = "max-w-3xl";
	}

	return (
		<>
			<div
				className={`${
					active
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				} grid place-items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-all duration-500`}
				onClick={toggler}
			>
				<div
					className={`transform ${
						active
							? "opacity-100 translate-y-0"
							: "opacity-0 -translate-y-10"
					} w-screen my-6 mx-auto ${modalSize} transition-all duration-500`}
				>
					<div
						className={`border-0 p-6 ${
							size === "lg"
								? "rounded-xl shadow-xl"
								: "rounded-lg shadow-lg"
						} flex flex-col w-full bg-white outline-none focus:outline-none`}
						onClick={(e) => e.stopPropagation()}
					>
						{children}
					</div>
				</div>
			</div>
			<div
				className={`${
					active
						? "opacity-25 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				} fixed inset-0 z-40 bg-black transition-all duration-500`}
			/>
		</>
	);
};

Modal.defaultProps = {
	size: "regular",
};
Modal.propTypes = {
	children: PropTypes.node.isRequired,
	size: PropTypes.string.isRequired,
	active: PropTypes.bool.isRequired,
	toggler: PropTypes.func.isRequired,
};
ModalHeader.propTypes = {
	children: PropTypes.node.isRequired,
	toggler: PropTypes.func.isRequired,
};
ModalBody.propTypes = {
	children: PropTypes.node.isRequired,
};
ModalFooter.propTypes = {
	children: PropTypes.node.isRequired,
};
