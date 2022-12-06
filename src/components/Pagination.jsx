import classes from "./Pagination.module.css";

const Pagination = ({ totalUsers, usersPerPage, changePage, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    const changePageHandler = (event, number) => {
        event.preventDefault();
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
