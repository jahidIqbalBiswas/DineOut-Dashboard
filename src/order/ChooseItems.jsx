import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
export default function ChooseItems({ items, onAddClick }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Choose Items</label>
      <div className="items-container">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-gray-700 bg-opacity-30 rounded-md p-3 mb-3 flex justify-between items-center hover:bg-opacity-40 transition-all duration-300"
          >
           
            <div className="flex items-center">
              <div className="w-12 h-12   flex items-center justify-center mr-3">
                <img src={item.img} alt="Hamburger" className="w-10 h-10" />
              </div>
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-xs text-gray-400">BDT {item.price}</p>
              </div>
            </div>
            <button
              className="w-8 h-8 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300"
              onClick={() => onAddClick(item.id)}
            >
              
              {item.isAdded ? (
                <FaMinus className="text-red-500" />
              ) : (
                <FaPlus className="text-green-500" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
