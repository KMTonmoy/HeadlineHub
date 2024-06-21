import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import Favorites from "../Components/Favorites/Favorites";
import Contact from "../Pages/ContactUs/Contact";
import About from "../Pages/About/About";
import Detail from "../Pages/Detaild/Detail"; 
import axios from 'axios';

const apiKey = "776efa5f5c1749008a9e182fbfd09d0d";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/fav",
                element: <Favorites />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/article/:url",
                element: <Detail />,
                loader: async ({ params }) => {
                    const { url } = params;
                    try {
                        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
                            params: {
                                country: 'in',
                                apiKey: apiKey,
                                q: decodeURIComponent(url),
                            }
                        });
                        const articles = response.data.articles;
                        if (articles.length > 0) {
                            return articles[0];
                        } else {
                            throw new Error('Article not found');
                        }
                    } catch (error) {
                        console.error('Error fetching article:', error);
                        throw error;
                    }
                }
            },
        ]
    },
]);