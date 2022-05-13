export default function TextInput({
  productData,
  setProductData,
  dataKey,
  label,
  placeholder,
  error,
  required = true,
  dataTest,
}) {
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={dataKey}
        className="text-xs font-normal text-gray-700 pt-2 pb-0.5"
      >
        {label}
        {required && error && productData[dataKey].length < 1 && (
          <span data-test="asterisk-error" className="text-red-500">
            *
          </span>
        )}
      </label>
      <input
        data-test={dataTest}
        name={dataKey}
        id={dataKey}
        type="text"
        placeholder={placeholder}
        onChange={(e) =>
          setProductData({
            ...productData,
            [dataKey]: e.target.value,
          })
        }
        className="border border-gray-300 pl-2 pr-10 py-1 rounded-md font-light"
      />
    </div>
  );
}
