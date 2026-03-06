import { useStateContext } from "../../Context/NFTs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  Card,
  Footer,
  Header,
  Logo,
  Notification,
  Product,
} from "../../Components";

const imageDetail = () => {
  const {
    address,
    contract,
    getUploadedImages,
    setLoading,
    loading,
    donateFund,
    singleImage,
  } = useStateContext();

  const router = useRouter();
  const { query } = router;

  const [allImages, setAllImages] = useState([]);
  const [notification, setNotification] = useState("");
  const [support, setSupport] = useState("");
  const [image, setImage] = useState();

  const fetchImages = async () => {
    try {
      console.log("query:", query);
      console.log("query.image:", query.image);

      if (!query.image) {
        console.error("Image ID is undefined");
        return;
      }

      const imageId = parseInt(query.image);
      console.log("parsed imageId:", imageId);

      if (isNaN(imageId)) {
        console.error("Invalid image ID:", query.image);
        return;
      }

      const oneImage = await singleImage(imageId);
      const images = await getUploadedImages();
      setAllImages(images);
      setImage(oneImage);
      console.log(oneImage);
    } catch (error) {
      console.error("fetchImages error:", error);
    }
  };

  useEffect(() => {
    console.log(
      "useEffect triggered, contract:",
      contract,
      "query.image:",
      query.image,
    );
    if (contract && query.image) {
      fetchImages();
    }
  }, [address, contract, query.image]);

  const donateAmount = async () => {
    try {
      if (!support || isNaN(support) || parseFloat(support) <= 0) {
        setNotification("Please enter a valid donation amount");
        return;
      }

      setLoading(true);
      await donateFund({
        amount: ethers.utils.parseUnits(support.toString(), 18),
        id: parseInt(query.image),
      });
      setLoading(false);
      setNotification("Donation successful!");
    } catch (error) {
      console.error("donateAmount error:", error);
      setNotification("Donation failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <Header notification={notification} setNotification={setNotification} />
      {image == undefined ? (
        <Logo />
      ) : (
        <Product
          setLoading={setLoading}
          donateAmount={donateAmount}
          setNotification={setNotification}
          setSupport={setSupport}
          image={image}
        />
      )}
      <div className="card">
        {allImages
          .map((image, i) => (
            <Card
              key={i + 1}
              image={image}
              index={i}
              setNotification={setNotification}
            />
          ))
          .slice(0, 8)}
      </div>
      <Footer />
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}

      {loading && (
        <div className="loader">
          <Logo />
        </div>
      )}
    </div>
  );
};
export default imageDetail;
