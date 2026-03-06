import { FormSVG } from "../SVG/index";
import styles from "./Donate.module.css";
const Donate = ({ setSupport, setDonate, setLoading, donateAmount }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.card}>
        <div className={styles.card2}>
          <form className={styles.form} onSubmit={donateAmount}>
            <p id="heading" className={styles.heading}>
              Support The Creator
            </p>
            <div className={styles.field}>
              <FormSVG styleClass={styles.input_icon} />
              <input
                type="number"
                placeholder="amount 0.025"
                className={styles.input_field}
                autoComplete={"off"}
                onChange={(e) => setSupport(e.target.value)}
              />
            </div>
            <div className={styles.btn}>
              <button
                type="button"
                className={styles.button1}
                onClick={() => setDonate(false)}
              >
                Close
              </button>
              <button
                type="button"
                className={styles.button2}
                onClick={() => setDonate(false)}
              >
                Sign Up
              </button>
            </div>
            <button
              type="button"
              className={styles.button3}
              onClick={() => {
                setLoading(true);
                donateAmount();
                setDonate(false);
              }}
            >
              Donate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Donate;
