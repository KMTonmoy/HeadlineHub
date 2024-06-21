import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Favorite Articles</h1>
            {favorites.length === 0 ? (
                <div className="text-center text-xl">No favorite articles yet.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favorites.map((article, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            {!article.urlToImage ? (
                                <img className='w-full' src="https://bitsofco.de/img/Qo5mfYDE5v-350.png" alt="" />
                            ) : (
                                <img src={article.urlToImage} className='w-full' alt="" />
                            )}
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-bold">{article.title}</h2>
                                    <FaHeart className="text-red-500 text-4xl" />
                                </div>
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
            )}
        </div>
    );
};

export default Favorites;
