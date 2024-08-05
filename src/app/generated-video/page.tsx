// src/app/generate/page.tsx
'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../styles/GeneratedVideo.module.css';

const GeneratePage: React.FC = () => {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get('videoUrl');

  if (!videoUrl) {
    return <div className={styles.error}>No video URL provided</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Generated Video</h1>
      <div className={styles.videoWrapper}>
        <video className={styles.video} controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default GeneratePage;
