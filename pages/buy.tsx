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
import { motion } from "framer-motion"; // Import motion from framer-motion

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

  // Define the video source with the provided IPFS URL
  const videoSource = "https://video.wixstatic.com/video/1808ae_22da5ac7de5c4e48a3e5fcaf133a28a4/1080p/mp4/file.mp4";

  return (
    <motion.div // Wrap the entire component with motion.div
      initial={{ opacity: 0, y: 20 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation on component mount
      transition={{ duration: 1 }} // Animation duration
      className={styles.background}
    >
      <Container maxWidth="lg">
        <div className={styles.connectWalletButton}>
          <ConnectWallet />
        </div>
        <motion.h1 // Wrap the heading with motion.h1
          initial={{ opacity: 0, y: -20 }} // Initial animation state
          animate={{ opacity: 1, y: 0 }} // Animation on component mount
          transition={{ duration: 0.5, delay: 0.5 }} // Animation duration and delay
        >
          Buy Warrior NFTs
        </motion.h1>
        
        {/* Pagination Controls */}
        <motion.div // Wrap the pagination controls with motion.div
          initial={{ opacity: 0, x: -20 }} // Initial animation state
          animate={{ opacity: 1, x: 0 }} // Animation on component mount
          transition={{ duration: 0.5, delay: 0.7 }} // Animation duration and delay
        >
          <div>
            <button onClick={() => paginate(1)} disabled={currentPage === 1}>
              First
            </button>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
          <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>
            Last
          </button>
          </div>
        </motion.div>
        <motion.p // Wrap the paragraph with motion.p
          initial={{ opacity: 0, y: 20 }} // Initial animation state
          animate={{ opacity: 1, y: 0 }} // Animation on component mount
          transition={{ duration: 0.5, delay: 0.7 }} // Animation duration and delay
        >
          Browse which NFTs are available.
        </motion.p>
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
          <motion.button // Wrap the button with motion.button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            initial={{ opacity: 0, x: -20 }} // Initial animation state
            animate={{ opacity: 1, x: 0 }} // Animation on component mount
            transition={{ duration: 0.5, delay: 0.9 }} // Animation duration and delay
          >
            First
          </motion.button>
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
    </motion.div>
  );
}
