import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import Favorites from "../Components/Favorites/Favorites";
import Contact from "../Pages/ContactUs/Contact";
import About from "../Pages/About/About";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/Fav",
                element: <Favorites/>,
            },
            {
                path: "/Contact",
                element: <Contact/>,
            },
            {
                path: "/About",
                element: <About/>,
            },
        ]
    },
]);