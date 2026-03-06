import styles from "./CheckBox.module.css";
const CheckBox = ({category,setCategory}) => {
  return (
      <label className={styles.material_checkbox} onClick={()=>setCategory(category)}>
          <input type="checkbox"/>
          <span className={styles.checkmark}></span>
          {category}
      </label>
  )
};

export default CheckBox;
