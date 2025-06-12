import { useState } from "react";
import ChooseItems from "./ChooseItems";

export default function CreateOrder({
  items,
  onAddClick,
  total,
  onPlaceOrder,
}) {
  const [customerName, setCustomerName] = useState(null);
  const [error, setError] = useState({ inputError: null, itemError: null });
  const handleClick = () => {
    if (customerName && customerName.length > 0) {
      if (items.filter((item) => item.isAdded).length > 0) {
        onPlaceOrder(customerName);
        setError({ ...error, itemError: null, inputError: null });
        setCustomerName("")
      } else {
        setError({ ...error, itemError: "Please add one or many food item(s)." });
      }
    } else {
      setError({ ...error, inputError: "Please enter your name correctly." });
    }
  };
  return (
    <div className="bg-cardbg rounded-lg p-6 h-[calc(100vh_-_130px)]">
      <h2 className="text-xl font-bold mb-1">CREATE ORDER</h2>
      <p className="text-gray-400 text-sm mb-4">
        Accurately fulfill customer orders based on a precise understanding of
        their requirements.
      </p>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Customer Name</label>
        <input
          type="text"
          placeHolder="Are you anonymous? Enter space."
          className="w-full bg-gray-700 bg-opacity-50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          value={customerName}
          onChange={(e) => {
            setCustomerName(e.target.value);
            setError({ ...error, inputError: null });
          }}
        />
        {error?.inputError && (
          <span className="text-amber-400">{error.inputError}</span>
        )}
      </div>

      <ChooseItems items={items} onAddClick={onAddClick} />
      {error?.itemError && (
        <span className="text-amber-400 pb-3 block">{error.itemError}</span>
      )}
      <button
        className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
        onClick={handleClick}
      >
        Place Order (BDT
        {total})
      </button>
    </div>
  );
}
