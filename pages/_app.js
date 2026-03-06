import "../styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "../Context/NFTs";

const clientId = "fc8a0ea9804c8c369c0e911ccc1273b8";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      clientId={clientId}
      activeChain={{
        chainId: 11155111,
        rpc: [
          "https://ethereum-sepolia.publicnode.com",
          "https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
          "https://eth-sepolia.public.blastapi.io",
        ],
        nativeCurrency: {
          name: "Sepolia Ether",
          symbol: "ETH",
          decimals: 18,
        },
        slug: "sepolia",
      }}
    >
      <StateContextProvider>
        <Component pageProps={pageProps} />
      </StateContextProvider>
    </ThirdwebProvider>
  );
}
