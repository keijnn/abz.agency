
// @ts-ignore
export function Users({ users }: []) {

  return (
    <div>
      {users.length > 0 && users.map((user: any) => {
        return (
          <div key={user.id}>
            <p>{user.id}</p>
            <img src={`data:image/jpeg;base64,${user.image}`} alt="Image" />
            <h1>{user.name}</h1>
          </div>
        )
      })}
    </div>
  )
}