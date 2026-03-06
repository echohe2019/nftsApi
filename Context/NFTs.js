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
  const [nfts, setNfts] = useState([]);

  const fetchData = async () => {
    if (!signer || !address) return;

    try {
      const balance = await signer.getBalance();
      const uBalance = ethers.utils.formatEther(balance.toString());
      setUserBalance(uBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [address, signer]);

  const UploadImage = async (imageInfo) => {
    if (!contract || !address) {
      console.error("Contract or address not available");
      return;
    }

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

      await axios({
        method: "POST",
        url: `/api/v1/NFTs`,
        data: {
          title,
          description,
          email,
          category,
          image,
          address,
        },
      });

      console.info("Contract call success", createNFTs);

      // 重新获取NFT列表而不是刷新页面
      getUploadedImages();
    } catch (error) {
      console.error("Contract call failure:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUploadedImages = async () => {
    if (!contract) return [];

    try {
      const totalUpload = await contract.call("imagesCount");

      if (totalUpload.toNumber() === 0) {
        setNfts([]);
        return [];
      }

      const images = await contract.call("getAllNFTs");
      const listingPrice = await contract.call("listingPrice");

      const allImages = images.map((image, i) => ({
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
      }));

      setNfts(allImages);
      return allImages;
    } catch (error) {
      console.error("getUploadedImages error:", error);
      return [];
    }
  };

  const singleImage = async (id) => {
    if (!contract) return null;

    try {
      const data = await contract.call("getImage", [id]);
      return {
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
    } catch (error) {
      console.error("contract call singImage failure:", error);
      return null;
    }
  };

  const donateFund = async ({ amount, id }) => {
    if (!contract || !address) {
      console.error("Contract or address not available");
      return;
    }

    try {
      const transaction = await contract.call("donateToImage", [id], {
        value: amount.toString(),
      });

      console.log("Donation transaction:", transaction);

      // 重新获取NFT列表而不是刷新页面
      getUploadedImages();
      return transaction;
    } catch (error) {
      console.error("donateToImage failure:", error);
      throw error;
    }
  };

  const getAllNFTsAPI = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "/api/v1/NFTs",
      });
      return response.data;
    } catch (error) {
      console.error("getAllNFTsAPI error:", error);
      return [];
    }
  };

  const getSingleNFTsAPI = async (id) => {
    try {
      const response = await axios({
        method: "GET",
        url: `/api/v1/NFTs/${id}`,
      });
      return response.data;
    } catch (error) {
      console.error("getSingleNFTsAPI error:", error);
      return null;
    }
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
        nfts,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
