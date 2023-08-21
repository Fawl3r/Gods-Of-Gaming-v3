import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";

/**
 * Landing page with a simple gradient background and a hero asset.
 * Free to customize as you see fit.
 */
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroBackgroundInner}>
              <Image
                src=""
                width={1280}
                height={1080}
                alt="Background gradient from red to blue"
                quality={100}
                className={styles.gradient}
              />
            </div>
          </div>
          <div className={styles.heroAssetFrame}>
           
            <Image
              src="/hero-asset.gif"
              width={800}
              height={500}
              alt="Hero asset, NFT marketplace"
              quality={100}
              className={styles.heroAsset}
            />
          </div>
          <div className={styles.heroBodyContainer}>
            <div className={styles.heroBody}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleGradient}>
                  <i>Collect F3 Warriors!</i>
                </span>
                <br />
                Gaming Redefined.
              </h1>
              <p className={styles.heroSubtitle}>
                <Link
                  className={styles.link}
                  href="https://godsofgaming.games"
                  target="_blank"
                >
                  Gods Of Gaming 
                </Link>{" "}
                Presents: <i>F3 Warriors—Where Deities and Heroes Collide!</i>.
              </p>

              <div className={styles.heroCtaContainer}>
                <Link className={styles.heroCta} href="/buy">
                  <b>Learn More</b>
                </Link>
                <Link
                  className={styles.secondaryCta}
                  href="https://gods-of-gaming.gitbook.io/gods-of-gaming-whitepaper/the-numbers/revenue-sharing-investing-in-the-gods-of-gaming-ecosystem/f3-warriors-revenue-sharing-season-1-exclusivity"
                  target="_blank"
                >
                  Whitepaper
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
