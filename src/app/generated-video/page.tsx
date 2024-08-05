'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../styles/GeneratedVideo.module.css';

const GeneratedVideo = () => {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get('videoUrl');

  if (!videoUrl) {
    return <div className={styles.error}>No video URL provided.</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Generated Video</h1>
      <div className={styles.videoWrapper}>
        <video controls src={videoUrl} className={styles.video}></video>
      </div>
    </div>
  );
};

export default GeneratedVideo;
