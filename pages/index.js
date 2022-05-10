import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import { useState } from 'react';

export default function Home() {
  const [productTitle, setProductTitle] = useState('Nikee Potato');
  const [productType, setProductType] = useState('sneaker');
  const [productAvailVars, setProductAvailVars] = useState('colors');
  const [productNumOfVars, setProductNumOfVars] = useState(2);
  const [productTargetMarket, setProductTargetMarket] = useState('young people');
  const [maxCharLength, setMaxCharLength] = useState(200);

  const [currentAiDescription, setCurrentAiDescription] = useState(
    'ai output goes here',
  );

  function handleSubmit(e) {
    e.preventDefault();
    const aiQuery = `Write a product description for a ${productType}. The product title is "${productTitle}". The sneaker is available in ${productNumOfVars} ${productAvailVars}. The maximum length of the description should be ${maxCharLength} characters or less. The description should be targeted to ${productTargetMarket}.`;

    // Debugging
    console.log('AI Query: ', aiQuery);
  }

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
        <h1 className="text-5xl">Descriptify</h1>

        <div className="flex p-2">
          <textarea value={currentAiDescription}></textarea>

          <form>
            <fieldset>
              <legend className="sr-only">Product Information</legend>
              <div>
                <label>Product title</label>
                <input
                  type="text"
                  onChange={(e) => setProductTitle(e.target.value)}
                />
              </div>
              <div>
                <label>Product type</label>
                <input
                  type="text"
                  onChange={(e) => setProductType(e.target.value)}
                />
              </div>
              <div>
                <label>Product variant category</label>
                <input
                  type="text"
                  onChange={(e) => setProductAvailVars(e.target.value)}
                />
              </div>
              <div>
                <label>Product num of variants</label>
                <select onChange={(e) => setProductNumOfVars(e.target.value)}>
                  {[...Array(10).keys()].map((i) => {
                    if (i > 0) {
                      return (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
              <div>
                <label>Product target market</label>
                <input
                  type="text"
                  onChange={(e) => setProductTargetMarket(e.target.value)}
                />
              </div>
            </fieldset>
            <button onClick={(e) => handleSubmit(e)}>Submit</button>
          </form>
        </div>
      </Layout>
    </div>
  );
}
