import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Todos() {
  const username = "Kenneth";
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const getAllTodo = async () => {
    const res = await fetch("http://localhost:5050/todoGetAll", {
      method: "POST",
      body: JSON.stringify({username}),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.text();

    if (data === "You are not logged in") {
      window.confirm(data);
      navigate("/");
      return;
    } else {
      console.log(data + " raw data");

      const setContent = JSON.parse(data);
      console.log(setContent);

      return;
    }
  };
  getAllTodo();

  return (
    <div>
      <h2>Here are your todos:</h2>
      <div className="todo-wrapper">{content}</div>;
    </div>
  );
}

export default Todos;
