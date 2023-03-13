import {Link} from "react-router-dom";

function NoPage() {
  return (
    <div className="NoPageFound">
      <h1>Here is nothing to be found</h1>
      <Link to="/">Go back to Login</Link>
    </div>
  );
}

export default NoPage;
