import { FormSVG, Lock } from "../SVG/index";
import styles from "./SignUp.module.css";
import { useState } from "react";
import axios from "axios";
import { Notification } from "../index";

const SignUp = ({ setLogin, setSignup, notification, setNotification }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    passwordConfirm: "",
  });
  const handleFormFieldChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };
  const createAccount = async (e) => {
    e.preventDefault();
    if (
      user.email == "" ||
      user.password == "" ||
      user.name == "" ||
      user.passwordConfirm == ""
    ) {
      return setNotification("Please provide all the detail!");
    }
    setNotification("Wait creating account...");

    console.log("userData", user);

    try {
      const response = await axios({
        method: "POST",
        url: "/api/v1/user/signup",
        withCredentials: true,
        data: {
          email: user.email,
          password: user.password,
          name: user.name,
          passwordConfirm: user.passwordConfirm,
        },
      });
      if (response.data.status === "success") {
        console.log("response", response);
        setNotification("Account is successfully created!");
        localStorage.setItem(
          "NFTApi Token",
          JSON.stringify(response.data.token),
        );
        setSignup(false);
        setNotification("");
        window.location.reload()
      } else {
        setNotification("Something went wrong! try again later");
      }
    } catch (error) {
      console.log(error);
      setNotification(error.message);
    }
  };
  return (
    <>
      <div className={styles.card}>
        <div className={styles.card2}>
          <form className={styles.form} onSubmit={createAccount}>
            <p id="heading" className={styles.heading}>
              SignUp
            </p>
            <div className={styles.field}>
              <FormSVG styleClass={styles.input_icon} />
              <input
                type="text"
                className={styles.input_field}
                placeholder="name"
                autoComplete="off"
                onChange={(e) => handleFormFieldChange("name", e)}
              />
            </div>
            <div className={styles.field}>
              <FormSVG styleClass={styles.input_icon} />
              <input
                type="text"
                className={styles.input_field}
                placeholder="email"
                autoComplete="off"
                onChange={(e) => handleFormFieldChange("email", e)}
              />
            </div>
            <div className={styles.field}>
              <Lock styleClass={styles.input_icon} />
              <input
                type="text"
                className={styles.input_field}
                placeholder="password"
                autoComplete="off"
                onChange={(e) => handleFormFieldChange("password", e)}
              />
            </div>
            <div className={styles.field}>
              <Lock styleClass={styles.input_icon} />
              <input
                type="text"
                className={styles.input_field}
                placeholder="passwordConfirm"
                autoComplete="off"
                onChange={(e) => handleFormFieldChange("passwordConfirm", e)}
              />
            </div>

            <div className={styles.btn}>
              <button
                type="button"
                className={styles.button1}
                onClick={() => (setLogin(true), setSignup(false))}
              >
                Login
              </button>
              <button
                type="button"
                className={styles.button2}
                onClick={() => setSignup(false)}
              >
                Close
              </button>
            </div>
            <button type="submit" className={styles.button3}>
              SignUp
            </button>
          </form>
        </div>
      </div>
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
    </>
  );
};

export default SignUp;
