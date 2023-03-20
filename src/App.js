import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import UserList from "./pages/UserList.js";
import AddEditTodo from "./pages/AddEditTodo";
import FriendTodo from "./pages/FriendTodo";
import NotFound from "./pages/Notfound";
import "./pages/styles/App.scss";

function App() {
  return (
    <BrowserRouter>
      <h1>Kenneth TodoApp</h1>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/friend/:id" element={<FriendTodo />} />
          <Route path="/userList" element={<UserList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addEditTodo" element={<AddEditTodo />} />
          <Route path="/update/:id" element={<AddEditTodo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
