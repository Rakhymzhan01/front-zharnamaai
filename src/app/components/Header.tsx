import React from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>ZharnamaAI</div>
      <nav className={styles.nav}>
        <a href="#">Products</a>
        <a href="#">Tools</a>
        <a href="#">Resources</a>
        <a href="#">Careers</a>
        <a href="#">About Us</a>
      </nav>
    </header>
  );
};

export default Header;
