import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://newsapi.org/v2/top-headlines', {
                    params: {
                        country: 'in',
                        apiKey: apiKey,
                        category: selectedCategory,
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
    }, [currentPage, selectedCategory]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/top-headlines/sources', {
                    params: {
                        apiKey: apiKey,
                    }
                });
                const categories = response.data.sources.map(source => source.category);
                const uniqueCategories = [...new Set(categories)]; // Get unique categories
                setAvailableCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

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

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-8">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Latest News</h1>
            <div className="flex justify-center mb-8">
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className=" capitalize bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                    {availableCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {article.urlToImage && (
                            <img src={article.urlToImage} alt={article.title} className="w-full h-40 object-cover" />
                        )}
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                            <p className="text-gray-700">{article.description}</p>
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mt-2 text-blue-600 hover:underline"
                            >
                                Read more
                            </a>
                        </div>
                    </div>
                ))}
            </div>
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
        </div>
    );
};

export default News;
