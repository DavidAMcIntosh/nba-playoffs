import Link from 'next/link'
import { useAuth } from '../context/AuthUserContext';
import Image from 'next/image';


export default function Navbar() {
  const { authUser, loading, signOut } = useAuth();

    return (
      <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <Image src="/favicon.ico" alt="favicon" height="16px" width="16px" />
          <span className="ml-3 text-xl">Playoff Overtime</span>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link href="/">
          <a className="mr-5 hover:text-gray-900">Scoreboard</a>
          </Link>
          <Link href="/rules">
          <a className="mr-5 hover:text-gray-900">Info</a>
          </Link>
          {authUser && (
            <>
                        <Link href={`/${authUser.email}/predictions`}>
                    <a className="mr-5 hover:text-gray-900">Your Predictions</a>
                    </Link>
                    <Link href={`/${authUser.email}`}>
                    <a className="mr-5 hover:text-gray-900">Your Profile</a>
                    </Link>
            </>
          )}
        </nav>
        {authUser && (
          <>
        <button onClick={signOut} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Log Out
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
          </>
        )}
        {!authUser && (
          <>
                <Link href="/login">
        <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Login
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
        </Link>
          </>
        )}
  
      </div>
    </header>

    );
}
