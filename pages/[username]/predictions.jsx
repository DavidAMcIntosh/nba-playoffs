import Link from 'next/link'
import { useRouter } from 'next/router';
import { getUserWithUsername, dataToJSON, firestore } from '../../lib/firebase.js';
import Metatags from '../../components/Metatags.jsx'
import toast from 'react-hot-toast';
import AuthCheck from '../../components/AuthCheck.jsx';

export async function getServerSideProps({ query }) {

    const { username } = query;
    const userDoc = await getUserWithUsername(username);

    if (!userDoc) {
        return {
            notFound: true,
        };
    }

    let user = null;
    let predictions = null;

    if (userDoc) {
        user = userDoc.data();
        const predictionsQuery = userDoc.ref
            .collection('predictions');

        predictions = (await predictionsQuery.get()).docs.map(dataToJSON);
    }

    return {
        props: { user, predictions },
    };
}

export default function PredictionsPage({ user, predictions }) {

    function DeleteButton() {
        const router = useRouter();
        const deletePrediction = async () => {
            try {
                const predictionRef = firestore.collection('users').doc(predictions[0].uid).collection('predictions').doc('prediction');
                await predictionRef.delete();
                toast.success('Deleted!')
            } catch (error) {
                toast.error(error.message)
            } finally {
                router.push('/')
            }
        };

        return (
            <button onClick={deletePrediction} className="flex mx-auto mt-16 text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">Delete</button>
        );
    }

    return (
        <main>
            <AuthCheck>
                <Metatags title="Predictions | Playoff Overtime" description="View or edit your playoff predictions." />
                {predictions.length === 0 && (
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
                                <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">Predict the 2022 NBA Playoffs.</h1>
                                <Link href={`/${user.username}/predict`}>
                                    <button className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0">Start</button>
                                </Link>
                            </div>
                        </div>
                    </section>
                )}
                {predictions.length > 0 && (
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="text-center mb-20">
                                <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">Your 2022 NBA Playoff Predictions</h1>
                                <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">If you need to edit predictions, delete it and start fresh (because the developer is tired).</p>
                            </div>
                            <div className="flex flex-wrap -m-4">
                                <div className="p-4 lg:w-1/4 sm:w-1/2 w-full">
                                    <h2 className="font-medium title-font tracking-widest text-gray-900 mb-4 text-sm text-center sm:text-left">ROUND 1 WINNERS</h2>
                                    <nav className="flex flex-col sm:items-start sm:text-left text-center items-center -mb-1 space-y-2.5">
                                        <a>
                                            <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>{predictions[0].oneEightWest} in {predictions[0].oneEightWestGames}
                                        </a>
                                        <a>
                                            <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>{predictions[0].twoSevenWest} in {predictions[0].twoSevenWestGames}
                                        </a>
                                        <a>
                                            <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>{predictions[0].threeSixWest} in {predictions[0].threeSixWestGames}
                                        </a>
                                        <a>
                                            <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>{predictions[0].fourFiveWest} in {predictions[0].fourFiveWestGames}
                                        </a>
                                        <a>
                                            <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>{predictions[0].oneEightEast} in {predictions[0].oneEightEastGames}
                                        </a>
                                        <a>
                                            <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>{predictions[0].twoSevenEast} in {predictions[0].twoSevenEastGames}
                                        </a>
                                        <a>
                                            <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>{predictions[0].threeSixEast} in {predictions[0].threeSixEastGames}
                                        </a>
                                        <a>
                                            <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>{predictions[0].fourFiveEast} in {predictions[0].fourFiveEastGames}
                                        </a>
                                    </nav>
                                </div>
                                <div className="p-4 lg:w-1/4 sm:w-1/2 w-full">
                                    <h2 className="font-medium title-font tracking-widest text-gray-900 mb-4 text-sm text-center sm:text-left">SEMI-FINAL WINNERS</h2>
                                    <nav className="flex flex-col sm:items-start sm:text-left text-center items-center -mb-1 space-y-2.5">
                                        <a>
                                            <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>{predictions[0].westSemis1} in {predictions[0].westSemis1Games}
                                        </a>
                                        <a>
                                            <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>{predictions[0].westSemis2} in {predictions[0].westSemis2Games}
                                        </a>
                                        <a>
                                            <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>{predictions[0].eastSemis1} in {predictions[0].eastSemis1Games}
                                        </a>
                                        <a>
                                            <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>{predictions[0].eastSemis2} in {predictions[0].eastSemis2Games}
                                        </a>
                                    </nav>
                                </div>
                                <div className="p-4 lg:w-1/4 sm:w-1/2 w-full">
                                    <h2 className="font-medium title-font tracking-widest text-gray-900 mb-4 text-sm text-center sm:text-left">CONFERENCE FINAL WINNERS</h2>
                                    <nav className="flex flex-col sm:items-start sm:text-left text-center items-center -mb-1 space-y-2.5">
                                        <a>
                                            <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>{predictions[0].westFinals} in {predictions[0].westFinalsGames}
                                        </a>
                                        <a>
                                            <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>{predictions[0].eastFinals} in {predictions[0].eastFinalsGames}
                                        </a>
                                    </nav>
                                </div>
                                <div className="p-4 lg:w-1/4 sm:w-1/2 w-full">
                                    <h2 className="font-medium title-font tracking-widest text-gray-900 mb-4 text-sm text-center sm:text-left">NBA CHAMPION</h2>
                                    <nav className="flex flex-col sm:items-start sm:text-left text-center items-center -mb-1 space-y-2.5">
                                        <a>
                                            <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                </svg>
                                            </span>{predictions[0].champion} in {predictions[0].championGames}
                                        </a>
                                    </nav>
                                </div>
                            </div>
                            <DeleteButton />
                        </div>
                    </section>
                )}
            </AuthCheck>
        </main>
    );

}