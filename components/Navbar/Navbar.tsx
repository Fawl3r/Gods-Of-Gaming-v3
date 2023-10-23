import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

export function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const address = useAddress();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={styles.navContainer}>
      <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
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
        </div>

        <div className={`${styles.navMiddle} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
          <Link href="/buy">
            <div className={styles.link}>Buy</div>
          </Link>
          <Link href="/sell">
            <div className={styles.link}>Sell</div>
          </Link>
          <Link href="/warriordex">
            <div className={styles.link}>Warrior Dex</div>
          </Link>
          <Link href="https://f3-packs.vercel.app/">
            <div className={styles.link}>F3 Packs</div>
          </Link>
          <a
            href="https://f3-limited-edition.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Limited Edition NFTs
          </a>
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

        <div className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
          <div className={`${styles.menuIcon} ${isMobileMenuOpen ? styles.open : ""}`}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
        </div>
      </nav>
    </div>
  );
}
