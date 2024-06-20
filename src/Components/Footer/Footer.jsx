import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-gray-100 py-2"
        >
            <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Section 1: HeadlineHub */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-center md:text-left"
                >
                    <h6 className="text-xl font-bold mb-4">HeadlineHub</h6>
                    <p className="text-sm leading-relaxed">
                        Your go-to source for the latest news, articles, and insights from around the world. Stay informed, stay connected.
                    </p>
                </motion.div>

             
                <motion.nav
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <h6 className="text-xl font-bold mb-4">Services</h6>
                    <ul className="space-y-2">
                        <li><a href="#" className="link link-hover transition-colors duration-300 hover:text-white">Branding</a></li>
                        <li><a href="#" className="link link-hover transition-colors duration-300 hover:text-white">Design</a></li>
                        <li><a href="#" className="link link-hover transition-colors duration-300 hover:text-white">Marketing</a></li>
                        <li><a href="#" className="link link-hover transition-colors duration-300 hover:text-white">Advertisement</a></li>
                    </ul>
                </motion.nav>

                {/* Section 3: Company */}
                <motion.nav
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                >
                    <h6 className="text-xl font-bold mb-4">Company</h6>
                    <ul className="space-y-2">
                        <li><a href="#" className="link link-hover transition-colors duration-300 hover:text-white">About us</a></li>
                        <li><a href="#" className="link link-hover transition-colors duration-300 hover:text-white">Contact</a></li>
                        <li><a href="#" className="link link-hover transition-colors duration-300 hover:text-white">Jobs</a></li>
                        <li><a href="#" className="link link-hover transition-colors duration-300 hover:text-white">Press kit</a></li>
                    </ul>
                </motion.nav>

                {/* Section 4: Legal */}
                <motion.nav
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.9 }}
                >
                    <h6 className="text-xl font-bold mb-4">Legal</h6>
                    <ul className="space-y-2">
                        <li><a href="#" className="link link-hover transition-colors duration-300 hover:text-white">Terms of use</a></li>
                        <li><a href="#" className="link link-hover transition-colors duration-300 hover:text-white">Privacy policy</a></li>
                        <li><a href="#" className="link link-hover transition-colors duration-300 hover:text-white">Cookie policy</a></li>
                    </ul>
                </motion.nav>
            </div>
            <p className="text-sm text-center mt-8">&copy; {new Date().getFullYear()} HeadlineHub. All rights reserved.</p>
        </motion.footer>
    );
};

export default Footer;
