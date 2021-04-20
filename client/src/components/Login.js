import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMsg, setLoginErrorMsg] = useState("");

  let history = useHistory();

  function handleLoginSuccess(username) {
    history.push({
      pathname: "/"
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    let payload = {
      username: username,
      password: password
    }

    fetch("/api/v1/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (res.status === 200) {
          res.json()
            .then(data => handleLoginSuccess(data.user.user.username))
        } else if (res.status === 401) {
          res.json()
            .then(data => setLoginErrorMsg(data.msg))
        } else {
          res.json()
            .then(data => setLoginErrorMsg(data.msg))
        }
      })
      .catch(err => console.log(err));

    setUsername("");
    setPassword("");
  }


  return (
    <div>
      <h1>Recipe App Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={ e => setUsername(e.target.value)}></input>
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>{loginErrorMsg}</p>
    </div>
  )

}

export default Login;
