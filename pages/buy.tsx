import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useContract, useValidDirectListings } from '@thirdweb-dev/react';
import Container from '../components/Container/Container';
import NFTGrid from '../components/NFT/NFTGrid';
import { NFT_COLLECTION_ADDRESS } from '../const/contractAddresses';

export default function Buy() {
  const router = useRouter();
  const currentPage = parseInt(router.query.page as string) || 1;
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for low to high, 'desc' for high to low

  const { contract } = useContract(NFT_COLLECTION_ADDRESS, "marketplace-v3");
  const { data, isLoading, error } = useValidDirectListings(contract);

  const [nftsPerPage] = useState(50);
  const [validNfts, setValidNfts] = useState([]);

  useEffect(() => {
    if (data) {
      const sortedData = [...data].sort((a, b) => {
        if (sortOrder === 'asc') {
          return parseFloat(a.pricePerToken) - parseFloat(b.pricePerToken);
        } else {
          return parseFloat(b.pricePerToken) - parseFloat(a.pricePerToken);
        }
      });
      setValidNfts(sortedData);
    }
  }, [data, sortOrder]);

  const totalPages = validNfts ? Math.ceil(validNfts.length / nftsPerPage) : 0;
  const indexOfLastNft = currentPage * nftsPerPage;
  const indexOfFirstNft = indexOfLastNft - nftsPerPage;
  const currentNfts = validNfts.slice(indexOfFirstNft, indexOfLastNft);

  const setCurrentPage = (page: number) => {
    router.push({
      pathname: '/buy',
      query: { page },
    });
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container maxWidth="lg">
      <h1>Buy Warrior NFTs</h1>

      {/* Sort Controls */}
      <div>
        <button onClick={() => setSortOrder('asc')}>Price Low to High</button>
        <button onClick={() => setSortOrder('desc')}>Price High to Low</button>
      </div>

      {/* Pagination Controls */}
      <div>
        <button onClick={() => paginate(1)} disabled={currentPage === 1}>First</button>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>Last</button>
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
