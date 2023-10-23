import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ConnectWallet, useContract, useNFTs } from "@thirdweb-dev/react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import {
  NFT_COLLECTION_ADDRESS,
  MARKETPLACE_ADDRESS,
} from "../const/contractAddresses";
import {
  useValidDirectListings,
  useDirectListings,
} from "@thirdweb-dev/react";

// Import your CSS for the background video
import styles from '../styles/Home.module.css'; // Adjust the path as needed

export default function Buy() {
  const router = useRouter();
  const currentPage = parseInt(router.query.page as string) || 1;
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const { data, isLoading, error } = useNFTs(contract, {
    count: 1000,
    start: 0,
  });

  const [nftsPerPage] = useState(50);
  const [validNfts, setValidNfts] = useState([]);
  const {
    data: validDirectListings,
    isLoading: isLoadingDirectValidListings,
    error: directValidListingsError,
  } = useValidDirectListings(marketplace);

  const {
    data: directListings,
    isLoading: isLoadingDirectListings,
    error: directListingsError,
  } = useDirectListings(marketplace);

  useEffect(() => {
    if (data && validDirectListings) {
      const validNftIds = validDirectListings.map((listing) => listing.tokenId);
      const filteredNfts = data.filter((nft) =>
        validNftIds.includes(nft.metadata.id)
      );
      setValidNfts(filteredNfts);
    }
  }, [data, validDirectListings]);

  const totalPages = validNfts ? Math.ceil(validNfts.length / nftsPerPage) : 0;
  const indexOfLastNft = currentPage * nftsPerPage;
  const indexOfFirstNft = indexOfLastNft - nftsPerPage;
  const currentNfts = validNfts.slice(indexOfFirstNft, indexOfLastNft);

  const setCurrentPage = (page) => {
    router.push({
      pathname: "/buy",
      query: { page },
    });
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Define the video source
  const videoSource = "/f3.mp4"; // Provide the correct path to the video in the public folder

  return (
    <div className={styles.background}>
      <Container maxWidth="lg">
      <div className={styles.connectWalletButton}>
          <ConnectWallet />
        </div>
        <h1>Buy Warrior NFTs</h1>
        <p>Browse which NFTs are available.</p>
        {error ? (
          <p>Error: {(error as Error).message}</p>
        ) : (
          <NFTGrid
            data={currentNfts}
            isLoading={isLoading}
            emptyText={"Loading NFTs..."}
          />
        )}
        {/* Pagination Controls */}
        <div>
          <button onClick={() => paginate(1)} disabled={currentPage === 1}>
            First
          </button>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      </Container>
      {/* Video Background */}
      <video autoPlay loop muted className={styles.backgroundVideo}>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
