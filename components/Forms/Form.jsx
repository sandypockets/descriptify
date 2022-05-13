import TextInput from './TextInput';
import {useState, useEffect} from 'react';
import {error} from 'next/dist/build/output/log';

export default function Form({
  productData,
  setProductData,
  handleSubmit,
  loading,
}) {
  const [aiEngines, setAIEngines] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(false);

  useEffect(() => {
    if (aiEngines.length === 0) {
      setOptionsLoading(true);
      fetch('/api/v1/engines', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          let filteredEngines = [];
          for (const engine of data.data) {
            const id = engine.id;
            if (id.split('-')[0] === 'text' && id.split('-')[2] === '001') {
              filteredEngines.push(engine);
            }
          }
          setAIEngines(filteredEngines);
          setOptionsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [aiEngines]);

  return (
    <form
      data-test="form"
      className="bg-white p-6 rounded-md shadow-xl mx-4 sm:mx-auto"
    >
      <fieldset className="flex flex-col sm:flex-row">
        <legend className="sr-only">Product basics</legend>
        <TextInput
          productData={productData}
          setProductData={setProductData}
          label="Product title"
          dataKey="productTitle"
          placeholder="Air Jordan 1 Mid"
          error={error}
          dataTest="form-product-title"
        />
        <div className="px-1" />
        <TextInput
          productData={productData}
          setProductData={setProductData}
          label="Product type"
          dataKey="productType"
          placeholder="Sneakers"
          error={error}
          dataTest="form-product-type"
        />
      </fieldset>
      <fieldset>
        <legend className="sr-only">Product variants</legend>
        <div className="flex flex-row-reverse pt-4 mx-auto">
          <div className="mx-auto text-xs sm:text-sm pt-0.5 sm:pt-0">
            <label
              htmlFor="hasVariants"
              className="font-normal text-gray-700 pt-2 pb-0.5"
            >
              This product has variants, like sizes or colors
            </label>
          </div>
          <input
            id="hasVariants"
            name="hasVariants"
            type="checkbox"
            className="h-5 w-5 rounded ml-8"
            onChange={(e) =>
              setProductData({
                ...productData,
                hasVariants: e.target.checked,
              })
            }
            data-test="form-product-has-variants"
          />
        </div>
        <div
          className={
            productData.hasVariants
              ? 'animate-grow-in animate-fade-in pt-3'
              : 'h-3 opacity-0 invisible'
          }
        >
          <TextInput
            productData={productData}
            setProductData={setProductData}
            label="Product options (separated by comma)"
            dataKey="productAvailVars"
            placeholder="Colors, sizes"
            error={error}
            required={false}
            dataTest="form-product-avail-vars"
          />
        </div>
      </fieldset>
      <fieldset>
        <legend className="sr-only">Product marketing</legend>
        <TextInput
          productData={productData}
          setProductData={setProductData}
          label="Target audience interests (separated by comma)"
          dataKey="productTargetMarket"
          placeholder="Basketball, street culture"
          error={error}
          dataTest="form-product-target-market"
        />
      </fieldset>
      <fieldset>
        <legend className="sr-only">Artificial Intelligence Engine</legend>
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-700 pt-4 pb-0.5">
            Choose an AI engine
          </label>
          <select
            value={productData.aiEngine}
            className="border border-gray-300 px-2 py-1 rounded-md font-light"
            onChange={(e) =>
              setProductData({
                ...productData,
                aiEngine: e.target.value,
              })
            }
            data-test="form-product-ai-engine"
          >
            {optionsLoading ? (
              <option>Loading engines...</option>
            ) : (
              aiEngines.map((engine) => (
                <option
                  key={engine.id}
                  value={engine.id}
                  className="align-middle"
                >
                  {engine.id}{' '}
                  {engine.id.split('-')[1] === 'curie' && '(default)'}
                </option>
              ))
            )}
          </select>
        </div>
      </fieldset>
      <div className="mt-6">
        <button
          data-test="submit-form-button"
          className="w-full px-3 py-2 text-sm font-medium tracking-wider rounded shadow-sm text-white hover:bg-black bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 border border-transparent"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          {loading ? 'Generating...' : 'Generate description'}
        </button>
      </div>
    </form>
  );
}
