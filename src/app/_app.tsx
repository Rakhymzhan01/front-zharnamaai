import { AppProps } from 'next/app';
import { ProductProvider } from './components/ProductContext';
import '../styles/globals.css';
import TestComponent from './components/TestComponent'; // Ensure the path is correct

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProductProvider>
      <TestComponent /> {/* Add this to check context */}
      <Component {...pageProps} />
    </ProductProvider>
  );
}

export default MyApp;
