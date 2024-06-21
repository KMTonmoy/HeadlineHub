import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [privacyChecked, setPrivacyChecked] = useState(false);
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

    const { signIn, createUser, user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();


    console.log(user)


    const openLoginModal = () => setLoginOpen(true);
    const closeLoginModal = () => setLoginOpen(false);

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            closeLoginModal();
            toast.success('Login successful');
        } catch (err) {
            toast.error(err.message);
        }
    };

    const openSignupModal = () => setSignupOpen(true);
    const closeSignupModal = () => {
        setSignupOpen(false);
        setFullName('');
        setEmail('');
        setPassword('');
        setGender('');
        setPrivacyChecked(false);
        setShowPrivacyPolicy(false);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUser(email, password);
            closeSignupModal();
            toast.success('Signup successful');
        } catch (err) {
            toast.error(err.message);
        }
    };
    const logout = async (e) => {
        logOut()
        toast.success('Logout successful');
    };

    const handlePrivacyChange = (e) => {
        setPrivacyChecked(e.target.checked);
    };

    const togglePrivacyPolicy = () => {
        setShowPrivacyPolicy(!showPrivacyPolicy);
    };



    return (
        <>
            <ToastContainer></ToastContainer>
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="shadow-md bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white"
            >
                <div className="navbar px-4 py-2">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost lg:hidden text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </motion.div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-purple-700 rounded-box w-52 text-white">
                                <li><NavLink to={'/'}>Home</NavLink></li>
                                <li><NavLink to={'/Fav'}>My Favorites</NavLink></li>
                                <li><NavLink to={'/Contact'}>Contact Us</NavLink></li>
                                <li><NavLink to={'/About'}>About</NavLink></li>
                            </ul>
                        </div>
                        <motion.a
                            href="/"
                            className="text-2xl font-bold text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            HeadlineHub
                        </motion.a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 text-white">
                            <li><NavLink to={'/'}>Home</NavLink></li>
                            <li><NavLink to={'/Fav'}>My Favorites</NavLink></li>
                            <li><NavLink to={'/Contact'}>Contact Us</NavLink></li>
                            <li><NavLink to={'/About'}>About</NavLink></li>
                        </ul>
                    </div>
                    {user ? (
                        <div className="navbar-end">

                            <button
                                className="ml-4 btn btn-outline text-white border-white hover:bg-white hover:text-purple-700"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="navbar-end">
                            <button
                                className="ml-4 btn btn-outline text-white border-white hover:bg-white hover:text-purple-700"
                                onClick={openLoginModal}
                            >
                                Login
                            </button>
                            <button
                                className="ml-4 btn btn-outline text-white border-white hover:bg-white hover:text-purple-700"
                                onClick={openSignupModal}
                            >
                                Signup
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Login Modal */}
            {loginOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                        className="bg-white p-6 rounded-lg shadow-md"
                    >
                        <h2 className="text-2xl font-bold mb-4">Login to HeadlineHub</h2>
                        <form onSubmit={handleSignIn}>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                                >
                                    Login
                                </button>
                                <button
                                    type="button"
                                    onClick={closeLoginModal}
                                    className="ml-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Signup Modal */}
            {signupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                        className="bg-white p-6 rounded-lg shadow-md"
                    >
                        <h2 className="text-2xl font-bold mb-4">Signup for HeadlineHub</h2>
                        <form onSubmit={handleSignup}>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Select Gender:</label>
                                <div className="mt-1">
                                    <div>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio text-purple-600 focus:ring-purple-500"
                                                name="gender"
                                                value="male"
                                                checked={gender === 'male'}
                                                onChange={(e) => setGender(e.target.value)}
                                            />
                                            <span className="ml-2 text-gray-900">Male</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio text-purple-600 focus:ring-purple-500"
                                                name="gender"
                                                value="female"
                                                checked={gender === 'female'}
                                                onChange={(e) => setGender(e.target.value)}
                                            />

                                            <span className="ml-2 text-gray-900">Female</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio text-purple-600 focus:ring-purple-500"
                                                name="gender"
                                                value="other"
                                                checked={gender === 'other'}
                                                onChange={(e) => setGender(e.target.value)}
                                            />
                                            <span className="ml-2 text-gray-900">Other</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox text-purple-600 focus:ring-purple-500"
                                        checked={privacyChecked}
                                        onChange={handlePrivacyChange}
                                    />
                                    <span className="ml-2 text-gray-900">
                                        I agree to the privacy policy and terms.
                                    </span>
                                </label>
                                <button
                                    type="button"
                                    className="ml-2 text-blue-600 hover:underline"
                                    onClick={togglePrivacyPolicy}
                                >
                                    Read Policy
                                </button>
                                {showPrivacyPolicy && (
                                    <div className="mt-2 p-4 bg-gray-100 border border-gray-300 rounded">
                                        <h3 className="text-lg font-semibold">Privacy Policy and Terms</h3>
                                        <p className="mt-2 text-sm text-gray-600">
                                            By signing up, you agree to our privacy policy and terms of service. We collect personal information to provide and improve our services. We do not share your personal information with third parties without your consent, except to comply with legal obligations. You must not use our services for any illegal or unauthorized purpose. Violations may result in suspension
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                                    disabled={!privacyChecked}
                                >
                                    Signup
                                </button>
                                <button
                                    type="button"
                                    onClick={closeSignupModal}
                                    className="ml-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}



        </>
    );
};

export default Navbar;
