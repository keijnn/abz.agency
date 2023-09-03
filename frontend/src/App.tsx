import { Users } from "./users";
import { useEffect, useState } from "react";
import { CreateNewUser } from "./new-user";

export function App() {

  const [users, setUsers] = useState([])
  const [page, setPage] = useState('/users?page=1&count=5')
  const [count, setCount] = useState(0)

  useEffect(() => {
    (async function() {
      if (page !== null) {
        const url = `http://localhost:3001${page}`
        const res = await fetch(url)

        if (!res.ok) throw res

        const data = await res.json()

        setPage(data.next_link)
        setUsers(prev => {
          return prev.concat(data.users)})
      }
    }())
  }, [count])
  console.log(users)
  return (
    <div style={{display: 'flex'}}>
      <div>
        <Users users={users} />
        <button onClick={() => setCount(prev => prev + 1)}>New Users</button>
      </div>
    <CreateNewUser />
    </div>
  )
}