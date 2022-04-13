import Metatags from '../../components/Metatags.jsx'
import Matchups from '../../components/Matchups';
import AuthCheck from '../../components/AuthCheck.jsx';

export default function predict() {

    return (
        <main>
            <AuthCheck>
            <Metatags title="Playoff Overtime | Predict" description="Enter your NBA Playoff predictions." />
            <Matchups />
            </AuthCheck>        
        </main>

    )
}

