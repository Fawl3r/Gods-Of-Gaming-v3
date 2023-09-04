import React, { useEffect, useState } from "react";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";

// Placeholder function, replace with your actual logic
const ValidDirectListings = (nft) => {
  // Replace this with your own logic to determine if a listing is valid
  return true; // for now, we assume all NFTs are valid listings
};

export default function Buy() {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading, error } = useNFTs(contract, {
    count: 1000,
    start: 0,
  });

  // Pagination state variables
  const [currentPage, setCurrentPage] = useState(1);
  const [nftsPerPage] = useState(50);
  const [validNfts, setValidNfts] = useState([ValidDirectListings]);

  useEffect(() => {
    if (data) {
      // Filter out invalid NFTs
      const filteredNfts = data.filter(ValidDirectListings);
      setValidNfts(filteredNfts);
    }
  }, [data]);

  // Calculate the total number of pages
  const totalPages = validNfts ? Math.ceil(validNfts.length / nftsPerPage) : 0;

  // Get the NFTs for the current page
  const indexOfLastNft = currentPage * nftsPerPage;
  const indexOfFirstNft = indexOfLastNft - nftsPerPage;
  const currentNfts = validNfts.slice(indexOfFirstNft, indexOfLastNft);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container maxWidth="lg">
      <h1>Buy Warrior NFTs</h1>
      <p>Browse which NFTs are available from the collection.</p>
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
  );
}
