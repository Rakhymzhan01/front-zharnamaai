// frontend/src/app/generate/page.tsx
'use client';

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import { ProductContext } from '../components/ProductContext';

const Generate: React.FC = () => {
  const [productUrl, setProductUrl] = useState<string>('');
  const { updateProductInfo } = useContext(ProductContext)!;
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductUrl(e.target.value);
  };

  const handleStartGenerating = async () => {
    try {
      const response = await axios.post('/api/gpt/parse-product', { url: productUrl });
      const { name, description, images } = response.data;
      updateProductInfo('name', name);
      updateProductInfo('description', description);
      updateProductInfo('images', images);
      router.push('/target-audience');
    } catch (error: any) {
      console.error('Error generating video:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className={styles.hero}>
      <div className={styles.heroText}>
        <h1>Generate AI Ads from your product URL</h1>
        <p>Just insert your product's link and we will generate your video in 30 seconds</p>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Paste your product link here..."
            value={productUrl}
            onChange={handleInputChange}
            className={styles.input}
          />
          <button className={styles.inputButton} onClick={handleStartGenerating}>
            ➔
          </button>
        </div>
      </div>
    </div>
  );
};

export default Generate;
