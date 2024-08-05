'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from '../styles/ChooseScript.module.css';

const ChooseScript: React.FC = () => {
  const router = useRouter();
  const [selectedScript, setSelectedScript] = useState<string>('');
  const [scripts, setScripts] = useState<{ name: string; script: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const savedScripts = JSON.parse(localStorage.getItem('scripts') || '[]');
    setScripts(savedScripts);
  }, []);

  const handleSelectScript = (script: string) => {
    setSelectedScript(script);
  };

  const handleGenerate = async () => {
    if (selectedScript) {
      setLoading(true);
      localStorage.setItem('selectedScript', selectedScript);
      try {
        const response = await axios.post('https://backjaranamaai-production.up.railway.app/api/gpt/generate-video', {
          script: selectedScript
        });
        const videoUrl = response.data.videoUrl;
        router.push(`/generated-video?videoUrl=${videoUrl}`);
      } catch (error) {
        console.error('Error generating video:', error);
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.header}>
          <span className={styles.arrow} onClick={() => router.back()}>&larr;</span>
          <h1>Choose a video script</h1>
          <p>Here are a few options for your avatar’s script. Pick a style.</p>
        </div>
        <div className={styles.scriptsContainer}>
          {scripts.map((scriptData, index) => (
            <div
              key={index}
              className={`${styles.scriptCard} ${selectedScript === scriptData.script ? styles.selected : ''}`}
              onClick={() => handleSelectScript(scriptData.script)}
            >
              <strong>{scriptData.name}</strong>
              <p>{scriptData.script}</p>
            </div>
          ))}
        </div>
        <button className={styles.button} onClick={handleGenerate} disabled={!selectedScript || loading}>
          {loading ? 'Generating...' : 'Generate the video'}
        </button>
        {loading && <div className={styles.loader}></div>}
      </div>
    </div>
  );
};

export default ChooseScript;
