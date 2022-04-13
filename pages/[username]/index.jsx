import { useRouter } from 'next/router';
import { getUserWithUsername } from '../../lib/firebase';
import Image from 'next/image'
import Metatags from '../../components/Metatags.jsx'
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

    if (userDoc) {
        user = userDoc.data();
    }
    return {
        props: { user }, // will be passed to the page component as props
    };
}

export default function UserProfilePage({ user }) {

    return (
        <main>
            <AuthCheck>
                <Metatags title="Profile | Playoff Overtime" description="Your profile page" />
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto flex flex-col">
                        <div className="lg:w-4/6 mx-auto">
                            <div className="flex flex-col sm:flex-row mt-10">
                                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                                    <div className="w-20 h-20 rounded-full inline-flex items-center justify-center">
                                        <Image width="80px" height="80px" alt="gallery" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={user.photoURL} />
                                    </div>
                                    <div className="flex flex-col items-center text-center justify-center">
                                        <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{user.nickname}</h2>
                                        <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                                        <p className="text-base"><strong>Email:</strong> {user.username} | <strong>Points:</strong> {user.points} </p>
                                    </div>
                                </div>
                                <div className="sm:w-1/2 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                                    <Image width="960px" height="540px" alt="content" className="object-cover object-center h-full w-full" src="/featured.jpeg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </AuthCheck>
        </main>
    )
}