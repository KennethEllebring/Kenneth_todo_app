import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import "./css/UserList.scss";

const UserList = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const loadUser = async () => {
    const response = await axios.get("http://localhost:5000/userList/get", {withCredentials: true}).catch(function (error) {
      if (error.response) toast.error(error.response.data);
      navigate("/");
      return;
    });
    if (response.data === "You don't have any Friends") {
      navigate("/userList");
      return;
    } else {
      setUser(response.data);
      return;
    }
  };
  useEffect(() => {
    loadUser();
  }, []);

  const addFriend = (friendName) => {
    if (window.confirm("Do you wanna add this person to your friendlist?")) {
      const response = axios
        .post(
          `http://localhost:5000/friend/add`,
          {
            friendName,
          },
          {withCredentials: true}
        )
        .then(function () {
          if (response) {
            toast.success("Friend added Successfully");
            navigate("/friends");
            setTimeout(() => loadUser(), 1000);
            return;
          }
        })
        .catch(function (error) {
          if (error.response.data === "You are not logged in") {
            toast.error(error.response.data);
            navigate("/");
            return;
          } else {
            toast.error(error.response.data);
            navigate("/userlist");
            return;
          }
        });
    }
  };

  return (
    <div className="userlist">
      <div className="userlist-wrapper">
        <h2>All Users</h2>
        <p>Click "Add friend" to add friend to your friend list.</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {user.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.username}</td>
                  <td>
                    <button onClick={() => addFriend(item.username)}>Add Friend</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="button-row">
          <Link to={"/home"}>
            <button>Back to home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserList;
