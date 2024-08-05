// pages/generate.js
import Head from 'next/head';
import Header from '../components/Header';
import MainPage from '../components/MainPage';

export default function Generate() {
  return (
    <div>
      <Head>
        <title>Generate Video - Zharnama.AI</title>
        <meta name="description" content="Generate AI Ads from your product URL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <MainPage />
    </div>
  );
}
