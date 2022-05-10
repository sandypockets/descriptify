export default function TextInput({
  productData,
  setProductData,
  dataKey,
  label,
  placeholder,
}) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={dataKey}
        className="text-sm font-medium text-gray-700 pt-2 pb-0.5"
      >
        {label}
      </label>
      <input
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
        className="border border-gray-300 px-2 py-1 rounded-md"
      />
    </div>
  );
}
