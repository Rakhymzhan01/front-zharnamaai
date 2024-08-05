'use client';

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/Home.module.css';

const samples = [
  { name: 'Roku Express', url: 'https://www.amazon.com/Roku-Express-Streaming-Player-Composite/dp/B01M2AJZ5P', info: { title: "Roku Express | HD Streaming Media Player", description: "Roku Express delivers a smooth HD streaming experience on your TV at our best price.", images: ["https://images-na.ssl-images-amazon.com/images/I/71e5u8IXZlL._AC_SL1500_.jpg"] }},
  { name: 'Tesla Model 3', url: 'https://www.tesla.com/model3', info: { title: "Tesla Model 3", description: "Model 3 is designed for electric-powered performance, with dual motor AWD, quick acceleration, long range and fast charging.", images: ["https://www.tesla.com/sites/default/files/modelsx-new/social/model-3-hero-social.jpg"] }},
  { name: 'Charcuterie Board', url: 'https://www.etsy.com/listing/1567221560/charcuterie-board-personalized-cheese', info: { title: "Charcuterie Board Personalized Cheese Board", description: "Beautifully crafted charcuterie board perfect for serving cheese and other appetizers. Can be personalized with your name or a special message.", images: ["https://i.etsystatic.com/1567221560/r/il/5e1f24/2644467045/il_794xN.2644467045_h5fb.jpg"] }},
  { name: 'Dyson V10', url: 'https://www.ebay.com/itm/276014546170', info: { title: "Dyson V10 Absolute Cordless Vacuum", description: "Dyson V10 Absolute provides powerful suction to deep clean your home. Its lightweight and versatile design makes it easy to handle.", images: ["https://i.ebayimg.com/images/g/7OYAAOSwZrpbHfg7/s-l1600.jpg"] }}
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

  const handleSampleSelect = (sample: any) => {
    const requestId = uuidv4();
    const data = { id: requestId, ...sample.info };
    localStorage.setItem(`request_${requestId}`, JSON.stringify(data));
    router.push(`/edit-product?id=${requestId}`);
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
        <p>Just insert your product's link and we will generate your video in 30 seconds</p>
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
                    <div key={index} onClick={() => handleSampleSelect(sample)}>
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
