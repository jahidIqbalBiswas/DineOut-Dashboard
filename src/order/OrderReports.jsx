import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import NoOrderFound from "./NoOrderFound";
export default function OrderReports({
  orders,
  onDeliver,
  onDelete,
  onFilter,
}) {
  const [statusFilter, setStatusFilter] = useState("all");
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Order Reports</h2>

        <div className="flex gap-4 items-center  mb-2">
          <label htmlFor="filterOption">
            <CiFilter className="text-2xl" />
          </label>

          <select
            onChange={(e) => {
              const value = e.target.value;
              setStatusFilter(value);
              onFilter(value);
            }}
            value={statusFilter}
            id="filterOption"
            className={`appearance-none 
            bg-zinc-900 text-white 
            border border-gray-600 
            rounded-md px-4 py-2 pr-10 
            focus:outline-none focus:ring-2 focus:ring-orange-500 
                transition-all duration-200 cursor-pointer 
            bg-[url("data:image/svg+xml,%3Csvg%20viewBox='0%200%2020%2020'%20fill='white'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M5.5%207l4.5%204.5L14.5%207'/%3E%3C/svg%3E")] 
            bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.5rem_1.5rem]`}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="deleted">Deleted</option>
          </select>
        </div>
      </div>
      <div className="bg-cardbg rounded-lg p-4">
        <div className="reports-container">
          <table className="min-w-full">
            <thead className="border-b border-gray-700">
              <tr className="text-left text-sm">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Customer Name</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.length > 0 ? orders.slice().reverse().map((order) => (
                <tr key={order.id} className="border-t border-gray-700">
                  <td className="py-3">{order.id}</td>
                  <td className="py-3">{order.name}</td>
                  <td className="py-3">{order.items?.length}</td>
                  <td className="py-3">{order.amount}</td>
                  <td className="py-3">
                    {
                      <span
                        className={`${
                          order.status === "delivered"
                            ? "text-green-500"
                            : order.status === "deleted"
                            ? "text-red-500"
                            : "text-amber-500"
                        } uppercase`}
                      >
                        {" "}
                        {order.status}
                      </span>
                    }
                  </td>
                  <td className="py-3">
                    {order.status !== "deleted" ? (
                      <button
                        className="bg-gray-800 hover:bg-red-600 text-xs px-3 py-1 rounded-full mr-1 transition-colors duration-300"
                        onClick={() => onDelete(order.id)}
                      >
                        Delete
                      </button>
                    ) : (
                      <RxCross1 className="text-red-500 stroke-1" />
                    )}

                    {order.status !== "delivered" &&
                      order.status !== "deleted" && (
                        <button
                          className="bg-gray-800 hover:bg-green-600 text-xs px-3 py-1 rounded-full transition-colors duration-300"
                          onClick={() => onDeliver(order.id)}
                        >
                          DELIVER
                        </button>
                      )}
                  </td>
                </tr>
              )): <NoOrderFound/>
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
