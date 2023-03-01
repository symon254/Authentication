import React from "react";

const Pagination = ({ totalPosts, postsPerPage, paginate }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<>
			<div className="flex bg-white rounded-lg font-[Poppins] ">
				<button className="h-12 border-2 border-r-2 border-indigo-600 w-12 hover:bg-indigo-600 hover:text-white">
					prev
				</button>
				{pageNumbers.map((number) => (
					<button
						key={number}
						onClick={() => paginate(number)}
						className="h-12 border-2 border-r-1 border-indigo-600 w-12 hover:bg-indigo-800 hover:text-white"
					>
						{number}
					</button>
				))}
				<button className="h-12 border-2 border-r-2 border-indigo-600 w-12 hover:bg-indigo-600 hover:text-white">
					next
				</button>
			</div>
		</>
		// <nav>
		// 	<ul className="pagination">
		// 		{pageNumbers.map((number) => (
		// 			<li key={number} className="page-item">
		// 				<a onClick={()=> paginate(number)} href="" className="page-link">
		// 					{number}
		// 				</a>
		// 			</li>
		// 		))}
		// 	</ul>
		// </nav>
	);
};

export default Pagination;
