import { Link } from "react-router-dom";

const Redirect = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Access Denied</h1>
      <p>You must be logged in to view this page.</p>
      <Link to="/login">
        Click here to log in
      </Link>
    </div>
  );
};

export default Redirect;
