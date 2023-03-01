import React, { useState } from "react";
import { useTable, useSortBy } from "react-table";

export const Pagination = ({ children, className, ...rest }) => {
	return (
		<div
			className={`px-4 py-3 border-t  bg-gray-50 text-gray-600  ${className}`}
		>
			{children}
		</div>
	);
};

const Table = ({ columns, data, Paging }) => {
	const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
		useTable(
			{
				columns,
				data,
			},
			useSortBy
		);

	return (
		<section className=" mx-auto max-w-full">
			<div className=" w-full shadow-lg overflow-hidden rounded-md ring-1 ring-black ring-opacity-5 mb-8">
				<div className="h-full w-full overflow-x-auto overflow-y-auto">
					{/* apply the table props */}
					<table
						{...getTableProps()}
						className="h-full w-full whitespace-nowrap"
					>
						<thead className="text-sm font-bold tracking-wide text-left text-gray-900 uppercase border-b border-gray-300 bg-gray-50 ">
							{/* Loop over the header rows */}
							{headerGroups.map((headerGroup) => (
								// Apply the header row props
								<tr {...headerGroup.getHeaderGroupProps()}>
									{/* Loop over the headers in each row */}
									{headerGroup.headers.map((column) => (
										<th
											scope="col"
											className="px-3 py-2"
											// Render the header
											{...column.getHeaderProps()}
										>
											<div className="flex items-center justify-between">
												{column.render("Header")}
											</div>
										</th>
									))}
								</tr>
							))}
						</thead>

						{/* Apply the table body props */}

						<tbody
							{...getTableBodyProps()}
							className="bg-white divide-y divide-gray-300  text-gray-600 "
						>
							{
								// Loop over the table rows
								rows.map((row, i) => {
									// Prepare the row for display
									prepareRow(row);
									return (
										// Apply the row props
										<tr
											className="border-b border-gray-300 hover:bg-gray-100"
											{...row.getRowProps()}
										>
											BiRightArrowAlt{" "}
											{
												// Loop over the rows cells
												row.cells.map((cell) => {
													// Apply the cell props
													return (
														<td
															{...cell.getCellProps()}
															className="px-3 py-2"
															role="cell"
														>
															{cell.column.Cell.name ===
															"defaultRenderer" ? (
																<span className="text-sm">
																	{/* Render the cell contents */}
																	{cell.render("Cell")}
																</span>
															) : (
																cell.render("Cell")
															)}
														</td>
													);
												})
											}
										</tr>
									);
								})
							}
						</tbody>
					</table>
				</div>
				<Pagination>{Paging}</Pagination>
			</div>
		</section>
	);
};
export default Table;
