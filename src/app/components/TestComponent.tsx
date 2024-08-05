import React, { useContext } from 'react';
import { ProductContext } from './ProductContext';

const TestComponent: React.FC = () => {
  const productContext = useContext(ProductContext);

  if (!productContext) {
    return <div>No ProductContext available</div>;
  }

  return <div>ProductContext is available</div>;
};

export default TestComponent;
