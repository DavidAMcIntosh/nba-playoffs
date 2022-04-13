import UsersList from '../components/UsersList.jsx'
import { useState } from 'react'
import { dataToJSON, firestore } from '../lib/firebase'
import Metatags from '../components/Metatags.jsx'

export async function getServerSideProps(context) {
  const usersQuery = firestore
    .collectionGroup('users')
    .orderBy('points', 'desc')

  const users = (await usersQuery.get()).docs.map(dataToJSON);

  return {
    props: { users },
  }

}

export default function Home(props) {
  const [users, setUsers] = useState(props.users);
  return (
    <main>
      <Metatags title="Scoreboard | Playoff Overtime" description="See the current scoreboard for NBA playoff predictions." />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Scoreboard</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">See where you stand among the league&apos;s greatest.</p>
          </div>
          <div className="flex flex-wrap -m-2">
            <UsersList users={users} />
          </div>
        </div>
      </section>
    </main>
  )
}
