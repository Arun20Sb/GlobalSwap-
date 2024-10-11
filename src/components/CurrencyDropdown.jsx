/* eslint-disable react/prop-types */

const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  title = "",
}) => {
  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>

      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full border p-2 border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200"
        >
          {currencies?.map((curr) => (
            <option value={curr} key={curr}>
              {curr}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyDropdown;
