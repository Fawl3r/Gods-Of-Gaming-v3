import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from '@thirdweb-dev/react';
import Container from '../components/Container/Container';
import NFTGrid from '../components/NFT/NFTGrid';
import { NFT_COLLECTION_ADDRESS } from '../const/contractAddresses';
import tokenPageStyles from '../styles/Token.module.css';
import { NFT as NFTType } from '@thirdweb-dev/sdk';
import SaleInfo from '../components/SaleInfo/SaleInfo';
import styles from '../styles/Home.module.css';

export default function Sell() {
  const router = useRouter();
  const currentPage = parseInt(router.query.page as string) || 1;
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const address = useAddress();
  const { data, isLoading } = useOwnedNFTs(contract, address);
  const [selectedNft, setSelectedNft] = useState<NFTType>();


  const [nftsPerPage] = useState(30);
  const totalPages = data ? Math.ceil(data.length / nftsPerPage) : 0;
  const indexOfLastNft = currentPage * nftsPerPage;
  const indexOfFirstNft = indexOfLastNft - nftsPerPage;
  const currentNfts = data ? data.slice(indexOfFirstNft, indexOfLastNft) : [];

  const setCurrentPage = (page: number) => {
    router.push({
      pathname: '/sell',
      query: { page }
    });
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <Container maxWidth="lg">
        <div className={styles.connectWalletButton}>
          <ConnectWallet />
        </div>
        <h1>Sell Warrior NFTs</h1>
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
        
        
        {!selectedNft ? (
          <>
            <p>Select which NFT you&rsquo;d like to sell below.</p>
            <NFTGrid
              data={currentNfts}
              isLoading={isLoading}
              overrideOnclickBehavior={(nft) => {
                setSelectedNft(nft);
              }}
              emptyText={
                "Looks like you don't own any NFTs in this collection. Head to the buy page to buy some!"
              }
            />
          </>
        ) : (
          <div className={tokenPageStyles.container} style={{ marginTop: 0 }}>
            <div className={tokenPageStyles.metadataContainer}>
              <div className={tokenPageStyles.imageContainer}>
                <ThirdwebNftMedia
                  metadata={selectedNft.metadata}
                  className={tokenPageStyles.image}
                />
                <button
                  onClick={() => {
                    setSelectedNft(undefined);
                  }}
                  className={tokenPageStyles.crossButton}
                >
                  X
                </button>
              </div>
            </div>

            <div className={tokenPageStyles.listingContainer}>
              <p>You&rsquo;re about to list the following item for sale.</p>
              <h1 className={tokenPageStyles.title}>
                {selectedNft.metadata.name}
              </h1>
              <p className={tokenPageStyles.collectionName}>
                Token ID #{selectedNft.metadata.id}
              </p>

              <div className={tokenPageStyles.pricingContainer}>
                <SaleInfo nft={selectedNft} />
              </div>
            </div>
          </div>
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
