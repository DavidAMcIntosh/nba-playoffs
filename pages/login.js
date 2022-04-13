import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '../context/AuthUserContext';
import Metatags from '../components/Metatags.jsx'
import toast from 'react-hot-toast';

export default function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();
    const { signInWithEmailAndPassword } = useAuth();

    const onSubmit = event => {
        setError(null)
        signInWithEmailAndPassword(email, password)
            .then(authUser => {
                toast.success(`You're logged in!`)
                router.push(`/${email}/predictions`);
            })
            .catch(error => {
                setError(error.message)
                toast.error(error.message);
            });
        event.preventDefault();
    };

    return (
        <>
            <Metatags title="login | Playoff Overtime" description="login to play ball!" />
            <section className="text-gray-600 body-font">
                <form className="container px-5 py-24 mx-auto" onSubmit={onSubmit}>
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Check Into The Game</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Use your email/password to login.</p>
                    </div>
                    <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                        <div className="relative flex-grow w-full">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                            <input onChange={(event) => setEmail(event.target.value)} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative flex-grow w-full">
                            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                            <input onChange={(event) => setPassword(event.target.value)} type="password" id="password" name="password" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">login</button>
                    </div>
                    <br />
                    <div div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                        <div className="relative flex-grow w-full">
                            <label htmlFor="signup" className="leading-7 text-sm text-gray-600">Not on a roster?</label>&nbsp;
                            <Link href="/signup">

                                <a className="text-indigo-500 inline-flex items-center mt-4">Sign Up
                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </Link>
                        </div>
                    </div>
                </form>
            </section>
        </>

    )
}