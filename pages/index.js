import Head from 'next/head';
import Layout from "../components/Layout/Layout";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Descriptify | AI Product Descriptions</title>
        <meta
          name="description"
          content="Generate product descriptions with AI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Descriptify</h1>
      </Layout>
    </div>
  );
}
