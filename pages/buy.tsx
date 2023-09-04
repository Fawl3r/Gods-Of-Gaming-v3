import React, { useEffect, useState } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";  // Added useContractRead
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";

export default function Buy() {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);

  // Pagination state variables
  const [currentPage, setCurrentPage] = useState(1);
  const [nftsPerPage] = useState(50);

  const indexOfLastNft = currentPage * nftsPerPage;
  const indexOfFirstNft = indexOfLastNft - nftsPerPage;

  // Fetch only valid listings from contract
  const { data, isLoading } = useContractRead(contract, "getAllValidListings", [indexOfFirstNft, indexOfLastNft]);

  const [validNfts, setValidNfts] = useState([]);

  useEffect(() => {
    if (data) {
      setValidNfts(data);
    }
  }, [data]);

  // Calculate the total number of pages
  const totalPages = validNfts ? Math.ceil(validNfts.length / nftsPerPage) : 0;

  // Get the NFTs for the current page
  const currentNfts = validNfts.slice(indexOfFirstNft, indexOfLastNft);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container maxWidth="lg">
      <h1>Buy Warrior NFTs</h1>
      <p>Browse which NFTs are available from the collection.</p>
      <NFTGrid data={currentNfts} isLoading={isLoading} emptyText={"Looks like there are no NFTs in this collection."} />

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
