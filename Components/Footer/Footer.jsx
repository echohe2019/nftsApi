import Logo from "../Logo/Logo";
import styles from "./Footer.module.css";
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
} from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";

const Footer = () => {
  const menuList = ["Home", "About", "Product", "Contact", "ICO", "Membership"];
  return (
    <div className={styles.footer}>
      <div className={styles.footer_box}>
        <div className={styles.footer_box_social}>
          <a href="/">
            <Logo className={styles.footer_box_social_logo} />
          </a>
          <p className={styles.footer_box_social_info}>
            The world's first and largest digital marketplace for crypto
            collectibles and non-fungible tokens (NFTs).
          </p>
          <div className={styles.footer_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
          </div>
        </div>
        <div className={styles.footer_box_help}>
          <h3>Help Center</h3>
          <div className={styles.menu}>
            {menuList.map((el, i) => (
              <p key={i + 1}>{el}</p>
            ))}
          </div>
        </div>
        <div className={styles.subscribe}>
          <h3>Subscribe</h3>
          <div className={styles.subscribe_box}>
            <input type="email" placeholder="Enter your email *" />
            <RiSendPlaneFill className={styles.subscribe_box_send} />
          </div>
          <div className={styles.subscribe_box_info}>
            <p>
              Discover,collect and sell extraordinary NFTs OpenSea is the world
              first and largest NFT marketplace
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
