import { createContext, useContext, useEffect, useState } from "react";
import {
  useContract,
  useAddress,
  useMetamask,
  useDisconnect,
  useSigner,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import axios from "axios";
import nftsIPFSAbi from "./nftsIPFS-abi.json";

const StateContext = createContext();
export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x07f66437fAf899Ef6A8bDD3334EAfE9a7a45aBC5",
    nftsIPFSAbi,
  );
  const address = useAddress();
  const connect = useMetamask();

  const disconnect = useDisconnect();
  const signer = useSigner();

  const [userBalance, setUserBalance] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const balance = await signer?.getBalance();
      const uBalance = address
        ? ethers.utils.formatEther(balance?.toString())
        : "";
      setUserBalance(uBalance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const UploadImage = async (imageInfo) => {
    setLoading(true);
    const { title, description, email, category, image } = imageInfo;
    try {
      const listingPrice = await contract.call("listingPrice");
      const createNFTs = await contract.call(
        "uploadIPFS",
        [address, image, title, description, email, category],
        {
          value: listingPrice.toString(),
        },
      );

      const response = await axios({
        method: "POST",
        url: `/api/v1/NFTs`,
        data: {
          title: title,
          description: description,
          email: email,
          category: category,
          image: image,
          address: address,
        },
      });
      console.log(response);
      console.info("Contract call success", createNFTs);

      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getUploadedImages = async () => {
    try {
      const totalUpload = await contract.call("imagesCount");
      console.log("totalUpload", totalUpload);

      if (totalUpload.toNumber() === 0) {
        console.log("No NFTs uploaded yet");
        return [];
      }

      const images = await contract.call("getAllNFTs");

      const listingPrice = await contract.call("listingPrice");
      console.log("listingPrice", listingPrice);

      const allImages = images.map((image, i) => {
        console.log(`Processing image ${i}:`, image);
        return {
          owner: image.creator,
          title: image.title,
          description: image.description,
          email: image.email,
          category: image.category,
          fundraised: image.fundraised,
          image: image.image,
          imageID: image.id ? image.id.toNumber() : i,
          createdAt: image.timestamp ? image.timestamp.toNumber() : Date.now(),
          listedAmount: ethers.utils.formatEther(listingPrice.toString()),
          totalUpload: totalUpload.toNumber(),
        };
      });
      return allImages;
    } catch (error) {
      console.log("getUploadedImages error:", error);
      return [];
    }
  };

  const singleImage = async (id) => {
    try {
      const data = await contract.call("getImage", [id]);
      const image = {
        title: data[0],
        description: data[1],
        email: data[2],
        category: data[3],
        fundraised: ethers.utils.formatEther(data[4].toString()),
        creator: data[5],
        imageURL: data[6],
        createdAt: data[7].toNumber(),
        imageId: data[8].toNumber(),
      };
      return image;
    } catch (error) {
      console.log("contract call singImage failure", error);
    }
  };

  const donateFund = async ({ amount, id }) => {
    try {
      console.log(amount, id);
      const transaction = await contract.call("donateToImage", [id], {
        value: amount.toString(),
      });
      console.log(transaction);

      window.location.reload();
    } catch (error) {
      console.log("donateToImage failure", error);
    }
  };

  const getAllNFTsAPI = async () => {
    const response = await axios({
      method: "GET",
      url: "/api/v1/NFTs",
    });
    console.log("getAllNFTsAPI", response);
  };

  const getSingleNFTsAPI = async (id) => {
    const response = await axios({
      method: "GET",
      url: `/api/v1/NFTs/${id}`,
    });
    console.log("getSingleNFTsAPI", response);
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        disconnect,
        signer,
        userBalance,
        loading,
        setLoading,
        UploadImage,
        getUploadedImages,
        singleImage,
        donateFund,
        getAllNFTsAPI,
        getSingleNFTsAPI,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
