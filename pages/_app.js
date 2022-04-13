import '../styles/globals.css'
import Navbar from '../components/Navbar.jsx'
import { AuthUserProvider } from '../context/AuthUserContext';
import { Toaster } from 'react-hot-toast'


function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider><Navbar />
      <Component {...pageProps} />
      <Toaster />
      </AuthUserProvider>
  )
}

export default MyApp
