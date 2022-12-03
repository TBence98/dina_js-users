const Pagination = ({ totalUsers, usersPerPage, changePage }) => {
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
            <ul>
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <a
                            href=""
                            onClick={(e) => changePageHandler(e, number)}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
