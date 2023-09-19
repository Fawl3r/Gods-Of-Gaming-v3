import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useContract, useNFTs } from '@thirdweb-dev/react';
import Container from '../components/Container/Container';
import NFTGrid from '../components/NFT/NFTGrid';
import { NFT_COLLECTION_ADDRESS } from '../const/contractAddresses';



const ValidDirectListings = (nft) => {
  // Replace this with your own logic to determine if a listing is valid
  return true;
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
      const filteredNfts = data.filter(ValidDirectListings);
      setValidNfts(filteredNfts);
    }
  }, [data]);

  const totalPages = validNfts ? Math.ceil(validNfts.length / nftsPerPage) : 0;
  const indexOfLastNft = currentPage * nftsPerPage;
  const indexOfFirstNft = indexOfLastNft - nftsPerPage;
  const currentNfts = validNfts.slice(indexOfFirstNft, indexOfLastNft);

  const setCurrentPage = (page: number) => {
    router.push({
      pathname: '/buy',
      query: { page }
    });
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container maxWidth="lg">
      <h1>Buy Warrior NFTs</h1>

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
      
      <p>Browse which NFTs are available from the collection.</p>
      {error ? (
        <p>Error: {(error as Error).message}</p>
      ) : (
        <NFTGrid data={currentNfts} isLoading={isLoading} emptyText={"Looks like there are no NFTs in this collection."} />
      )}
    </Container>
  );
}
