import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useContract, useNFTs } from '@thirdweb-dev/react';
import Container from '../components/Container/Container';
import NFTGrid from '../components/NFT/NFTGrid';
import { NFT_COLLECTION_ADDRESS } from '../const/contractAddresses';
import {
  MediaRenderer,
  ThirdwebNftMedia,
  useCancelListing,
  useContractEvents,
  useValidDirectListings,
  useValidEnglishAuctions,
  Web3Button,
} from "@thirdweb-dev/react";
import styles from '../styles/Home.module.css';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const validDirectListings = (nft) => {
  // Replace this with your logic to determine if a listing is valid
  return nft.priceString !== "Not for sale";  // Replaced 'status' with 'priceString'
};

export default function Buy() {
  const router = useRouter();
  const currentPage = parseInt(router.query.page as string) || 1;

  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading, error } = useNFTs(contract, {
    count: 1000,
    start: 0,
  });

  const [nftsPerPage] = useState(50);
  const [validNfts, setValidNfts] = useState([]);

  useEffect(() => {
    if (data) {
      // Adjust this section to execute your new filtering logic
      const filteredNfts = data.filter(validDirectListings);
      setValidNfts(filteredNfts);
    }
  }, [data]);

  const totalPages = validNfts ? Math.ceil(validNfts.length / nftsPerPage) : 0;
  const indexOfLastNft = currentPage * nftsPerPage;
  const indexOfFirstNft = indexOfLastNft - nftsPerPage;
  const currentNfts = validNfts.slice(indexOfFirstNft, indexOfLastNft);

  const setCurrentPage = (page: number) => {
    router.push({
      pathname: '/warriordex',
      query: { page }
    });
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Define the video source
  const videoSource = "https://video.wixstatic.com/video/1808ae_22da5ac7de5c4e48a3e5fcaf133a28a4/1080p/mp4/file.mp4"; // Provide the correct path to the video in the public folder

  return (
    <motion.div // Wrap the entire component with motion.div
      initial={{ opacity: 0, y: 20 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation on component mount
      transition={{ duration: 1 }} // Animation duration
      className={styles.background}
    >
      {/* Video Background */}
      <video autoPlay loop muted className={styles.backgroundVideo}>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Container maxWidth="lg">
        <motion.h1 // Wrap the heading with motion.h1
          initial={{ opacity: 0, y: -20 }} // Initial animation state
          animate={{ opacity: 1, y: 0 }} // Animation on component mount
          transition={{ duration: 0.5, delay: 0.5 }} // Animation duration and delay
        >
          Warrior NFT Dex
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
          transition={{ duration: 0.5, delay: 0.9 }} // Animation duration and delay
        >
          Browse Our Collection.
        </motion.p>
        {error ? (
          <p>Error: {(error as Error).message}</p>
        ) : (
          <NFTGrid data={currentNfts} isLoading={isLoading} emptyText={"Looks like there are no NFTs in this collection."} />
        )}
        {/* Pagination Controls */}
        <motion.div // Wrap the pagination controls with motion.div
          initial={{ opacity: 0, x: -20 }} // Initial animation state
          animate={{ opacity: 1, x: 0 }} // Animation on component mount
          transition={{ duration: 0.5, delay: 1.1 }} // Animation duration and delay
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
      </Container>
    </motion.div>
  );
}
