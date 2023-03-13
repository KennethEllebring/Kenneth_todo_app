import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);

    const response = await fetch("http://localhost:5050/userLogin", {
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.text();
    console.log(data);
    if (data === "You are logged in, here is a cookie") {
      navigate("/todos");
      return;
    } else {
      window.confirm(data);
    }
  };

  return (
    <div className="Login">
      <div className="Login-wrapper">
        <h2>Login</h2>
        <form>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleSubmit}>Login</button>
        </form>
        <p>No account?</p>
        <Link to="/register">Register new account</Link>
      </div>
    </div>
  );
}

export default Login;
