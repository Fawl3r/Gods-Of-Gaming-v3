import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";

export default function Buy() {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading, error } = useNFTs(
    contract,
    {
      // For example, to only return the first 500 NFTs in the collection
      count: 500,
      start: 0,
    }
  );

  return (
    <Container maxWidth="lg">
      <h1>Buy NFTs</h1>
      <p>Browse which NFTs are available from the collection.</p>
      {
        error ? <p>Error: {(error as Error).message}</p> : 
        <NFTGrid
          data={data}
          isLoading={isLoading}
          emptyText={"Looks like there are no NFTs in this collection."}
        />
      }
    </Container>
  );
}
