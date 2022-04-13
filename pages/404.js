import Link from 'next/link';
import Metatags from '../components/Metatags.jsx'

export default function Custom404() {
    return (
        <>
            <Metatags title="404 |Playoff Overtime" description="Page does not exist." />
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap">
                    <h2 className="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5">Technical Foul - 404 / Page doesn&apos;t exist.</h2>
                    <div className="md:w-3/5 md:pl-6">
                        <iframe src="https://giphy.com/embed/3ohfFm8e0JRnh4hdwQ"
                            width="480"
                            height="270"
                            frameBorder="0"
                            allowFullScreen>
                        </iframe>
                        <div className="flex md:mt-4 mt-6">
                            <Link href="/">
                                <button className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded">Check Scoreboard</button>
                            </Link>
                        </div>
                    </div> 
                </div>
            </section>
        </>
    );
}