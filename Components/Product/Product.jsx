import styles from "./Product.module.css";
import Image from "next/image";
import { saveAs } from "file-saver";
import { ethers } from "ethers";

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
  const [donate, setDonate] = useState(false);

  const handleClick = () => {
    if (!image?.imageURL) {
      setNotification("Image URL not available");
      return;
    }

    try {
      saveAs(image.imageURL, image.title || `NFT-${image.imageId}`);
      setNotification("Thanks for downloading");
    } catch (error) {
      console.error("Download error:", error);
      setNotification("Failed to download image");
    }
  };

  return (
    <div className={styles.Product}>
      <div className={styles.image}>
        {image?.imageURL ? (
          <img
            src={image.imageURL}
            alt={image.title || "NFT"}
            className={styles.image_img}
          />
        ) : (
          <div className={styles.image_placeholder}>
            <span>Image not available</span>
          </div>
        )}
      </div>
      <div className={styles.detail}>
        <div className={styles.detail_box}>
          <h1>{image?.title || "NFT Title"}</h1>
          <p>{image?.description || "No description available"}</p>
          <p className={styles.info}>
            <span>Category:{image?.category || "Unknown"}</span>{" "}
            <span>Image ID: #{image?.imageId || "N/A"}</span>{" "}
            <span>
              CreatedAt:
              {image?.createdAt
                ? new Date(image.createdAt * 1000).toDateString()
                : "N/A"}
            </span>
          </p>
          <p className={styles.info}>
            <span>
              Donation:{" "}
              {image?.fundraised
                ? ethers.utils.formatEther(image.fundraised)
                : 0}{" "}
              MATIC
            </span>
          </p>
          <p>Contract Creator:{image?.email || "N/A"}</p>
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
                if (image?.creator) {
                  setNotification("Successfully copied");
                  navigator.clipboard.writeText(image.creator);
                } else {
                  setNotification("Creator address not available");
                }
              }}
            >
              {image?.creator ? `${image.creator.slice(0, 30)}...` : "N/A"}
            </small>
          </span>
        </div>
        <button
          onClick={() => {
            if (image?.imageURL) {
              setNotification("Image URL is Successfully copied!");
              navigator.clipboard.writeText(image.imageURL);
            } else {
              setNotification("Image URL not available");
            }
          }}
          className={BTNStyle.button}
        >
          <span className={`${BTNStyle.button_content} ${styles.bt_content}`}>
            Copy URL
          </span>
        </button>
        <span className={styles.space}></span>
        <button onClick={handleClick} className={BTNStyle.button}>
          <span className={`${BTNStyle.button_content} ${styles.btn}`}>
            Download Image
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
