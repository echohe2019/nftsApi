import { FormSVG, Lock } from "../SVG/index";
import styles from "./Form.module.css";
import { CheckBox } from "../index";
const Form = ({
  setFile,
  setDisplay,
  handleFormFieldChange,
  handleSubmit,
  setCategory,
}) => {
  const categories = ["Nature", "Article", "Animal"];

  return (
    <div className={styles.card}>
      <div className={styles.card2}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <p id="heading" className={styles.heading}>
            Upload Image Details
          </p>
          <div className={styles.field}>
            <FormSVG styleClass={styles.input_icon} />
            <input
              type="text"
              className={styles.input_field}
              placeholder="title"
              autoComplete="off"
              onChange={(e) => handleFormFieldChange("title", e)}
            />
          </div>
          <div className={styles.field}>
            <Lock styleClass={styles.input_icon} />
            <textarea
              className={`${styles.textarea} ${styles.input_field}`}
              placeholder="description"
              onChange={(e) => handleFormFieldChange("description", e)}
            />
          </div>
          <div className={styles.field}>
            <FormSVG styleClass={styles.input_icon} />
            <input
              type="email"
              className={styles.input_field}
              placeholder="email"
              onChange={(e) => handleFormFieldChange("email", e)}
            />
          </div>
          <p className={styles.second}>Category</p>
          <div className={styles.category}>
            {categories.map((category, index) => (
              <CheckBox
                setCategory={setCategory}
                category={category}
                key={index + 1}
              />
            ))}
          </div>
          <div className={styles.btn}>
            <button
              type="button"
              className={styles.button1}
              onClick={() => (setFile(null), setDisplay(null))}
            >
              Close
            </button>
            <button type="button" className={styles.button2}>
              Sign Up
            </button>
          </div>
          <button type="submit" className={styles.button3}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
