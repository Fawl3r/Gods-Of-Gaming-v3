import React, { useEffect, useState } from "react";
import { useContract, useContractRead, useNFTs } from "@thirdweb-dev/react";  // Added useContractRead
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";

export default function Buy() {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);

  // Pagination state variables
  const [currentPage, setCurrentPage] = useState(1);
  const [nftsPerPage] = useState(50);

  // Calculate start and end IDs for valid listings
  const _startId = (currentPage - 1) * nftsPerPage;
  const _endId = _startId + nftsPerPage - 1;

  // Fetch valid listings using useContractRead
  const { data: validListingsData, isLoading: validListingsLoading } = useContractRead(contract, "getAllValidListings", [_startId, _endId]);

  // State for filtered NFTs (valid listings)
  const [validNfts, setValidNfts] = useState([]);

  useEffect(() => {
    if (validListingsData) {
      setValidNfts(validListingsData);
    }
  }, [validListingsData]);

  // Calculate the total number of pages
  const totalPages = validNfts ? Math.ceil(validNfts.length / nftsPerPage) : 0;

  // Get the NFTs for the current page
  const currentNfts = validNfts.slice(0, nftsPerPage); // Since validNfts are already paginated

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container maxWidth="lg">
      <h1>Buy Warrior NFTs</h1>
      <p>Browse which NFTs are available from the collection.</p>
      <NFTGrid data={currentNfts} isLoading={validListingsLoading} emptyText={"Looks like there are no NFTs in this collection."} />

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
