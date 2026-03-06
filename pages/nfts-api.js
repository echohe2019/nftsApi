import { Footer, Notification, Header, Logo } from "../Components";
import { useStateContext } from "../Context/NFTs";
import { useState } from "react";

const nftsapi = () => {
  const { loading } = useStateContext();
  const [notifications, setNotifications] = useState("");

  const apiEndpoint = [
    {
      title: "Get All NFTs",
      description:
        "Welcome to NFTs Api,access to all the nfts uploaded to IPFS,by following the metions step down below",
      method: "GET",
      endpoint: "http://localhost:3000/api/v1/NFTs",
    },
    {
      title: "Get Single NFT",
      description:
        "Single NFts Api endpoint,get access to signle nft uploaded to IPFS,by following the metions step down below",
      method: "GET",
      endpoint: "http://localhost:3000/api/v1/NFTs/Id",
    },
    {
      title: "Create Image Upload",
      description:
        "This enddpoint will allow you to make post request on the server to upload the Image",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/NFTs",
    },
    {
      title: "Login EndPoint",
      description:
        "allow api user to use the NFTs API authentication,to log user in",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/user/login",
    },
    {
      title: "SignUp EndPoint",
      description:
        "allow api user to use the NFTs API for creating account,to signup user",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/user/signup",
    },
  ];

  return (
    <div className="home">
      <Header notification={notifications} setNotification={setNotifications} />
      <div className="header">
        <h1>How To Use NGTs API</h1>
      </div>
      <div className="api-body">
        {apiEndpoint.map((endpoint, index) => (
          <div className="api-left" key={index}>
            <h3 className="api-title">{endpoint.title}</h3>
            <p>{endpoint.description}</p>
            <p>Method:{" "}{" "}{" "} {endpoint.method}</p>
            <p>Endpoint:{" "}{" "}{" "} {endpoint.endpoint}</p>
          </div>
        ))}
      </div>
      <Footer />

      {notifications != "" && (
        <Notification
          notification={notifications}
          setNotification={setNotifications}
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

export default nftsapi;
