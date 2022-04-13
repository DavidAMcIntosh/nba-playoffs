import { useState } from 'react';
import { firestore } from '../lib/firebase';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import toast from 'react-hot-toast';
export default function Matchups () {
    const router = useRouter();
    const { authUser, loading } = useAuth();

    // Listen for changes on loading and authUser, redirect if needed

    const [oneEightWest, setOneEightWest] = useState("");
    const [oneEightEast, setOneEightEast] = useState("");
    const [twoSevenWest, setTwoSevenWest] = useState("");
    const [twoSevenEast, setTwoSevenEast] = useState("");
    const [threeSixWest, setThreeSixWest] = useState("");
    const [threeSixEast, setThreeSixEast] = useState("");
    const [fourFiveWest, setFourFiveWest] = useState("");
    const [fourFiveEast, setFourFiveEast] = useState("");
    const [eastSemis1, setEastSemis1] = useState("");
    const [eastSemis2, setEastSemis2] = useState("");
    const [westSemis1, setWestSemis1] = useState("");
    const [westSemis2, setWestSemis2] = useState("");
    const [westFinals, setWestFinals] = useState("");
    const [eastFinals, setEastFinals] = useState("");
    const [champion, setChampion] = useState("");
    const [oneEightWestGames, setOneEightWestGames] = useState(0);
    const [oneEightEastGames, setOneEightEastGames] = useState(0);
    const [threeSixWestGames, setThreeSixWestGames] = useState(0);
    const [twoSevenWestGames, setTwoSevenWestGames] = useState(0);
    const [twoSevenEastGames, setTwoSevenEastGames] = useState(0);
    const [threeSixEastGames, setThreeSixEastGames] = useState(0);
    const [fourFiveWestGames, setFourFiveWestGames] = useState(0);
    const [fourFiveEastGames, setFourFiveEastGames] = useState(0);
    const [eastSemis1Games, setEastSemis1Games] = useState(0);
    const [eastSemis2Games, setEastSemis2Games] = useState(0);
    const [westSemis1Games, setWestSemis1Games] = useState(0);
    const [westSemis2Games, setWestSemis2Games] = useState(0);
    const [westFinalsGames, setWestFinalsGames] = useState(0);
    const [eastFinalsGames, setEastFinalsGames] = useState(0);
    const [championGames, setChampionGames] = useState(0);

    const savePredictions = async (e) => {
        e.preventDefault();
        try {
            const uid = authUser.uid;
            const ref = firestore.collection('users').doc(uid).collection('predictions').doc('prediction');

            const data = {
                oneEightWest,
                oneEightEast,
                threeSixWest,
                twoSevenWest,
                twoSevenEast,
                threeSixEast,
                fourFiveWest,
                fourFiveEast,
                eastSemis1,
                eastSemis2,
                westSemis1,
                westSemis2,
                westFinals,
                eastFinals,
                champion,
                oneEightWestGames,
                oneEightEastGames,
                threeSixWestGames,
                twoSevenWestGames,
                twoSevenEastGames,
                threeSixEastGames,
                fourFiveWestGames,
                fourFiveEastGames,
                eastSemis1Games,
                eastSemis2Games,
                westSemis1Games,
                westSemis2Games,
                westFinalsGames,
                eastFinalsGames,
                championGames,
                uid
            };

            await ref.set(data);
            toast.success('Successfully Saved!')
            router.push(`/${authUser.email}/predictions`)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
                <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">WESTERN CONFERENCE</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Round 1</p>
            </div>
            <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Team A</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Set as Winner</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Team B</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Set As Winner</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Games</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-3">PHX</td>
                            <td className="w-10">
                                <input onChange={(e) => setOneEightWest(e.target.value)} name="1-8WEST" value="PHX" type="radio" />
                            </td>
                            <td className="px-4 py-3">TBD</td>
                            <td className="w-10">
                                <input onChange={(e) => setOneEightWest(e.target.value)} name="1-8WEST" value="TBD" type="radio" />
                            </td>
                            <td className="w-10">
                                <input onChange={(e) => setOneEightWestGames(e.target.value)} type="number" min="4" max="7" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3">MEM</td>
                            <td className="w-10">
                                <input onChange={(e) => setTwoSevenWest(e.target.value)} name="2-7WEST" value="MEM" type="radio" />
                            </td>
                            <td className="px-4 py-3">MIN</td>
                            <td className="w-10">
                                <input onChange={(e) => setTwoSevenWest(e.target.value)} name="2-7WEST" value="MIN" type="radio" />
                            </td>
                            <td className="w-10">
                                <input onChange={(e) => setTwoSevenWestGames(e.target.value)} type="number" min="4" max="7" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3">GSW</td>
                            <td className="w-10">
                                <input onChange={(e) => setThreeSixWest(e.target.value)} name="3-6WEST" value="GSW" type="radio" />
                            </td>
                            <td className="px-4 py-3">DEN</td>
                            <td className="w-10">
                                <input onChange={(e) => setThreeSixWest(e.target.value)} name="3-6WEST" value="DEN" type="radio" />
                            </td>
                            <td className="w-10">
                                <input onChange={(e) => setThreeSixWestGames(e.target.value)} type="number" min="4" max="7" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3">DAL</td>
                            <td className="w-10">
                                <input onChange={(e) => setFourFiveWest(e.target.value)} name="4-5WEST" value="DAL" type="radio" />
                            </td>
                            <td className="px-4 py-3">UTA</td>
                            <td className="w-10">
                                <input onChange={(e) => setFourFiveWest(e.target.value)} name="4-5WEST" value="UTA" type="radio" />
                            </td>
                            <td className="w-10">
                                <input onChange={(e) => setFourFiveWestGames(e.target.value)} type="number" min="4" max="7" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <div className="flex flex-col text-center w-full mb-20">
                <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">EASTERN CONFERENCE</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Round 1</p>
            </div>
            <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Team A</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Set as Winner</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Team B</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Set As Winner</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Games</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-3">MIA</td>
                            <td className="w-10">
                                <input onChange={(e) => setOneEightEast(e.target.value)} name="1-8EAST" value="MIA" type="radio" />
                            </td>
                            <td className="px-4 py-3">TBD</td>
                            <td className="w-10">
                                <input onChange={(e) => setOneEightEast(e.target.value)} name="1-8EAST" value="TBD" type="radio" />
                            </td>
                            <td className="w-10">
                                <input onChange={(e) => setOneEightEastGames(e.target.value)} type="number" min="4" max="7" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3">BOS</td>
                            <td className="w-10">
                                <input onChange={(e) => setTwoSevenEast(e.target.value)} name="2-7EAST" value="BOS" type="radio" />
                            </td>
                            <td className="px-4 py-3">BKN</td>
                            <td className="w-10">
                                <input onChange={(e) => setTwoSevenEast(e.target.value)} name="2-7EAST" value="BKN" type="radio" />
                            </td>
                            <td className="w-10">
                                <input onChange={(e) => setTwoSevenEastGames(e.target.value)} type="number" min="4" max="7" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3">MIL</td>
                            <td className="w-10">
                                <input onChange={(e) => setThreeSixEast(e.target.value)} name="3-6EAST" value="MIL" type="radio" />
                            </td>
                            <td className="px-4 py-3">CHI</td>
                            <td className="w-10">
                                <input onChange={(e) => setThreeSixEast(e.target.value)} name="3-6EAST" value="CHI" type="radio" />
                            </td>
                            <td className="w-10">
                                <input onChange={(e) => setThreeSixEastGames(e.target.value)} type="number" min="4" max="7" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3">PHI</td>
                            <td className="w-10">
                                <input onChange={(e) => setFourFiveEast(e.target.value)} name="4-5EAST" value="PHI" type="radio" />
                            </td>
                            <td className="px-4 py-3">TOR</td>
                            <td className="w-10">
                                <input onChange={(e) => setFourFiveEast(e.target.value)} name="4-5EAST" value="TOR" type="radio" />
                            </td>
                            <td className="w-10">
                                <input onChange={(e) => setFourFiveEastGames(e.target.value)} type="number" min="4" max="7" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <div className="flex flex-col text-center w-full mb-20">
                <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">WESTERN CONFERENCE</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">SEMI-FINALS</p>
            </div>
            <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Team A</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Set as Winner</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Team B</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Set As Winner</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Games</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-3">{oneEightWest}</td>
                            <td className="w-10">
                                <input onChange={(e) => setWestSemis1(e.target.value)} name="westSemis1" value={oneEightWest} type="radio" />
                            </td>
                            <td className="px-4 py-3">{fourFiveWest}</td>
                            <td className="w-10">
                                <input onChange={(e) => setWestSemis1(e.target.value)} name="westSemis1" value={fourFiveWest} type="radio" />
                            </td>
                            <td className="w-10">
                                <input onChange={(e) => setWestSemis1Games(e.target.value)} type="number" min="4" max="7" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3">{twoSevenWest}</td>
                            <td className="w-10">
                                <input onChange={(e) => setWestSemis2(e.target.value)} name="westSemis2" value={twoSevenWest} type="radio" />
                            </td>
                            <td className="px-4 py-3">{threeSixWest}</td>
                            <td className="w-10">
                                <input onChange={(e) => setWestSemis2(e.target.value)} name="westSemis2" value={threeSixWest} type="radio" />
                            </td>
                            <td className="w-10">
                                <input onChange={(e) => setWestSemis2Games(e.target.value)} type="number" min="4" max="7" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <div className="flex flex-col text-center w-full mb-20">
                <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">EASTERN CONFERENCE</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">SEMI-FINALS</p>
            </div>
            <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Team A</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Set as Winner</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Team B</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Set As Winner</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Games</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-3">{oneEightEast}</td>
                            <td className="w-10">
                                <input onChange={(e) => setEastSemis1(e.target.value)} name="eastSemis1" value={oneEightEast} type="radio" />
                            </td>
                            <td className="px-4 py-3">{fourFiveEast}</td>
                            <td className="w-10">
                                <input onChange={(e) => setEastSemis1(e.target.value)} name="eastSemis1" value={fourFiveEast} type="radio" />
                            </td>
                            <td className="w-10">
                                <input onChange={(e) => setEastSemis1Games(e.target.value)} type="number" min="4" max="7" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3">{twoSevenEast}</td>
                            <td className="w-10">
                                <input onChange={(e) => setEastSemis2(e.target.value)} name="eastSemis2" value={twoSevenEast} type="radio" />
                            </td>
                            <td className="px-4 py-3">{threeSixEast}</td>
                            <td className="w-10">
                                <input onChange={(e) => setEastSemis2(e.target.value)} name="eastSemis2" value={threeSixEast} type="radio" />
                            </td>
                            <td className="w-10">
                                <input onChange={(e) => setEastSemis2Games(e.target.value)} type="number" min="4" max="7" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <div className="flex flex-col text-center w-full mb-20">
                <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">WESTERN CONFERENCE</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">FINALS</p>
            </div>
            <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Team A</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Set as Winner</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Team B</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Set As Winner</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Games</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-3">{westSemis1}</td>
                            <td className="w-10">
                                <input onChange={(e) => setWestFinals(e.target.value)} name="westFinals" value={westSemis1} type="radio" />
                            </td>
                            <td className="px-4 py-3">{westSemis2}</td>
                            <td className="w-10">
                                <input onChange={(e) => setWestFinals(e.target.value)} name="westFinals" value={westSemis2} type="radio" />
                            </td>
                            <td className="w-10">
                                <input onChange={(e) => setWestFinalsGames(e.target.value)} type="number" min="4" max="7" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <div className="flex flex-col text-center w-full mb-20">
                <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">EASTERN CONFERENCE</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">FINALS</p>
            </div>
            <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Team A</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Set as Winner</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Team B</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Set As Winner</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Games</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-3">{eastSemis1}</td>
                            <td className="w-10">
                                <input onChange={(e) => setEastFinals(e.target.value)} name="eastFinals" value={eastSemis1} type="radio" />
                            </td>
                            <td className="px-4 py-3">{eastSemis2}</td>
                            <td className="w-10">
                                <input onChange={(e) => setEastFinals(e.target.value)} name="eastFinals" value={eastSemis2} type="radio" />
                            </td>
                            <td className="w-10">
                                <input onChange={(e) => setEastFinalsGames(e.target.value)} type="number" min="4" max="7" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <div className="flex flex-col text-center w-full mb-20">
                <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">2022 NBA</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">FINALS</p>
            </div>
            <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Team A</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Set as Winner</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Team B</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Set As Winner</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Games</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-3">{westFinals}</td>
                            <td className="w-10">
                                <input onChange={(e) => setChampion(e.target.value)} name="champion" value={westFinals} type="radio" />
                            </td>
                            <td className="px-4 py-3">{eastFinals}</td>
                            <td className="w-10">
                                <input onChange={(e) => setChampion(e.target.value)} name="champion" value={eastFinals} type="radio" />
                            </td>
                            <td className="w-10">
                                <input onChange={(e) => setChampionGames(e.target.value)} type="number" min="4" max="7" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
                <button onClick={savePredictions} className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Save</button>
            </div>
        </div>
    </section>
    )
}