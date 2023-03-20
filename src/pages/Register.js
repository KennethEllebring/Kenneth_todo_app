import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "./styles/Register.scss";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/userReg", {
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.text();
    if (data === "Added new user") {
      toast.success(data);
      navigate("/");
      return;
    } else {
      toast.error(data);
    }
  };

  return (
    <div className="register">
      <div className="register-wrapper">
        <h2>Register</h2>
        <form>
          <label>Username</label>
          <input type="text" minLength={3} value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password</label>
          <input type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleSubmit}>Register</button>
        </form>
        <p>Back to Login?</p>
        <Link to="/">Click here</Link>
      </div>
    </div>
  );
}

export default Register;
