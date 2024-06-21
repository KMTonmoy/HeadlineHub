import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Detail = () => {
    const article = useLoaderData(); // Get the article data from the loader

    // Display article details
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Article Detail</h1>

            <h2 className="text-xl font-bold">{article?.title}</h2>
            <p className="text-gray-700">{article?.source.name}</p>
            <p className="text-gray-700">{article?.content}</p>
            <p className="text-gray-700">{article?.description}</p>
            <p className="text-gray-500">Author: {article?.author}</p>
            <p className="text-gray-500">Published At: {article?.publishedAt}</p>
            <p className="text-gray-500">Source: {article?.source?.name}</p>
            <a href={article?.url} className="block mt-2 text-blue-600 hover:underline">Read more</a>
        </div>
    );
};

export default Detail;
