import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import "./styles/Friends.scss";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  const loadFriends = async () => {
    const response = await axios.get("http://localhost:5000/friends/get", {withCredentials: true}).catch(function (error) {
      if (error.response) toast.error(error.response.data);
      navigate("/");
      return;
    });
    if (response.data === "You don't have any Friends") {
      toast.error("You don't have any Friends");
      navigate("/userList");
      return;
    } else {
      setFriends(response.data);
      return;
    }
  };
  useEffect(() => {
    loadFriends();
  }, []);

  const removeFriend = (id) => {
    if (window.confirm("Are you sure you want to remove this friend?")) {
      axios.delete(`http://localhost:5000/friend/delete/${id}`, {withCredentials: true});
      toast.success("Removed friend from your friendlist");
      setTimeout(() => loadFriends(), 1000);
    }
  };

  return (
    <div className="friend">
      <div className="friend-wrapper">
        <h2>Friend List</h2>
        <p>This is your friends right now, click "Todo" to see their Todolist, or "Remove Friend" to remove friend</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {friends.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.friendname}</td>
                  <td>
                    <Link to={`/friend/${item.friendname}`}>
                      <button>todo</button>
                    </Link>
                    <button onClick={() => removeFriend(item.id)}>Remove Friend</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="button-row">
          <Link to={"/userList"}>
            <button>Add Friend</button>
          </Link>
          <Link to={"/home"}>
            <button>Back to home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Friends;
