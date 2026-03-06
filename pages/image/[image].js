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
  const [image, setImage] = useState(null);

  const fetchImages = async () => {
    if (!contract || !query.image) return;

    try {
      const imageId = parseInt(query.image);

      if (isNaN(imageId)) {
        setNotification("Invalid image ID");
        return;
      }

      const oneImage = await singleImage(imageId);
      const images = await getUploadedImages();

      setAllImages(images);
      setImage(oneImage);
    } catch (error) {
      console.error("fetchImages error:", error);
      setNotification("Failed to load image details");
    }
  };

  useEffect(() => {
    fetchImages();
  }, [address, contract, query.image]);

  const donateAmount = async () => {
    if (!support || isNaN(support) || parseFloat(support) <= 0) {
      setNotification("Please enter a valid donation amount");
      return;
    }

    try {
      setLoading(true);
      const imageId = parseInt(query.image);

      if (isNaN(imageId)) {
        setNotification("Invalid image ID");
        return;
      }

      await donateFund({
        amount: ethers.utils.parseUnits(support.toString(), 18),
        id: imageId,
      });

      setNotification("Donation successful!");
      setSupport("");
      fetchImages();
    } catch (error) {
      console.error("donateAmount error:", error);
      setNotification("Donation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <Header notification={notification} setNotification={setNotification} />
      {!image ? (
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
          .map((img, i) => (
            <Card
              key={i + 1}
              image={img}
              index={i}
              setNotification={setNotification}
            />
          ))
          .slice(0, 8)}
      </div>
      <Footer />
      {notification && (
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
