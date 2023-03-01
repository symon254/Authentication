import React, { useMemo } from "react";
import classnames from "classnames";
import comma from "./commaSeparator";
import Icon from "../Button/Icon";

const DOTS = "...";

const range = (start, end) => {
	let length = end - start + 1;
	return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({
	totalCount,
	pageSize,
	siblingCount = 1,
	currentPage,
}) => {
	const paginationRange = useMemo(() => {
		const totalPageCount = Math.ceil(totalCount / pageSize);

		// Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
		const totalPageNumbers = siblingCount + 5;

		/*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount);
		}

		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(
			currentPage + siblingCount,
			totalPageCount
		);

		/*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
		const shouldShowLeftDots = leftSiblingIndex > 2;
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

		const firstPageIndex = 1;
		const lastPageIndex = totalPageCount;

		if (!shouldShowLeftDots && shouldShowRightDots) {
			let leftItemCount = 3 + 2 * siblingCount;
			let leftRange = range(1, leftItemCount);

			return [...leftRange, DOTS, totalPageCount];
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			let rightItemCount = 3 + 2 * siblingCount;
			let rightRange = range(
				totalPageCount - rightItemCount + 1,
				totalPageCount
			);
			return [firstPageIndex, DOTS, ...rightRange];
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange = range(leftSiblingIndex, rightSiblingIndex);
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
		}
	}, [totalCount, pageSize, siblingCount, currentPage]);

	return paginationRange;
};

const Pagination = (props) => {
	const {
		onPageChange,
		totalCount,
		siblingCount = 1,
		currentPage,
		pageSize,
		className,
		key,
	} = props;

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange[paginationRange.length - 1];
	return (
		<nav aria-label="Table navigation">
			<ul
				className={classnames("inline-flex items-center", {
					[className]: className,
				})}
			>
				<li>
					<button
						className={classnames(
							"align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium p-1 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10",
							{
								"pointer-events-none": currentPage === 1,
							}
						)}
						onClick={onPrevious}
						type="button"
						aria-label="Previous"
					>
						{/* <i className="bx bx-chevron-left text-xl" /> */}

						<Icon.LeftArrow color="blue" className="text-xl" />
					</button>
				</li>

				{paginationRange.map((pageNumber, index) => {
					if (pageNumber === DOTS) {
						return (
							<li key={index} className="dots">
								&#8230;
							</li>
						);
					}

					return (
						<li key={index}>
							<button
								className={classnames(
									"align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-semibold px-3 py-1 rounded-md text-xs focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-200 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-500 dark:hover:bg-opacity-10",
									{
										"text-white active:bg-purple-600 bg-purple-600 hover:bg-purple-700 focus:ring focus:ring-purple-300":
											pageNumber === currentPage,
									}
								)}
								onClick={() => onPageChange(pageNumber)}
								type="button"
							>
								{comma(pageNumber)}
							</button>
						</li>
					);
				})}

				<li>
					<button
						className={classnames(
							"align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium p-1 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10",
							{
								"pointer-events-none": currentPage === comma(lastPage),
							}
						)}
						onClick={onNext}
						type="button"
						aria-label="Next"
					>
						{/* <i className="bx bx-chevron-right text-xl" /> */}

						<Icon.RightArrow color="blue" className="text-xl" />
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
