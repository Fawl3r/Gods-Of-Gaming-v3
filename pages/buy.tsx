import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useContract, useNFTs } from '@thirdweb-dev/react';
import Container from '../components/Container/Container';
import NFTGrid from '../components/NFT/NFTGrid';
import { NFT_COLLECTION_ADDRESS } from '../const/contractAddresses';

const validDirectListings = (nft) => {
  return nft.status !== "Not for sale";
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
  const [sortOrder, setSortOrder] = useState('priceAsc');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (data) {
      let filteredNfts = data;
      if (filterStatus !== 'all') {
        filteredNfts = data.filter(nft => nft.status === filterStatus);
      }

      if (sortOrder === 'priceAsc') {
        filteredNfts.sort((a, b) => a.price - b.price);
      } else if (sortOrder === 'priceDesc') {
        filteredNfts.sort((a, b) => b.price - a.price);
      }

      setValidNfts(filteredNfts);
    }
  }, [data, sortOrder, filterStatus]);


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
      
      {/* Sort and Filter Controls */}
      <div>
        <label>
          Sort by:
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </label>
        <label>
          Filter by:
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="For Sale">For Sale</option>
            <option value="Not for sale">Not for Sale</option>
          </select>
        </label>
      </div>

      {/* Pagination Controls */}
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

      {/* Pagination Controls */}
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