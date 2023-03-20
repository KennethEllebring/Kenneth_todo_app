import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import "./css/Home.scss";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const loadTodo = async () => {
    const response = await axios.get("http://localhost:5000/todo/get", {withCredentials: true}).catch(function (error) {
      if (error.response) toast.error(error.response.data);
      navigate("/");
      return;
    });
    if (response.data === "You don't have any ToDos") {
      toast.error("You don't have any ToDos");
      setTimeout(() => navigate("/Home"), 1000);
      return;
    } else {
      setTodos(response.data);
      return;
    }
  };

  useEffect(() => {
    loadTodo();
  }, []);

  const deleteTodo = (id) => {
    if (window.confirm("Are you sure you are done with this and want to delete?")) {
      axios.delete(`http://localhost:5000/todo/delete/${id}`, {withCredentials: true});
      toast.success("Todo removed succefully");
      setTimeout(() => loadTodo(), 1000);
    }
  };

  return (
    <div className="todo">
      <div className="todo-wrapper">
        <h2>Your TodoList</h2>
        <p>Click "Edit" to edit your todo or "Delete" if you are done with it or don't need it anymore</p>
        <table>
          <thead>
            <tr>
              <th>ToDo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.todo}</td>
                  <td>
                    <Link to={`/update/${item.id}`}>
                      <button>Edit</button>
                    </Link>
                    <button onClick={() => deleteTodo(item.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="button-row">
          <Link to={"/addEditTodo"}>
            <button>Add Todo</button>
          </Link>
          <Link to={"/friends"}>
            <button>Friend List</button>
          </Link>
          <Link to={"/userList"}>
            <button>Add Friend</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
