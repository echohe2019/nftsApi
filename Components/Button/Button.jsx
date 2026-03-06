import styles from "./Button.module.css";
const Button = ({disconnect,connect,address,file}) => {
  return (
      <>
          {address?(
              <button onClick={()=>disconnect()} className={styles.button}>
                  <span className={styles.button_content}>
                      {""}
                      {file?"Upload":"Disconnect"}{""}
                  </span>
              </button>
          ):(
              <button onClick={()=>connect()} className={styles.button}>
                  <span className={styles.button_content}>Connect</span>
              </button>
          )}
      </>
  )
};

export default Button;
