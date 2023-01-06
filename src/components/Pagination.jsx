import { useState } from "react";
import classes from "./Pagination.module.css";

const Pagination = ({ totalUsers, usersPerPage, changePage, currentPage, maxVisiblePageLinks }) => {
    const lastPageNum = Math.ceil(totalUsers / usersPerPage);
    const [firstVisiblePageNum, setFirstVisiblePageNum] = useState(1);
    const [lastVisiblePageNum, setLastVisiblePageNum] = useState(lastPageNum > maxVisiblePageLinks ? maxVisiblePageLinks : lastPageNum);
    const [tresholdPageNum, setTresholdPageNum] = useState(lastPageNum <= maxVisiblePageLinks ? null : calcTresholdPoint(1, maxVisiblePageLinks));
    
    const pageNumbers = [];

    for (let i = firstVisiblePageNum; i <= lastVisiblePageNum; i++) {
        pageNumbers.push(i);
    }

    function calcTresholdPoint(firstPageIndex, lastPageIndex) {
        if (firstPageIndex === 1) {
            return Math.ceil(maxVisiblePageLinks / 2);
        }
        return firstPageIndex + Math.ceil((lastPageIndex - firstPageIndex) / 2);
    }

    function setVisibleLinks(selectedLink) {
        if (selectedLink > tresholdPageNum) {
                const increment = selectedLink - tresholdPageNum;
                // if the lastVisiblePageNum would be bigger with the added increment than the last possible page link
                if (lastVisiblePageNum + increment > lastPageNum) {
                    const newFirstVisiblePageLink = lastPageNum - maxVisiblePageLinks
                    setFirstVisiblePageNum(newFirstVisiblePageLink);
                    setLastVisiblePageNum(lastPageNum);
                    setTresholdPageNum(calcTresholdPoint(newFirstVisiblePageLink, lastPageNum));
                } else {
                setFirstVisiblePageNum((prevFirstPageNum) => prevFirstPageNum + increment);
                setLastVisiblePageNum((prevLastPageNum) => prevLastPageNum + increment);
                setTresholdPageNum((prevTresholdPageNum) => prevTresholdPageNum + increment);
                } 
            }
            if (selectedLink < tresholdPageNum) {
                const firstTresholdPoint = calcTresholdPoint(1, maxVisiblePageLinks);
                // if the selected page index is below the first treshold point then set the indexes at the starting point
                if (selectedLink - firstTresholdPoint < 1) {
                    setFirstVisiblePageNum(1);
                    setLastVisiblePageNum(lastPageNum > maxVisiblePageLinks ? maxVisiblePageLinks : lastPageNum);
                    setTresholdPageNum(firstTresholdPoint);
                } else {
                const decrement = tresholdPageNum - selectedLink;
                setFirstVisiblePageNum((prevFirstPageNum) => prevFirstPageNum - decrement);
                setLastVisiblePageNum((prevLastPageNum) => prevLastPageNum - decrement);
                setTresholdPageNum((prevTresholdPageNum) => prevTresholdPageNum - decrement);
                }               
            }
    }

    const changePageHandler = (event, number) => {
        event.preventDefault();
        if (tresholdPageNum) {
            setVisibleLinks(number);
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
