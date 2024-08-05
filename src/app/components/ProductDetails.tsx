import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ProductInfo {
  name: string;
  description: string;
  audience: string;
}

interface ProductContextType {
  productInfo: ProductInfo;
  updateProductInfo: (key: keyof ProductInfo, value: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    name: '',
    description: '',
    audience: ''
  });

  const updateProductInfo = (key: keyof ProductInfo, value: string) => {
    setProductInfo((prevInfo) => ({ ...prevInfo, [key]: value }));
  };

  return (
    <ProductContext.Provider value={{ productInfo, updateProductInfo }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
