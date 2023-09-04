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
        const url = process.env.REACT_APP_URL + page
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }})

        if (!res.ok) throw res

        const data = await res.json()

        setPage(data.next_link)
        setUsers(prev => {
          return prev.concat(data.users)})
      }
    }())
  }, [count])

  return (
    <div style={{display: 'flex'}}>
      <div>
        { /* @ts-ignore */ }
        <Users users={users} />
        <button onClick={() => setCount(prev => prev + 1)}>New Users</button>
      </div>
    <CreateNewUser />
    </div>
  )
}