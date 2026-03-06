import Image from "next/image";

import { YouTube, Twitter, Instagram, GitHub, FormSVG } from "../SVG";
import styles from "./Profile.module.css";
import images from "../Image/client/index";

const Profile = ({ setOpenProfile, userBlance, address }) => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.img}>
          <Image
            src={images.client1}
            alt="client1"
            className={styles.avatar_img}
            width={80}
            height={80}
            onClick={() => setOpenProfile(true)}
          />
        </div>
        {/*<span>{address.slice(0,25)}</span>*/}
        <span>0x4e448a671458f8b3f...</span>
        <p className={styles.info}>
          {userBlance}Welcome to NFTs IPFS Upload Our products help you securely
          distribute any type of media at scale-freeing you from restrictive
          platforms,middlemen,and algorithms that limit your creative agency.
        </p>

        <div className={styles.share}>
          <a href="#">
            <GitHub />
          </a>
          <a href="#">
            <Twitter />
          </a>
          <a href="#">
            <Instagram />
          </a>
          <a href="#">
            <YouTube />
          </a>
        </div>
        <button onClick={() => setOpenProfile(false)}>Close</button>
      </div>
    </>
  );
};

export default Profile;
