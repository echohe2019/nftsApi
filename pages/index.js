import { useEffect, useState } from "react";
import { useStateContext } from "../Context/NFTs";
import images from "../Components/Image/client/index";
import axios from "axios";
import {
  Button,
  Card,
  Filter,
  Footer,
  Form,
  Header,
  Logo,
  Notification,
  Profile,
  Upload,
} from "../Components";
import Image from "next/image";
const Home = () => {
  const {
    address,
    disconnect,
    contract,
    connect,
    userBalance,
    UploadImage,
    getUploadedImages,
    setLoading,
    loading,
    getAllNFTsAPI,
  } = useStateContext();

  const [openProfile, setOpenProfile] = useState(false);
  const [closeForm, setCloseForm] = useState(true);
  const [file, setFile] = useState(null);
  const [display, setDisplay] = useState(null);
  const [notification, setNotification] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [activeSelect, setActiveSelect] = useState("Old Images");
  const [imagesCopy, setImagesCopy] = useState([]);

  const oldImages = [];
  const fetchImages = async () => {
    const images = await getUploadedImages();
    setAllImages(images);
    const apiImages = await getAllNFTsAPI();
  };

  useEffect(() => {
    if (contract) fetchImages();
  }, [address, contract]);

  if (allImages.length == 0) {
    console.log("loading....");
  } else {
    allImages.map((el) => oldImages.push(el));
  }
  const [category, setCategory] = useState("");
  const [imageInfo, setImageInfo] = useState({
    title: "",
    description: "",
    email: "",
    category: "",
    image: "",
  });
  const handleFormFieldChange = (fieldName, e) => {
    setImageInfo({ ...imageInfo, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCloseForm(false);
    setLoading(true);
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "POST",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "1e3af5cce3690ad17ca9",
            pinata_secret_api_key:
              "8965d827d8cce3a3b9ffb3fed817e981c84b03e4fc1912ca8cfef0b4a4b7a53b",
            "Content-Type": "multipart/form-data",
          },
        });
        const image = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        await UploadImage({
          ...imageInfo,
          image: image,
          category: category,
        });
        setFile(null);
      } catch (error) {
        console.log(error);
      }
    }
    setFile(null);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    e.preventDefault();
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDisplay(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="home">
      <Header notification={notification} setNotification={setNotification} />
      <div className="header">
        <h1>Create 1000 NFTs for free</h1>
      </div>

      <div className="upload">
        <Upload
          onImageChange={onImageChange}
          display={display}
          address={address}
          retrieveFile={retrieveFile}
        />
        <div className="upload-info">
          <h1>Welcome to NFTs IPFS Upload</h1>
          <p>
            Our products help you securely distribute any type of media at
            scale-freeing you from restrictive platforms, middlemen, and
            algorithems that limit your creative agency.
          </p>
          <div className="avatar">
            <Button
              address={address}
              disconnect={disconnect}
              connect={connect}
              file={file}
            />
            {address && (
              <p>
                <Image
                  onClick={() => setOpenProfile(true)}
                  className="avatar_img"
                  src={images.client1}
                  alt="avatar_img"
                  width={40}
                  height={40}
                />
                <span>{address.slice(0, 25)}...</span>
              </p>
            )}
          </div>
        </div>
      </div>
      <h1 className="subheading">All NFTs of Marketplace</h1>

      {allImages.length == 0 ? (
        <Logo />
      ) : allImages == undefined ? (
        <h1>No Images</h1>
      ) : (
        <>
          <Filter
            setImagesCopy={setImagesCopy}
            imagesCopy={imagesCopy}
            setAllImages={setAllImages}
            allImages={allImages}
            oldImages={oldImages}
            activeSelect={activeSelect}
            setActiveSelect={setActiveSelect}
          />
          <div className="card">
            {allImages.map((image, i) => (
              <Card
                key={i + 1}
                image={image}
                index={i}
                setNotification={setNotification}
              />
            ))}
          </div>
        </>
      )}

      <Footer />

      {notification !== "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}

      {openProfile && (
        <div className="profile">
          <Profile
            setOpenProfile={setOpenProfile}
            address={address}
            userBalance={userBalance}
          />
        </div>
      )}

      {loading && (
        <div className="loader">
          <Logo />
        </div>
      )}

      {file && closeForm && (
        <div className="form">
          <div className="form_inner">
            <Form
              setFile={setFile}
              setDisplay={setDisplay}
              handleFormFieldChange={handleFormFieldChange}
              handleSubmit={handleSubmit}
              setCategory={setCategory}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
