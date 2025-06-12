import SummaryWidget from "./SummaryWidget";

export default function OrderSummary({ orders }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <SummaryWidget counter={orders.length} color="yellow" text="Total order" />
        <SummaryWidget
          counter={orders.filter((order) => order.status === "pending").length}
          color="red"
          text="pending order"
        />
        <SummaryWidget
          counter={
            orders.filter((order) => order.status === "delivered").length
          }
          color="green"
          text="delivered order"
        />
      </div>
    </div>
  );
}