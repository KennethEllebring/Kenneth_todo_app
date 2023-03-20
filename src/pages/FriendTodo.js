import {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import "./css/Home.scss";

const FriendTodo = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();

  const loadTodo = async () => {
    const response = await axios.get(`http://localhost:5000/friend/${id}`, {withCredentials: true}).catch(function (error) {
      if (error.response) toast.error(error.response.data);
      navigate("/friends");
      return;
    });
    if (response.data === "Friend don't have any ToDos") {
      toast.error(response.data);
      navigate("/friends");
      return;
    } else {
      setTodos(response.data);
      return;
    }
  };

  useEffect(() => {
    loadTodo();
  }, []);

  return (
    <div className="todo">
      <div className="todo-wrapper">
        <h2>Friends Todolist</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ToDo</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.username}</td>
                  <td>{item.todo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="button-row">
          <Link to={"/friends"}>
            <button>Back to Friendlist</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FriendTodo;
