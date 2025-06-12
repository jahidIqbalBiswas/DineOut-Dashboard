import OrderReports from "./OrderReports";
import OrderSummary from "./OrderSummary";

export default function OrderDetails({
  orders,
  onDeliver,
  onDelete,
  onFilter,
  ordersForSummary,
}) {
  return (
    <div className="md:col-span-2 h-[calc(100vh_-_130px)]">
      <OrderSummary orders={ordersForSummary} />
      <OrderReports
        orders={orders}
        onDeliver={onDeliver}
        onDelete={onDelete}
        onFilter={onFilter}
      />
    </div>
  );
}
