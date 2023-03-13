import {useState} from "react";
import {Link} from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);

    const response = await fetch("http://localhost:5050/userReg", {
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.text();
    console.log(data);
  };

  return (
    <div className="Login">
      <div className="Login-wrapper">
        <h2>Register</h2>
        <form>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleSubmit}>Register</button>
          <p>Back to Login?</p>
          <Link to="/">Click here</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
