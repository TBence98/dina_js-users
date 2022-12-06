import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const Error = () => {
    const error = useRouteError();
    return (
        <>
            <MainNavigation />
            <main>
                <h1>An Error Occured</h1>
                <p style={{ "text-align": "center" }}>{error.message}</p>
                <p style={{ "text-align": "center" }}>{error.status}</p>
            </main>
        </>
    );
};

export default Error;
