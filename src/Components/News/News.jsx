import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const News = () => {
    const apiKey = "3a43473d64a34dd2bac5ed87476119f7";
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 9;
    const [totalPages, setTotalPages] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('general');
    const [availableCategories, setAvailableCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://newsapi.org/v2/top-headlines', {
                    params: {
                        country: 'in',
                        apiKey: apiKey,
                        category: selectedCategory,
                        q: searchTerm,
                        pageSize: articlesPerPage,
                        page: currentPage,
                    }
                });
                setArticles(response.data.articles);
                const totalResults = response.data.totalResults;
                setTotalPages(Math.ceil(totalResults / articlesPerPage));
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchNews();
    }, [currentPage, selectedCategory, searchTerm]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/top-headlines/sources', {
                    params: {
                        apiKey: apiKey,
                    }
                });
                const categories = response.data.sources.map(source => source.category);
                const uniqueCategories = [...new Set(categories)];
                setAvailableCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setSearchTerm(searchQuery);
        setCurrentPage(1);
    };

    const handleFavoriteToggle = (article) => {
        const isFavorite = favorites.some(fav => fav.url === article.url);
        if (isFavorite) {
            setFavorites(favorites.filter(fav => fav.url !== article.url));
        } else {
            setFavorites([...favorites, article]);
        }
    };

    const truncateDescription = (description, maxLength) => {
        if (!description) {
            return ''; // Return an empty string if description is null or undefined
        }
        if (description.length <= maxLength) {
            return description;
        }
        return description.substring(0, maxLength) + '...';
    };


 
    console.log(articles)


    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Latest News</h1>
            <div className="flex justify-center mb-8">
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="capitalize bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
                >
                    {availableCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
                <form onSubmit={handleSearchSubmit} className="flex">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search articles..."
                        className="bg-blue-100 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:bg-white focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Search
                    </button>
                </form>
            </div>
            {loading ? (
                <p className="text-center text-gray-700">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {articles.map((article, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            {!article.urlToImage ? (
                                <img className='w-full' src="https://bitsofco.de/img/Qo5mfYDE5v-350.png" alt="" />
                            ) : (
                                <img src={article.urlToImage} className='w-full' alt="" />
                            )}
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-bold">{article.title}</h2>
                                    <button onClick={() => handleFavoriteToggle(article)}>
                                        {favorites.some(fav => fav.url === article.url) ? (
                                            <FaHeart className="text-red-500" />
                                        ) : (
                                            <FaRegHeart className="text-gray-500" />
                                        )}
                                    </button>
                                </div>
                                <p className="text-gray-700">
                                    {truncateDescription(article.description, 80)}
                                </p>
                                <Link
                                    to={`/article/${encodeURIComponent(article.title)}`}
                                    className="block mt-2 text-blue-600 hover:underline"
                                >
                                    Read more
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {!loading && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <FaChevronLeft />
                    </button>
                    <div className="flex">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-1 ${currentPage === index + 1 ? 'bg-blue-600' : ''}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 ml-2 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <FaChevronRight />
                    </button>
                </div>
            )}
        </div>
    );
};

export default News;
