import React, { createContext, useState, useContext } from 'react';

interface ProductContextType {
  productInfo: { audience: string };
  updateProductInfo: (key: string, value: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider: React.FC = ({ children }: any) => {
  const [productInfo, setProductInfo] = useState({ audience: '' });

  const updateProductInfo = (key: string, value: string) => {
    setProductInfo((prevInfo) => ({ ...prevInfo, [key]: value }));
  };

  return (
    <ProductContext.Provider value={{ productInfo, updateProductInfo }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
