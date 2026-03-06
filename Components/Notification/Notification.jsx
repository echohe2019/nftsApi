import styles from "./Notification.module.css";
import { useEffect } from "react";

const Notification = ({ setNotification, notification }) => {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, setNotification]);

  return (
    <div className={styles.alert} onClick={() => setNotification("")}>
      {notification}
    </div>
  );
};

export default Notification;
