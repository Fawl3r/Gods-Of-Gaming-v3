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
import styles from '../styles/Home.module.css'; // Import your CSS for the background video

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
  const videoSource = "/f3.mp4"; // Provide the correct path to the video in the public folder

  return (
    <div className={styles.background}>
      {/* Video Background */}
      <video autoPlay loop muted className={styles.backgroundVideo}>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Container maxWidth="lg">
        <h1>Warrior NFT Dex</h1>

        {/* Pagination Controls */}
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
        
        <p>Browse Our Collection.</p>
        {error ? (
          <p>Error: {(error as Error).message}</p>
        ) : (
          <NFTGrid data={currentNfts} isLoading={isLoading} emptyText={"Looks like there are no NFTs in this collection."} />
        )}
        {/* Pagination Controls */}
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
      </Container>
    </div>
  );
}
