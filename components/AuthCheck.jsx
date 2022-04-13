import Link from 'next/link';
import { useContext } from 'react';
import { useAuth } from '../context/AuthUserContext.jsx';

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { authUser } = useAuth();

  return authUser ? props.children : props.fallback ||
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <h2 className="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5">6th Personal/EJECTED - You need to login.</h2>
        <div className="md:w-3/5 md:pl-6">
          <iframe src="https://giphy.com/embed/sOn8kaYsvEwYGNZFrS"
            width="480"
            height="270"
            frameBorder="0"
            allowFullScreen>
          </iframe>
          <div className="flex md:mt-4 mt-6">
            <Link href="/login">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded">Login </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
}