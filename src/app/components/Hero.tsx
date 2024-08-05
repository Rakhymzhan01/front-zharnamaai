'use client';

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/Home.module.css';

const samples = [
  { name: 'Roku Express', url: 'https://www.amazon.com/Roku-Express-Streaming-Player-Composite/dp/B01M2AJZ5P' },
  { name: 'Tesla Model 3', url: 'https://www.tesla.com/model3' },
  { name: 'Charcuterie Board', url: 'https://www.etsy.com/listing/1567221560/charcuterie-board-personalized-cheese' },
  { name: 'Dyson V10', url: 'https://www.ebay.com/itm/276014546170' }
];

const Hero: React.FC = () => {
  const [productUrl, setProductUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductUrl(e.target.value);
  };

  const handleStartGenerating = async () => {
    const requestId = uuidv4();
    setIsLoading(true);
    try {
      const response = await axios.post('https://zharnamaai-9aae87a9f8d0.herokuapp.com/api/gpt/parse-product', { url: productUrl });
      const data = { id: requestId, ...response.data };
      localStorage.setItem(`request_${requestId}`, JSON.stringify(data));
      router.push(`/edit-product?id=${requestId}`);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleSelect = (sampleUrl: string) => {
    setProductUrl(sampleUrl);
    setDropdownOpen(false);
    handleStartGenerating();
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className={styles.hero}>
      <div className={styles.heroText}>
        <h1>Generate AI Ads from your product URL</h1>
        <p>Just insert your product&apos;s link and we will generate your video in 30 seconds</p>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Paste a specific product listing link"
              value={productUrl}
              onChange={handleInputChange}
              className={styles.input}
            />
            <button className={styles.inputButton} onClick={handleStartGenerating} disabled={isLoading}>
              Generate video
            </button>
          </div>
          <div className={styles.orWrapper}>
            <span className={styles.orText}>or</span>
            <div className={styles.dropdown}>
              <button className={styles.sampleButton} onClick={() => setDropdownOpen(!dropdownOpen)}>
                Try a sample
              </button>
              {dropdownOpen && (
                <div className={styles.dropdownContent}>
                  {samples.map((sample, index) => (
                    <div key={index} onClick={() => handleSampleSelect(sample.url)}>
                      {sample.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {isLoading && <div className={styles.loader}></div>}
      </div>
      <div className={styles.heroVideo}>
        <video ref={videoRef} src="/emma_idle.mp4" autoPlay loop muted playsInline className={styles.video}></video>
      </div>
    </div>
  );
};

export default Hero;
