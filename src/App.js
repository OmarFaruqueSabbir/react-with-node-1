
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users,setUsers] = useState([])
  useEffect(() =>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data));
  },[])

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name,email};

    // Post data to server
    fetch('http://localhost:5000/user',{
      method: 'POST' , // or 'PUT'
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data => {
      const newUsers = [...users,data];
      setUsers(newUsers);
      console.log('Success:', data);
    })

  }
  return (
    <div className="App">
      <h1>My Own data</h1>
      <h2>users: {users.length}</h2>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='name' required/>
        <input type="text" name='email' placeholder='email' required/>
        <input type="submit" value="AddUser" />
      </form>

      <ul>
      {
          users.map(user => <li key={user.id}>id: {user.id} name: {user.name} email: {user.email}</li>)
        }
      </ul>

    </div>
  );
}

export default App;
