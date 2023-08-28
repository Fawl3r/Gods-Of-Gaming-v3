import React, { useState } from "react";
import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";
import tokenPageStyles from "../styles/Token.module.css";
import { NFT as NFTType } from "@thirdweb-dev/sdk";
import SaleInfo from "../components/SaleInfo/SaleInfo";

export default function Sell() {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const address = useAddress();
  const { data, isLoading } = useOwnedNFTs(contract, address);
  const [selectedNft, setSelectedNft] = useState<NFTType | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [nftsPerPage] = useState(10); // Display 10 NFTs per page

  // Calculate total pages
  const totalPages = data ? Math.ceil(data.length / nftsPerPage) : 0;

  // Get current NFTs
  const indexOfLastNft = currentPage * nftsPerPage;
  const indexOfFirstNft = indexOfLastNft - nftsPerPage;
  const currentNFTs = data?.slice(indexOfFirstNft, indexOfLastNft);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container maxWidth="lg">
      <h1>Sell Warrior NFTs</h1>
      {!selectedNft ? (
        <>
          <p>Select which NFT you&rsquo;d like to sell below.</p>
          <NFTGrid
            data={currentNFTs}
            isLoading={isLoading}
            overrideOnclickBehavior={(nft) => setSelectedNft(nft)}
            emptyText={
              "Looks like you don't own any NFTs in this collection. Head to the buy page to buy some!"
            }
          />
          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
           ) : (
            <div>
              {/* ... rest of your code for the selected NFT logic */}
            </div>
          )}
        </Container>
      );
    }
    