import {Link} from "react-router-dom";
import "./styles/NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-wrapper">
        <h2>Sorry</h2>
        <p>That page cannot be found</p>
        <Link to="/">Back to Login...</Link>
      </div>
    </div>
  );
};

export default NotFound;
