import './App.css'
import { TwitterFollowCard } from './components/TwitterFollowCard'

const users = [
  {
    userName: 'objectDude',
    name: 'ThisDUUUUDE',
    isFollowing: true
  },
  {
    userName: 'idkName',
    name: 'Manito',
    isFollowing: false
  },

  {
    userName: 'qp41n',
    name: 'Qart',
    isFollowing: true
  }
]

function App() {

  return (
    <section className="App">
      {
        users.map(({ userName, name, isFollowing }) => (
          <TwitterFollowCard
          key={userName}
          userName={userName}
          initialIsFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCard>

        ))
      }

    </section>
  )
}
export default App
