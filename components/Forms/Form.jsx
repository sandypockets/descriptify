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
    <form>
      <fieldset className="flex">
        <legend className="sr-only">Product basics</legend>
        <TextInput
          productData={productData}
          setProductData={setProductData}
          label="Product title"
          dataKey="productTitle"
          placeholder="Air Jordan 1 Mid"
          error={error}
        />
        <div className="px-1" />
        <TextInput
          productData={productData}
          setProductData={setProductData}
          label="Product type"
          dataKey="productType"
          placeholder="Sneakers"
          error={error}
        />
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
          <TextInput
            productData={productData}
            setProductData={setProductData}
            label="Product options (separated by comma)"
            dataKey="productAvailVars"
            placeholder="Colors, sizes"
            error={error}
            required={false}
          />
        </div>
      </fieldset>
      <fieldset>
        <legend className="sr-only">Product marketing</legend>
        <TextInput
          productData={productData}
          setProductData={setProductData}
          label="Audience interests (separated by comma)"
          dataKey="productTargetMarket"
          placeholder="Basketball, street culture"
          error={error}
        />
      </fieldset>
      <fieldset>
        <legend className="sr-only">Artificial Intelligence Engine</legend>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 pt-2 pb-0.5">
            Choose an AI engine
          </label>
          <select
            value={productData.aiEngine}
            className="border border-gray-300 px-2 py-1 rounded-md"
            onChange={(e) =>
              setProductData({
                ...productData,
                aiEngine: e.target.value,
              })
            }
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
                  {engine.id.split('-')[1] === 'curie' && '- default'}
                </option>
              ))
            )}
          </select>
        </div>
      </fieldset>
      <div className="mt-2">
        <button
          className="w-full px-3 py-2 text-xs font-medium rounded shadow-sm text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 border border-transparent"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          {loading ? 'Generating...' : 'Generate description'}
        </button>
      </div>
    </form>
  );
}