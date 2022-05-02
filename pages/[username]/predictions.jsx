import Link from 'next/link'
import { useRouter } from 'next/router';
import { getUserWithUsername, dataToJSON, firestore } from '../../lib/firebase.js';
import Metatags from '../../components/Metatags.jsx'
import toast from 'react-hot-toast';
import AuthCheck from '../../components/AuthCheck.jsx';

export async function getServerSideProps({ query }) {

    try {
        const { username } = query;
        const userDoc = await getUserWithUsername(username);

        if (!userDoc) {
            return {
                notFound: true,
            };
        }

        let user = null;
        let predictions = null;
        let results = null

        if (userDoc) {
            user = userDoc.data();
            const predictionsQuery = userDoc.ref
                .collection('predictions');

            predictions = (await predictionsQuery.get()).docs.map(dataToJSON);
        }

        // GET THE ACTUAL PLAYOFF RESULTS

        const resultsQuery = firestore
            .collectionGroup('settings');

        results = (await resultsQuery.get()).docs.map(dataToJSON)[0];

        if (results) {
            console.log(JSON.stringify(results));
        }

        return {
            props: { user, predictions, results },
        };

    } catch (error) {
        console.log(error.message);
    }

}

export default function PredictionsPage({ user, predictions, results }) {

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
            <button disabled onClick={deletePrediction} className="flex mx-auto mt-16 text-white bg-gray-500 border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded text-lg">Delete</button>
        );
    }

    return (
        <main>
          { /* <AuthCheck> */ }  
                <Metatags title="Predictions | Playoff Overtime" description="View or edit your playoff predictions." />
                {predictions.length === 0 && (
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
                                <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">Predict the 2022 NBA Playoffs.</h1>
                                <Link href={`/${user.username}/predict`}>
                                    <button disabled className="flex-shrink-0 text-white bg-gray-500 border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded text-lg mt-10 sm:mt-0">Start</button>
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
                                <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">+20 points for correct team / +10 pts for correct games played</p>
                                <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto"><strong>Format: </strong> Your pick <strong>|</strong> Actual result</p>
                            </div>
                            <div className="flex flex-wrap -m-4">
                                <div className="p-4 lg:w-1/4 sm:w-1/2 w-full">
                                    <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                                        <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">ROUND 1</h1>
                                        <p className="flex items-center text-gray-600 mb-2">
                                            {predictions[0].oneEightWest} in {predictions[0].oneEightWestGames} <strong>&nbsp;|&nbsp; </strong> {results.oneEightWest} in {results.oneEightWestGames} {(predictions[0].oneEightWest === results.oneEightWest) ? "✔️" : "❌"} {(predictions[0].oneEightWestGames === results.oneEightWestGames) ? "✔️" : "❌"} ({(predictions[0].oneEightWest === results.oneEightWest && predictions[0].oneEightWestGames === results.oneEightWestGames) ? "+30" : (predictions[0].oneEightWest === results.oneEightWest) ? "+20" : (predictions[0].oneEightWestGames === results.oneEightWestGames) ? "+10pts" : "💩"})
                                        </p>
                                        <p className="flex items-center text-gray-600 mb-2">
                                            {predictions[0].twoSevenWest} in {predictions[0].twoSevenWestGames} <strong>&nbsp;|&nbsp; </strong> {results.twoSevenWest} in {results.twoSevenWestGames} {(predictions[0].twoSevenWest === results.twoSevenWest) ? "✔️" : "❌"} {(predictions[0].twoSevenWestGames === results.twoSevenWestGames) ? "✔️" : "❌"} ({(predictions[0].twoSevenWest === results.twoSevenWest && predictions[0].twoSevenWestGames === results.twoSevenWestGames) ? "+30" : (predictions[0].twoSevenWest === results.twoSevenWest) ? "+20" : (predictions[0].twoSevenWestGames === results.twoSevenWestGames) ? "+10pts" : "💩"})
                                        </p>
                                        <p className="flex items-center text-gray-600 mb-2">
                                            {predictions[0].threeSixWest} in {predictions[0].threeSixWestGames} <strong>&nbsp;|&nbsp; </strong> {results.threeSixWest} in {results.threeSixWestGames} {(predictions[0].threeSixWest === results.threeSixWest) ? "✔️" : "❌"} {(predictions[0].threeSixWestGames === results.threeSixWestGames) ? "✔️" : "❌"} ({(predictions[0].threeSixWest === results.threeSixWest && predictions[0].threeSixWestGames === results.threeSixWestGames) ? "+30" : (predictions[0].threeSixWest === results.threeSixWest) ? "+20" : (predictions[0].threeSixWestGames === results.threeSixWestGames) ? "+10pts" : "💩"})
                                        </p>
                                        <p className="flex items-center text-gray-600 mb-2">
                                            {predictions[0].fourFiveWest} in {predictions[0].fourFiveWestGames} <strong>&nbsp;|&nbsp; </strong> {results.fourFiveWest} in {results.fourFiveWestGames} {(predictions[0].fourFiveWest === results.fourFiveWest) ? "✔️" : "❌"} {(predictions[0].fourFiveWestGames === results.fourFiveWestGames) ? "✔️" : "❌"} ({(predictions[0].fourFiveWest === results.fourFiveWest && predictions[0].fourFiveWestGames === results.fourFiveWestGames) ? "+30" : (predictions[0].fourFiveWest === results.fourFiveWest) ? "+20" : (predictions[0].fourFiveWestGames === results.fourFiveWestGames) ? "+10pts" : "💩"})
                                        </p>
                                        <p className="flex items-center text-gray-600 mb-2">
                                            {predictions[0].oneEightEast} in {predictions[0].oneEightEastGames} <strong>&nbsp;|&nbsp; </strong> {results.oneEightEast} in {results.oneEightEastGames} {(predictions[0].oneEightEast === results.oneEightEast) ? "✔️" : "❌"} {(predictions[0].oneEightEastGames === results.oneEightEastGames) ? "✔️" : "❌"} ({(predictions[0].oneEightEast === results.oneEightEast && predictions[0].oneEightEastGames === results.oneEightEastGames) ? "+30" : (predictions[0].oneEightEast === results.oneEightEast) ? "+20" : (predictions[0].oneEightEastGames === results.oneEightEastGames) ? "+10pts" : "💩"})
                                        </p>
                                        <p className="flex items-center text-gray-600 mb-2">
                                            {predictions[0].twoSevenEast} in {predictions[0].twoSevenEastGames} <strong>&nbsp;|&nbsp; </strong> {results.twoSevenEast} in {results.twoSevenEastGames} {(predictions[0].twoSevenEast === results.twoSevenEast) ? "✔️" : "❌"} {(predictions[0].twoSevenEastGames === results.twoSevenEastGames) ? "✔️" : "❌"} ({(predictions[0].twoSevenEast === results.twoSevenEast && predictions[0].twoSevenEastGames === results.twoSevenEastGames) ? "+30" : (predictions[0].twoSevenEast === results.twoSevenEast) ? "+20" : (predictions[0].twoSevenEastGames === results.twoSevenEastGames) ? "+10pts" : "💩"})
                                        </p>
                                        <p className="flex items-center text-gray-600 mb-2">
                                            {predictions[0].threeSixEast} in {predictions[0].threeSixEastGames} <strong>&nbsp;|&nbsp; </strong> {results.threeSixEast} in {results.threeSixEastGames} {(predictions[0].threeSixEast === results.threeSixEast) ? "✔️" : "❌"} {(predictions[0].threeSixEastGames === results.threeSixEastGames) ? "✔️" : "❌"} ({(predictions[0].threeSixEast === results.threeSixEast && predictions[0].threeSixEastGames === results.threeSixEastGames) ? "+30" : (predictions[0].threeSixEast === results.threeSixEast) ? "+20" : (predictions[0].threeSixEastGames === results.threeSixEastGames) ? "+10pts" : "💩"})
                                        </p>
                                        <p className="flex items-center text-gray-600 mb-2">
                                            {predictions[0].fourFiveEast} in {predictions[0].fourFiveEastGames} <strong>&nbsp;|&nbsp; </strong> {results.fourFiveEast} in {results.fourFiveEastGames} {(predictions[0].fourFiveEast === results.fourFiveEast) ? "✔️" : "❌"} {(predictions[0].fourFiveEastGames === results.fourFiveEastGames) ? "✔️" : "❌"} ({(predictions[0].fourFiveEast === results.fourFiveEast && predictions[0].fourFiveEastGames === results.fourFiveEastGames) ? "+30" : (predictions[0].fourFiveEast === results.fourFiveEast) ? "+20" : (predictions[0].fourFiveEastGames === results.fourFiveEastGames) ? "+10pts" : "💩"})
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 lg:w-1/4 sm:w-1/2 w-full">
                                    <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                                        <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">SEMI-FINAL</h1>
                                        <p className="flex items-center text-gray-600 mb-2">
                                            {predictions[0].westSemis1} in {predictions[0].westSemis1Games} <strong>&nbsp;|&nbsp; </strong> {(results.westSemis1 === "") ? "TBD" : results.westSemis1} in {(results.westSemis1Games === "") ? "TBD" : results.westSemis1Games} {(results.westSemis1 === "") ? "" : (predictions[0].westSemis1 === results.westSemis1) ? "✔️" : "❌"} {(results.westSemis1Games === "") ? "" : (predictions[0].westSemis1Games === results.westSemis1Games) ? "✔️" : "❌"} ({(results.westSemis1 === "" && results.westSemis1Games === "") ? "❓" : (predictions[0].westSemis1 === results.westSemis1 && predictions[0].westSemis1Games === results.westSemis1Games) ? "+30" : (predictions[0].westSemis1 === results.westSemis1) ? "+20" : (predictions[0].westSemis1Games === results.westSemis1Games) ? "+10pts" : "💩"})
                                        </p>
                                        <p className="flex items-center text-gray-600 mb-2">
                                        {predictions[0].westSemis2} in {predictions[0].westSemis2Games} <strong>&nbsp;|&nbsp; </strong> {(results.westSemis2 === "") ? "TBD" : results.westSemis2} in {(results.westSemis2Games === "") ? "TBD" : results.westSemis2Games} {(results.westSemis2 === "") ? "" : (predictions[0].westSemis2 === results.westSemis2) ? "✔️" : "❌"} {(results.westSemis2Games === "") ? "" : (predictions[0].westSemis2Games === results.westSemis2Games) ? "✔️" : "❌"} ({(results.westSemis2 === "" && results.westSemis2Games === "") ? "❓" : (predictions[0].westSemis2 === results.westSemis2 && predictions[0].westSemis2Games === results.westSemis2Games) ? "+30" : (predictions[0].westSemis2 === results.westSemis2) ? "+20" : (predictions[0].westSemis2Games === results.westSemis2Games) ? "+10pts" : "💩"})
                                        </p>
                                        <p className="flex items-center text-gray-600 mb-2">
                                        {predictions[0].eastSemis1} in {predictions[0].eastSemis1Games} <strong>&nbsp;|&nbsp; </strong> {(results.eastSemis1 === "") ? "TBD" : results.eastSemis1} in {(results.eastSemis1Games === "") ? "TBD" : results.eastSemis1Games} {(results.eastSemis1 === "") ? "" : (predictions[0].eastSemis1 === results.eastSemis1) ? "✔️" : "❌"} {(results.eastSemis1Games === "") ? "" : (predictions[0].eastSemis1Games === results.eastSemis1Games) ? "✔️" : "❌"} ({(results.eastSemis1 === "" && results.eastSemis1Games === "") ? "❓" : (predictions[0].eastSemis1 === results.eastSemis1 && predictions[0].eastSemis1Games === results.eastSemis1Games) ? "+30" : (predictions[0].eastSemis1 === results.eastSemis1) ? "+20" : (predictions[0].eastSemis1Games === results.eastSemis1Games) ? "+10pts" : "💩"})
                                        </p>
                                        <p className="flex items-center text-gray-600 mb-2">
                                        {predictions[0].eastSemis2} in {predictions[0].eastSemis2Games} <strong>&nbsp;|&nbsp; </strong> {(results.eastSemis2 === "") ? "TBD" : results.eastSemis2} in {(results.eastSemis2Games === "") ? "TBD" : results.eastSemis2Games} {(results.eastSemis2 === "") ? "" : (predictions[0].eastSemis2 === results.eastSemis2) ? "✔️" : "❌"} {(results.eastSemis2Games === "") ? "" : (predictions[0].eastSemis2Games === results.eastSemis2Games) ? "✔️" : "❌"} ({(results.eastSemis2 === "" && results.eastSemis2Games === "") ? "❓" : (predictions[0].eastSemis2 === results.eastSemis2 && predictions[0].eastSemis2Games === results.eastSemis2Games) ? "+30" : (predictions[0].eastSemis2 === results.eastSemis2) ? "+20" : (predictions[0].eastSemis2Games === results.eastSemis2Games) ? "+10pts" : "💩"})
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 lg:w-1/4 sm:w-1/2 w-full">
                                    <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                                        <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">CONF. FINAL</h1>
                                        <p className="flex items-center text-gray-600 mb-2">
                                        {predictions[0].westFinals} in {predictions[0].westFinalsGames} <strong>&nbsp;|&nbsp; </strong> {(results.westFinals === "") ? "TBD" : results.westFinals} in {(results.westFinalsGames === "") ? "TBD" : results.westFinalsGames} {(results.westFinals === "") ? "" : (predictions[0].westFinals === results.westFinals) ? "✔️" : "❌"} {(results.westFinalsGames === "") ? "" : (predictions[0].westFinalsGames === results.westFinalsGames) ? "✔️" : "❌"} ({(results.westFinals === "" && results.westFinalsGames === "") ? "❓" : (predictions[0].westFinals === results.westFinals && predictions[0].westFinalsGames === results.westFinalsGames) ? "+30" : (predictions[0].westFinals === results.westFinals) ? "+20" : (predictions[0].westFinalsGames === results.westFinalsGames) ? "+10pts" : "💩"})
                                        </p>
                                        <p className="flex items-center text-gray-600 mb-2">
                                        {predictions[0].eastFinals} in {predictions[0].eastFinalsGames} <strong>&nbsp;|&nbsp; </strong> {(results.eastFinals === "") ? "TBD" : results.eastFinals} in {(results.eastFinalsGames === "") ? "TBD" : results.eastFinalsGames} {(results.eastFinals === "") ? "" : (predictions[0].eastFinals === results.eastFinals) ? "✔️" : "❌"} {(results.eastFinalsGames === "") ? "" : (predictions[0].eastFinalsGames === results.eastFinalsGames) ? "✔️" : "❌"} ({(results.eastFinals === "" && results.eastFinalsGames === "") ? "❓" : (predictions[0].eastFinals === results.eastFinals && predictions[0].eastFinalsGames === results.eastFinalsGames) ? "+30" : (predictions[0].eastFinals === results.eastFinals) ? "+20" : (predictions[0].eastFinalsGames === results.eastFinalsGames) ? "+10pts" : "💩"})
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 lg:w-1/4 sm:w-1/2 w-full">
                                    <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                                        <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">CHAMPION</h1>
                                        <p className="flex items-center text-gray-600 mb-2">
                                        {predictions[0].champion} in {predictions[0].championGames} <strong>&nbsp;|&nbsp; </strong> {(results.champion === "") ? "TBD" : results.champion} in {(results.championGames === "") ? "TBD" : results.championGames} {(results.champion === "") ? "" : (predictions[0].champion === results.champion) ? "✔️" : "❌"} {(results.championGames === "") ? "" : (predictions[0].championGames === results.championGames) ? "✔️" : "❌"} ({(results.champion === "" && results.championGames === "") ? "❓" : (predictions[0].champion === results.champion && predictions[0].championGames === results.championGames) ? "+30" : (predictions[0].champion === results.champion) ? "+20" : (predictions[0].championGames === results.championGames) ? "+10pts" : "💩"})
                                        </p>
                                    </div>
                                </div>
                            </div>
                         { /* <DeleteButton />  */ }  
                        </div>
                    </section>
                )}
          { /* </AuthCheck> */}  
        </main>
    );

}