import { useState } from "react";
import classes from "./Pagination.module.css";

const Pagination = ({ totalUsers, usersPerPage, changePage, currentPage, maxVisiblePageLinks }) => {
    const lastPageNum = Math.ceil(totalUsers / usersPerPage);
    const [firstVisiblePageNum, setFirstVisiblePageNum] = useState(1);
    const [lastVisiblePageNum, setLastVisiblePageNum] = useState(lastPageNum > maxVisiblePageLinks ? maxVisiblePageLinks : lastPageNum);
    const [tresholdPageNum, setTresholdPageNum] = useState(lastPageNum <= maxVisiblePageLinks ? null : Math.ceil(lastVisiblePageNum / 2));
    const pageNumbers = [];

    for (let i = firstVisiblePageNum; i <= lastVisiblePageNum; i++) {
        pageNumbers.push(i);
    }

    const changePageHandler = (event, number) => {
        event.preventDefault();
        if (tresholdPageNum) {
            if (number > tresholdPageNum) {
                const increment = number - tresholdPageNum;
                if (lastVisiblePageNum + increment > lastPageNum) {
                    const newFirstVisiblePageLink = lastPageNum - maxVisiblePageLinks
                    setFirstVisiblePageNum(newFirstVisiblePageLink);
                    setLastVisiblePageNum(lastPageNum);
                    setTresholdPageNum(newFirstVisiblePageLink +  Math.ceil(((lastPageNum - newFirstVisiblePageLink) / 2)));
                } else {
                setFirstVisiblePageNum((prevFirstPageNum) => prevFirstPageNum + increment);
                setLastVisiblePageNum((prevLastPageNum) => prevLastPageNum + increment);
                setTresholdPageNum((prevTresholdPageNum) => prevTresholdPageNum + increment);
                } 
            }
            if (number < tresholdPageNum) {
                // if the selected page index is below the first treshold point than set the indexes at the starting point
                if (number - Math.ceil(maxVisiblePageLinks / 2) < 1) {
                    setFirstVisiblePageNum(1);
                    setLastVisiblePageNum(lastPageNum > maxVisiblePageLinks ? maxVisiblePageLinks : lastPageNum);
                    setTresholdPageNum(Math.ceil(maxVisiblePageLinks / 2));
                } else {
                const decrement = tresholdPageNum - number;
                setFirstVisiblePageNum((prevFirstPageNum) => prevFirstPageNum - decrement);
                setLastVisiblePageNum((prevLastPageNum) => prevLastPageNum - decrement);
                setTresholdPageNum((prevTresholdPageNum) => prevTresholdPageNum - decrement);
                }               
            }
        }

        changePage(number);
    };

    return (
        <nav>
            <ul className={classes.page_numbers_container}>
                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber} className={classes.page_number}>
                        <a
                            href=""
                            onClick={(e) => changePageHandler(e, pageNumber)}
                            className={
                                pageNumber === currentPage ? classes.active : ""
                            }
                        >
                            {pageNumber}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
