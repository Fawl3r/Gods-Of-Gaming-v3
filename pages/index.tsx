import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion"; // Import motion from framer-motion

const Home: NextPage = () => {
  return (
    <motion.div // Wrap the entire component with motion.div
      initial={{ opacity: 0, y: 20 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation on component mount
      transition={{ duration: 1 }} // Animation duration
      className={styles.container}
    >
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
            <div className={styles.videoOverlay}></div> {/* Add overlay */}
            <video
              width="100%"
              autoPlay
              loop
              muted
              className={styles.yourVideoStyle}
            >
              <source
                src="/bghero.mp4" // Provide the correct path to the video
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className={styles.heroBodyContainer}>
            <div className={styles.heroBody}>
              <motion.h1 // Wrap the heading with motion.h1
                initial={{ opacity: 0, y: -20 }} // Initial animation state
                animate={{ opacity: 1, y: 0 }} // Animation on component mount
                transition={{ duration: 0.5, delay: 0.5 }} // Animation duration and delay
                className={styles.heroTitle}
              >
                <span className={styles.heroTitleGradient}>
                  <i>Collect F3 Warriors!</i>
                </span>
                <br />
                Gaming Redefined.
              </motion.h1>
              <motion.p // Wrap the paragraph with motion.p
                initial={{ opacity: 0, y: 20 }} // Initial animation state
                animate={{ opacity: 1, y: 0 }} // Animation on component mount
                transition={{ duration: 0.5, delay: 1 }} // Animation duration and delay
                className={styles.heroSubtitle}
              >
                <Link
                  className={styles.link}
                  href="https://godsofgaming.games"
                  target="_blank"
                >
                  Gods Of Gaming
                </Link>{" "}
                Presents: <i>F3 Warriors—Where Deities and Heroes Collide!</i>.
              </motion.p>

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
    </motion.div>
  );
};

export default Home;
