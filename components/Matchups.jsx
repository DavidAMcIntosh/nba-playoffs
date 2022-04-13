export default function Matchups({ matchups }) {
    return matchups ? matchups.map((matchup) => <MatchupItem matchup={matchup} />) : null;
}

function MatchupItem({ matchup }) {
    return (
        <tr>
            <td className="px-4 py-3">{matchup.teamA}</td>
            <td className="w-10">
                <input name={`${matchup.teamA}-${matchup.teamB}`} value={matchup.teamA} type="radio" />
            </td>
            <td className="px-4 py-3">{matchup.teamB}</td>
            <td className="w-10">
                <input name={matchup.inputName} value={matchup.teamB} type="radio" />
            </td>
            <td className="w-10">
                <input className="bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" name="plan" type="number" min="4" max="7" />
            </td>
        </tr>
    )
}