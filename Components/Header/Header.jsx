import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import { Login, Logo, SignUp } from "../index";
import Link from "next/link";

const Header = ({ notification, setNotification }) => {
  const menuList = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "API", link: "/nfts-api" },
  ];
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState();

  const openModel = (el) => {
    if (el == "Login") {
      setLogin(true);
      setSignup(false);
    } else if (el == "SignUp") {
      setSignup(true);
      setLogin(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("NFTApi token");
    setToken(token);
  }, []);

  const logout = () => {
    localStorage.removeItem("NFTApi token");
    window.location.reload();
  };

  return (
    <>
      <div className={styles.header}>
        <Logo />
        <div className={styles.menu}>
          {menuList.map((el, i) => (
            <Link href={el.link} key={i + 1} className={styles.link}>
              <p>{el.name}</p>
            </Link>
          ))}
          {token ? (
            <p onClick={() => logout()}>Logout</p>
          ) : (
            <>
              <p onClick={() => openModel("Login")}>Login</p>
              <p onClick={() => openModel("SignUp")}>Sign Up</p>
            </>
          )}
        </div>
      </div>
      {signup && (
        <div className={styles.form}>
          <div className={styles.form_inner}>
            <SignUp
              setLogin={setLogin}
              setSignup={setSignup}
              notification={notification}
              setNotification={setNotification}
            />
          </div>
        </div>
      )}

      {login && (
        <div className={styles.form}>
          <div className={styles.form_inner}>
            <Login
              setLogin={setLogin}
              setSignup={setSignup}
              notification={notification}
              setNotification={setNotification}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
