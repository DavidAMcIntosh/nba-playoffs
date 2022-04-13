import { useRouter } from "next/router";
import { useState } from 'react';
import { useAuth } from '../context/AuthUserContext';
import { firestore } from '../lib/firebase';
import Metatags from '../components/Metatags.jsx'
import toast from 'react-hot-toast';


export default function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [photo, setPhoto] = useState("");
    const router = useRouter();

    const [error, setError] = useState(null);

    const { createUserWithEmailAndPassword } = useAuth();

    const onSubmit = async (event) => {
        event.preventDefault();
        setError(null)
        try {
            let authUser = await createUserWithEmailAndPassword(email, password);
            const userDoc = firestore.doc(`users/${authUser.user.uid}`);
            const batch = firestore.batch();
            console.log('photoURL: ' + photo)
            batch.set(userDoc, { photoURL: photo, nickname: nickname, username: email, points: 0 });
            await batch.commit();
            toast.success('Successfully signed up!')
        } catch (error) {
            toast.error(error.message)
            setError(error.message);
        } finally {
            router.push(`/${email}/predictions`);
        }
    };

    return (
        <>
            <Metatags title="Playoff Overtime | Sign Up" description="Sign up to join the fun." />
            <section className="text-gray-600 body-font">
                <form className="container px-5 py-24 mx-auto flex flex-wrap items-center" onSubmit={onSubmit}>
                    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                        <h1 className="title-font font-medium text-3xl text-gray-900">Join The Roster</h1>
                        <p className="leading-relaxed mt-4">Create an account in the best NBA playoff prediction app ever (maybe).</p>
                        <p class="mt-2 text-sm text-gray-500">Click on an image to set your profile pic.</p>
                        <br />
                        <div class="flex flex-wrap w-1/2">
                            <div class="md:p-2 p-1 w-1/6">
                                <input onChange={(e) => setPhoto(e.target.value)} name="photoURL" value="/celtics.png" type="radio" />
                                <img alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/celtics.png" />
                            </div>
                            <div class="md:p-2 p-1 w-1/6">
                                <input onChange={(e) => setPhoto(e.target.value)} name="photoURL" value="/jazz.png" type="radio" />
                                <img alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" value="/jazz.png" src="/jazz.png" />
                            </div>
                            <div class="md:p-2 p-1 w-1/6">
                                <input onChange={(e) => setPhoto(e.target.value)} name="photoURL" value="/grizzlies.png" type="radio" />
                                <img alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/grizzlies.png" />
                            </div>
                            <div class="md:p-2 p-1 w-1/6">
                                <input onChange={(e) => setPhoto(e.target.value)} name="photoURL" value="/spurs.png" type="radio" />
                                <img alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/spurs.png" />
                            </div>
                            <div class="md:p-2 p-1 w-1/6">
                                <input onChange={(e) => setPhoto(e.target.value)} name="photoURL" value="/heat.png" type="radio" />
                                <img alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/heat.png" />
                            </div>
                            <div class="md:p-2 p-1 w-1/6">
                                <input onChange={(e) => setPhoto(e.target.value)} name="photoURL" value="/bulls.png" type="radio" />
                                <img alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/bulls.png" />
                            </div>
                            <div class="md:p-2 p-1 w-1/6">
                                <input onChange={(e) => setPhoto(e.target.value)} name="photoURL" value="/bucks.png" type="radio" />
                                <img alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/bucks.png" />
                            </div>
                            <div class="md:p-2 p-1 w-1/6">
                                <input onChange={(e) => setPhoto(e.target.value)} name="photoURL" value="/suns.png" type="radio" />
                                <img alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/suns.png" />
                            </div>
                            <div class="md:p-2 p-1 w-1/6">
                                <input onChange={(e) => setPhoto(e.target.value)} name="photoURL" value="/wolves.png" type="radio" />
                                <img alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/wolves.png" />
                            </div>
                            <div class="md:p-2 p-1 w-1/6">
                                <input onChange={(e) => setPhoto(e.target.value)} name="photoURL" value="/hawks.png" type="radio" />
                                <img alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/hawks.png" />
                            </div>
                            <div class="md:p-2 p-1 w-1/6">
                                <input onChange={(e) => setPhoto(e.target.value)} name="photoURL" value="/nets.png" type="radio" />
                                <img alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/nets.png" />
                            </div>
                            <div class="md:p-2 p-1 w-1/6">
                                <input onChange={(e) => setPhoto(e.target.value)} name="photoURL" value="/76ers.png" type="radio" />
                                <img alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/76ers.png" />
                            </div>
                            <div class="md:p-2 p-1 w-1/6">
                                <input onChange={(e) => setPhoto(e.target.value)} name="photoURL" value="/raptors.png" type="radio" />
                                <img alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/raptors.png" />
                            </div>
                            <div class="md:p-2 p-1 w-1/6">
                                <input onChange={(e) => setPhoto(e.target.value)} name="photoURL" value="/hornets.png" type="radio" />
                                <img alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/hornets.png" />
                            </div>
                            <div class="md:p-2 p-1 w-1/6">
                                <input onChange={(e) => setPhoto(e.target.value)} name="photoURL" value="/pelicans.png" type="radio" />
                                <img alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/pelicans.png" />
                            </div>
                            <div class="md:p-2 p-1 w-1/6">
                                <input onChange={(e) => setPhoto(e.target.value)} name="photoURL" value="/warriors.png" type="radio" />
                                <img alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/warriors.png" />
                            </div>
                            <div class="md:p-2 p-1 w-1/6">
                                <input onChange={(e) => setPhoto(e.target.value)} name="photoURL" value="/cavs.png" type="radio" />
                                <img alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/cavs.png" />
                            </div>
                            <div class="md:p-2 p-1 w-1/6">
                                <input onChange={(e) => setPhoto(e.target.value)} name="photoURL" value="/mavs.png" type="radio" />
                                <img alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/mavs.png" />
                            </div>

                        </div>
                    </div>
                    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                            <input onChange={(event) => setEmail(event.target.value)} type="text" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="username" className="leading-7 text-sm text-gray-600">Nickname</label>
                            <input onChange={(event) => setNickname(event.target.value)} type="text" id="nickname" name="nickname" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                            <input onChange={(event) => setPassword(event.target.value)} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Join</button>
                        <p className="text-xs text-gray-500 mt-3">Literally, just click the button.</p>
                    </div>
                </form>
            </section>
        </>

    )
}
