import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

const Detail = () => {
    const article = useLoaderData();  

    const fadeIn = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { duration: 500 }
    });

    const fadeInImage = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 }
    });

    return (
        <animated.div style={fadeIn} className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Article Detail</h1>
            <animated.div style={fadeInImage} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {!article.urlToImage ? (
                    <img className='w-full' src="https://bitsofco.de/img/Qo5mfYDE5v-350.png" alt="" />
                ) : (
                    <img src={article.urlToImage} className='w-full' alt="" />
                )}
                <div className="p-4">
                    <h2 className="text-xl font-bold">{article?.title}</h2>
                    <p className="text-gray-700">{article?.content}</p>
                    <p className="text-gray-700">{article?.description}</p>
                    <p className="text-gray-500">Author: {article?.author}</p>
                    <p className="text-gray-500">Published At: {new Date(article?.publishedAt).toLocaleString()}</p>
                    <p className="text-gray-500">Source: {article?.source?.name}</p>
                    <a href={article?.url} className="block mt-2 text-blue-600 hover:underline">Read more</a>
                </div>
            </animated.div>
        </animated.div>
    );
};

export default Detail;
