import { useState } from "react";
import classes from "./Pagination.module.css";

const Pagination = ({ totalUsers, usersPerPage, changePage, currentPage }) => {
    const lastPageNum = Math.ceil(totalUsers / usersPerPage);
    const [firstVisiblePageNum, setFirstVisiblePageNum] = useState(1);
    const [lastVisiblePageNum, setLastVisiblePageNum] = useState(lastPageNum > 9 ? 9 : lastPageNum);
    const [tresholdPageNum, setTresholdPageNum] = useState(5);
    const pageNumbers = [];

    for (let i = firstVisiblePageNum; i <= lastVisiblePageNum; i++) {
        pageNumbers.push(i);
    }

    const changePageHandler = (event, number) => {
        event.preventDefault();
        if (number > tresholdPageNum) {
            const increment = number - tresholdPageNum;
            if (lastVisiblePageNum + increment > lastPageNum) {
                setFirstVisiblePageNum(lastPageNum - 9);
                setLastVisiblePageNum(lastPageNum);
                setTresholdPageNum(lastPageNum - 4);
            } else {
            setFirstVisiblePageNum((prevFirstPageNum) => prevFirstPageNum + increment);
            setLastVisiblePageNum((prevLastPageNum) => prevLastPageNum + increment);
            setTresholdPageNum((prevTresholdPageNum) => prevTresholdPageNum + increment);
            } 
        }
        if (number < tresholdPageNum) {
            if (number - 4 <= 1) {
                setFirstVisiblePageNum(1);
                setLastVisiblePageNum(lastPageNum > 9 ? 9 : lastPageNum);
                setTresholdPageNum(5);
            } else {
            const decrement = tresholdPageNum - number;
            setFirstVisiblePageNum((prevFirstPageNum) => prevFirstPageNum - decrement);
            setLastVisiblePageNum((prevLastPageNum) => prevLastPageNum - decrement);
            setTresholdPageNum((prevTresholdPageNum) => prevTresholdPageNum - decrement);
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
