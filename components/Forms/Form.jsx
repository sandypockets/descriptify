import TextInput from './TextInput';
import {error} from 'next/dist/build/output/log';

export default function Form({
  productData,
  setProductData,
  handleSubmit,
  loading,
}) {
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
