import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

/**
 * Navigation bar that shows up on all pages.
 * Rendered in _app.tsx file above the page content.
 */
export function Navbar() {
  const address = useAddress();

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/">
            <div className={`${styles.homeLink} ${styles.navLeft}`}>
              <Image
                src="/logo.png"
                width={64}
                height={48}
                alt="NFT marketplace sample logo"
              />
            </div>
          </Link>

          <div className={styles.navMiddle}>
            <Link href="/buy">
              <div className={styles.link}>Buy</div>
            </Link>
            <Link href="/sell">
              <div className={styles.link}>Sell</div>
            </Link>
            <Link href="/warriordex"> 
              <div className={styles.link}>Warrior Dex</div>
            </Link>
            <a href="https://f3-limited-edition.vercel.app/" target="_blank" rel="noopener noreferrer" className={styles.link}>
              Limited Edition NFTs
            </a>
          </div>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navConnect}>
            <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
          </div>
          {address && (
            <Link href={`/profile/${address}`}>
              <div className={styles.link}>
                <Image
                  className={styles.profileImage}
                  src="/user-icon.png"
                  width={42}
                  height={42}
                  alt="Profile"
                />
              </div>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
