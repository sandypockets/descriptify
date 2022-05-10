import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import {useState} from 'react';

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
      <Head>
        <title>Descriptify | AI Product Descriptions</title>
        <meta
          name="description"
          content="Generate product descriptions with AI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="flex justify-center text-5xl">Descriptify</h1>
        <section className="flex justify-center">
          <div className="flex flex-col p-2">
            <form>
              <fieldset className="flex">
                <legend className="sr-only">Product basics</legend>
                <div className="flex flex-col">
                  <label
                    htmlFor="title"
                    className="text-sm font-medium text-gray-700 pt-2 pb-0.5"
                  >
                    Product title
                  </label>
                  <input
                    name="title"
                    id="title"
                    type="text"
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        productTitle: e.target.value,
                      })
                    }
                    className="border border-gray-300 px-2 py-1 rounded-md mr-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 pt-2 pb-0.5">
                    Product type
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        productType: e.target.value,
                      })
                    }
                    className="border border-gray-300 px-2 py-1 rounded-md"
                  />
                </div>
              </fieldset>

              <fieldset>
                <legend className="sr-only">Product variants</legend>
                <div className="flex flex-row-reverse pt-4 mx-2">
                  <div className="mx-auto text-sm">
                    <label
                      htmlFor="hasVariants"
                      className="font-medium text-gray-700 pt-2 pb-0.5"
                    >
                      This product has variants, like sizes or colors
                    </label>
                  </div>
                  <input
                    id="hasVariants"
                    name="hasVariants"
                    type="checkbox"
                    className="h-5 w-5 rounded"
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        hasVariants: e.target.checked,
                      })
                    }
                  />
                </div>
                <div
                  className={
                    productData.hasVariants
                      ? 'animate-grow-in animate-fade-in pt-3'
                      : 'h-3 opacity-0 invisible'
                  }
                >
                  <div className="flex flex-col">
                    <label
                      htmlFor="productAvailVars"
                      className="text-sm font-medium text-gray-700 pt-2 pb-0.5"
                    >
                      Product variant category
                    </label>
                    <input
                      type="text"
                      name="productAvailVars"
                      id="productAvailVars"
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          productAvailVars: e.target.value,
                        })
                      }
                      className="border border-gray-300 px-2 py-1 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="productNumOfVars"
                      className="text-sm font-medium text-gray-700 pt-2 pb-0.5"
                    >
                      Product num of variants
                    </label>
                    <select
                      name="productNumOfVars"
                      className="border border-gray-300 px-2 py-1 rounded-md"
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          productNumOfVars: e.target.value,
                        })
                      }
                    >
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
                </div>
              </fieldset>

              <fieldset>
                <legend className="sr-only">Product marketing</legend>
                <div className="flex flex-col">
                  <label
                    htmlFor="productTargetMarket"
                    className="text-sm font-medium text-gray-700 pt-2 pb-0.5"
                  >
                    Product target market
                  </label>
                  <input
                    name="productTargetMarket"
                    id="productTargetMarket"
                    type="text"
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        productTargetMarket: e.target.value,
                      })
                    }
                    className="border border-gray-300 px-2 py-1 rounded-md"
                  />
                </div>
              </fieldset>

              <div className="mt-2">
                <button
                  className="w-full px-3 py-2 text-xs font-medium rounded shadow-sm text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 border border-transparent"
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  Generate description
                </button>
              </div>
            </form>
            <p className="mt-12 px-2 w-96">{currentAiDescription}</p>
          </div>
        </section>
      </Layout>
    </div>
  );
}
