import React from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseFill } from "react-icons/ri";
import { MdEmail, MdPersonAdd } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { CiEdit } from "react-icons/ci";

const ContextP = ({ color, className, iconName }) => {
	return (
		<IconContext.Provider value={{ color: color, className: className }}>
			<div>{iconName}</div>
		</IconContext.Provider>
	);
};

class Icon {
	static LeftArrow = ({ color, className }) => {
		return (
			<ContextP
				color={color}
				className={className}
				iconName={<BiLeftArrowAlt />}
			/>
		);
	};

	static RightArrow = ({ color, className }) => {
		return (
			<ContextP
				color={color}
				className={className}
				iconName={<BiRightArrowAlt />}
			/>
		);
	};
	static View = ({ color, className }) => {
		return (
			<ContextP
				color={color}
				className={className}
				iconName={<BsFillEyeFill />}
			/>
		);
	};
	static UnView = ({ color, className }) => {
		return (
			<ContextP
				color={color}
				className={className}
				iconName={<RiEyeCloseFill />}
			/>
		);
	};
	static AddUser = ({ color, className }) => {
		return (
			<ContextP
				color={color}
				className={className}
				iconName={<MdPersonAdd />}
			/>
		);
	};
	static EmailIcon = ({ color, className }) => {
		return (
			<ContextP color={color} className={className} iconName={<MdEmail />} />
		);
	};
	static UserIcon = ({ color, className }) => {
		return (
			<ContextP color={color} className={className} iconName={<FaUser />} />
		);
	};
	static LocationIcon = ({ color, className }) => {
		return (
			<ContextP
				color={color}
				className={className}
				iconName={<ImLocation2 />}
			/>
		);
	};
	static EditIcon = ({ color, className }) => {
		return (
			<ContextP color={color} className={className} iconName={<CiEdit />} />
		);
	};
}

ContextP.defaultProps = {
	color: "blue",
	className: "text-xl",
};

ContextP.propTypes = {
	color: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
	iconName: PropTypes.node.isRequired,
};

export default Icon;
