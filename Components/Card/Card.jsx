import styles from "./Card.module.css";
import images from "../Image/client/index";
import Image from "next/image";

const Card = ({ setNotification, image, index }) => {
  console.log("Card image:", image);
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <a href={`/image/${image.imageID}`}>
          <p>
            <img
              className={styles.image}
              src={image.image}
              alt="image"
              width={250}
              height={200}
            />{" "}
          </p>
        </a>
        <span className={styles.para}>
          <Image
            className={styles.avatar_image}
            src={images[`client${index + 1}`]}
            alt="avatar"
            width={40}
            height={40}
          />
          <small
            className={styles.para_small}
            onClick={() => (
              setNotification("Successfully copied!"),
              navigator.clipboard.writeText(image.owner)
            )}
          >
            {/* 0x4e448a671458f8b3fFDD6B40E930c63FC6f7A5cD */}
            {image.owner.slice(0, 25)}...
          </small>
        </span>
        <span>
          CreatedAt:{new Date(image.createdAt * 1000).toDateString()}
          <small className={styles.number}>#{image.imageID}</small>
        </span>
        <small className={styles.para}>
          {image.description.slice(0, 80)}..
        </small>
        <button
          onClick={() => (
            setNotification("Image URL is Successfully copied!"),
            navigator.clipboard.writeText(image.image)
          )}
          className={styles.btn}
        >
          Copy URL
        </button>
      </div>
    </div>
  );
};

export default Card;
