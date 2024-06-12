import { Link } from "react-router-dom";
import ArgentBankLogo from "../assets/img/argentBankLogo.png";

import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../features/userInfos/userSlice";
import { useState } from "react";

export default function Profile() {
  const dispatch = useDispatch();
  const { firstName, lastName } = useSelector((store) => store.user);

  const [name, setName] = useState({ firstName: "", lastName: "" });
  console.log(name);
  return (
    <>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={ArgentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i>
            Tony
          </Link>
          <Link className="main-nav-item" to="/">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {firstName} {lastName}
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="update-info">
          <div>
            <label htmlFor="firstName">Nom</label>
            <input
              type="text"
              id="firstName"
              onChange={(e) =>
                setName((prevName) => ({
                  ...prevName,
                  firstName: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="lastName">Prenom</label>
            <input
              type="text"
              id="lastName"
              onChange={(e) =>
                setName((prevName) => ({
                  ...prevName,
                  lastName: e.target.value,
                }))
              }
            />
          </div>
          <button
            onClick={() => {
              dispatch(updateUser({firstName: name.firstName, lastName:name.lastName}));
            }}
          >
            Update info
          </button>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}
