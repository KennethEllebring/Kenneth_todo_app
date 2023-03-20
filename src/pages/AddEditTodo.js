import {useState, useEffect} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import "./css/AddEditTodo.scss";

const initialState = {todo: ""};

const AddEditTodo = () => {
  const [state, setState] = useState(initialState);
  const {todo} = state;
  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/todo/get/${id}`, {withCredentials: true}).then((resp) => setState({...resp.data[0]}));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) {
      toast.error("You need to provide a text");
    } else {
      if (!id) {
        axios
          .post(
            "http://localhost:5000/todo/post",
            {
              todo,
            },
            {withCredentials: true}
          )
          .then(() => {
            setState({todo: ""});
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Todo added to list");
        setTimeout(() => navigate("/home"), 1000);
      } else {
        axios
          .patch(
            `http://localhost:5000/todo/patch/${id}`,
            {
              todo,
            },
            {withCredentials: true}
          )
          .then(() => {
            setState({todo: ""});
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Todo updated Successfully");
        setTimeout(() => navigate("/home"), 1000);
      }
    }
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
  };
  return (
    <div className="add-edit">
      <div className="add-edit-wrapper">
        {id ? <h2>Edit Todo</h2> : <h2>Add Todo</h2>}
        {id ? <p>Edit your Todo and click "Update"</p> : <p>Write your Todo and click "Save"</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="todo">Your todo:</label>
          <br />
          <input type="text" id="todo" name="todo" placeholder="todo..." value={todo || ""} onChange={handleInputChange} />
          <input type="submit" value={id ? "Update" : "Save"} />
        </form>
        <div className="button-row">
          <Link to="/Home">
            <button value="Go Back">Go back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddEditTodo;
