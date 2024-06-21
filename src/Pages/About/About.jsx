import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <motion.div 
            className="container mx-auto px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.h1 
                className="text-3xl font-bold text-center mb-8"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                About Us
            </motion.h1>

            <motion.section 
                className="mb-8"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-semibold mb-4">Our Company</h2>
                <p className="text-gray-700">
                    Welcome to our company! We are dedicated to providing the best service to our customers. Our team is passionate about what we do and strive to exceed expectations.
                </p>
            </motion.section>

            <motion.section 
                className="mb-8"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-700">
                    Our mission is to deliver high-quality products and services that bring value to our customers. We believe in innovation, integrity, and excellence in all our endeavors.
                </p>
            </motion.section>

            <motion.section 
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { name: 'John Doe', role: 'CEO', img: 'https://via.placeholder.com/150' },
                        { name: 'Jane Smith', role: 'CTO', img: 'https://via.placeholder.com/150' },
                        { name: 'Emily Johnson', role: 'COO', img: 'https://via.placeholder.com/150' }
                    ].map((member, index) => (
                        <motion.div 
                            key={index} 
                            className="bg-white rounded-lg shadow-lg p-4"
                            whileHover={{ scale: 1.05 }}
                        >
                            <img className="w-full rounded-t-lg" src={member.img} alt="Team Member" />
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                                <p className="text-gray-700">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section 
                className="mb-8"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                <ul className="list-disc list-inside text-gray-700">
                    <li>Customer Satisfaction: Our top priority is our customers' happiness.</li>
                    <li>Innovation: We are always looking for new ways to improve and innovate.</li>
                    <li>Integrity: We operate with honesty and integrity in everything we do.</li>
                    <li>Excellence: We strive for excellence in all our products and services.</li>
                </ul>
            </motion.section>
        </motion.div>
    );
};

export default About;
