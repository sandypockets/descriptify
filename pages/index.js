import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import {useState} from 'react';
import Form from '../components/Forms/Form';

export default function Home() {
  const [productData, setProductData] = useState({
    productTitle: '',
    productType: '',
    hasVariants: false,
    productAvailVars: '',
    productNumOfVars: '',
    productTargetMarket: '',
    maxCharLength: 200,
  });
  const [currentAiDescription, setCurrentAiDescription] = useState(
    'Add your product information to the fields above to generate a description.',
  );

  function handleSubmit(e) {
    e.preventDefault();
    fetch('/api/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentAiDescription(data?.choices[0]?.text);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Layout>
        <h1 className="flex justify-center text-5xl">Descriptify</h1>
        <section className="flex justify-center">
          <div className="flex flex-col p-2">
            <Form
              productData={productData}
              setProductData={setProductData}
              handleSubmit={handleSubmit}
            />
            <p className="mt-12 px-2 w-96">{currentAiDescription}</p>
          </div>
        </section>
      </Layout>
    </div>
  );
}
