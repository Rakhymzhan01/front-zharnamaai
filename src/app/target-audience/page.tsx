'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from '../styles/TargetAudience.module.css';

const TargetAudience = () => {
  const router = useRouter();
  const [audience, setAudience] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const suggestions = [
    "Pet owners",
    "Household cleaners",
    "Busy professionals",
    "Apartment renters",
    "Parents",
    "Elderly individuals",
    "Allergy sufferers",
    "Students living in dorms",
    "Small business owners",
    "Home improvement enthusiasts",
    "Eco-conscious consumers",
    "Tech enthusiasts",
    "People with back problems",
    "Single individuals",
    "Gadget lovers"
  ];

  const handleNext = async () => {
    setIsLoading(true);
    try {
      const productData = JSON.parse(localStorage.getItem('items') || '{}');
      const response = await axios.post('https://backjaranamaai-production.up.railway.app/api/gpt/generate-scripts', {
        targetAudience: audience,
        productInfo: productData
      });
      const scripts = response.data;
      localStorage.setItem('scripts', JSON.stringify(scripts));
      router.push('/choose-script');
    } catch (error: any) {
      console.error('Error generating scripts:', error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.arrow} onClick={() => router.back()}>&larr;</span>
        <h1>Who are your ads for?</h1>
        <p>Describe your target audience, so we can tailor your scripts for them.</p>
      </div>
      <input
        type="text"
        className={styles.inputField}
        placeholder="Click the tags below or describe your own audience here."
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
      />
      <div className={styles.suggestionsContainer}>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={styles.suggestion}
            onClick={() => setAudience(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>
      <button className={styles.button} onClick={handleNext} disabled={isLoading}>
        Next &rarr;
      </button>
      {isLoading && <div className={styles.loader}></div>}
    </div>
  );
};

export default TargetAudience;
