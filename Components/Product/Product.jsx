import styles from "./Product.module.css";
import Image from "next/image";
import { saveAs } from "file-saver";

import BTNStyle from "../Button/Button.module.css";
import client from "../Image/client/index";
import { Donate } from "../index";
import { useState } from "react";

const Product = ({
  setNotification,
  setSupport,
  donateAmount,
  setLoading,
  image,
}) => {
  const handleClick = () => {
    let url = `${image?.imageURL}`;
    saveAs(url, `${image?.title}`);
  };
  const [donate, setDonate] = useState(false);
  return (
    <div className={styles.Product}>
      <div className={styles.image}>
        <img src={image?.imageURL} alt="img" className={styles.image_img} />
      </div>
      <div className={styles.detail}>
        <div className={styles.detail_box}>
          <h1>{image?.title}</h1>
          <p>{image?.description}</p>
          <p className={styles.info}>
            <span>Category:{image?.category}</span>
            {""}
            {""}
            <span>Image ID: #{image?.imageId}</span>
            {""}
            {""}
            <span>
              CreatedAt:{new Date(image?.createdAt * 1000).toDateString()}
            </span>
          </p>
          <p className={styles.info}>
            <span>
              Donation:{""}
              {""}
              {""}
              {image?.fundraised}
              MATIC
            </span>
            {""}
            {""}
            {""}
          </p>
          <p>Contract Creator:{image?.email}</p>
          <span className={styles.para}>
            <Image
              src={client[`client${1}`]}
              alt="avatar_img"
              className={styles.avatar_img}
              width={40}
              height={40}
            />
            <small
              className={styles.para_small}
              onClick={() => {
                setNotification("Successfully copied");
                navigator.clipboard.writeText(image?.creator);
              }}
            >
              {image?.creator.slice(0, 30)}...
            </small>
          </span>
        </div>
        <button
          onClick={() => {
            setNotification("Image URL is Successfully copied!");
            navigator.clipboard.writeText(image?.imageURL);
          }}
          className={BTNStyle.button}
        >
          <span className={`${BTNStyle.button_content} ${styles.bt_content}`}>
            Copy URL{" "}
          </span>
        </button>
        <span className={styles.space}></span>
        <button
          onClick={() => {
            setNotification("Thanks for downloading");
            handleClick();
          }}
          className={BTNStyle.button}
        >
          <span className={`${BTNStyle.button_content} ${styles.btn}`}>
            Download Image {""}
          </span>
        </button>

        <span className={styles.space}></span>
        <button onClick={() => setDonate(true)} className={BTNStyle.button}>
          <span className={`${BTNStyle.button_content} ${styles.btn}`}>
            Donate
          </span>
        </button>
      </div>

      {donate && (
        <Donate
          setDonate={setDonate}
          donateAmount={donateAmount}
          setLoading={setLoading}
          setSupport={setSupport}
        />
      )}
    </div>
  );
};

export default Product;
