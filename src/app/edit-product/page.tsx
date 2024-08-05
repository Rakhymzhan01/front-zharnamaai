'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../styles/EditProduct.module.css';
import Image from 'next/image';

const EditProduct = () => {
  const [productName, setProductName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const requestId = searchParams.get('id');
    if (requestId) {
      const storedData = localStorage.getItem(`request_${requestId}`);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setProductName(parsedData.name || '');
        setDescription(parsedData.description || '');
        setImages(parsedData.images || []);
      }
    }
  }, [searchParams]);

  const handleNext = () => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set('productName', productName);
    updatedParams.set('description', description);
    updatedParams.set('images', JSON.stringify(images));
    router.push(`/target-audience?${updatedParams.toString()}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileUrls = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImages(prevImages => [...prevImages, ...fileUrls]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.header}>
          <span className={styles.arrow} onClick={() => router.back()}>&larr;</span>
          <h1>Edit your product&apos;s name, description, and media</h1>
        </div>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <textarea
          className={styles.textArea}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={styles.fileUpload}>
          <label htmlFor="media">Choose Files</label>
          <input
            type="file"
            id="media"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <div className={styles.imagePreview}>
            {images.map((src, index) => (
              <div key={index} className={styles.imageContainer}>
                <Image src={src} alt={`media-${index}`} width={50} height={50} />
                <button className={styles.deleteButton} onClick={() => handleDeleteImage(index)}>x</button>
              </div>
            ))}
          </div>
        </div>
        <button className={styles.button} onClick={handleNext}>
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

const EditProductWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditProduct />
  </Suspense>
);

export default EditProductWrapper;
