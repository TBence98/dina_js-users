import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate,
} from "react-router-dom";
import { loader as usersLoader } from "./components/UsersList";
import { action as newUserAction } from "./pages/NewUser";
import { action as editUserAction } from "./pages/EditUser";

import Users from "./pages/Users";
import RootLayout from "./pages/rootLayout";
import NewUser from "./pages/NewUser";
import EditUser from "./pages/EditUser";
import Error from "./pages/Error";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />} errorElement={<Error />}>
            <Route index element={<Navigate replace to="/users" />} />
            <Route path="/users" element={<Users />} loader={usersLoader} />
            <Route
                path="/users/:id"
                element={<EditUser />}
                action={editUserAction}
            />
            <Route
                path="/users/new"
                element={<NewUser />}
                action={newUserAction}
            />
            <Route path="/*" element={<h2>Page not found!</h2>} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
