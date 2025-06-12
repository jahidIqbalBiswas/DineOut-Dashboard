import { useState } from "react";
import biryani from "./assets/biryani.svg";
import chicken from "./assets/chicken.svg";
import hamburger from "./assets/hamburger.svg";
import pizza from "./assets/pizza.svg";
import submarine from "./assets/submarine.svg";
import Header from "./Header";
import CreateOrder from "./order/CreateOrder";
import OrderDetails from "./order/OrderDetails";
//----------------------------------------------------------
export default function App() {
  //--------------------------------------------------------
  const foodItems = [
    {
      id: crypto.randomUUID(),
      name: "Hamburger",
      price: 400,
      img: hamburger,
      isAdded: false,
    },
    {
      id: crypto.randomUUID(),
      name: "Chicken Nuggets",
      price: 330,
      img: chicken,
      isAdded: false,
    },
    {
      id: crypto.randomUUID(),
      name: "Submarine Sandwich",
      price: 500,
      img: submarine,
      isAdded: false,
    },
    {
      id: crypto.randomUUID(),
      name: "Pizza slices",
      price: 399,
      img: pizza,
      isAdded: false,
    },
    {
      id: crypto.randomUUID(),
      name: "Kacci biryani",
      price: 590,
      img: biryani,
      isAdded: false,
    },
  ];
  //--------------------------------------------------------
  const [items, setItems] = useState(foodItems);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  //--------------------------------------------------------
  function handleAdd(id) {
    const nextItems = items.map((item) => {
      if (id === item.id) {
        return { ...item, isAdded: !item.isAdded };
      } else {
        return item;
      }
    });
    setItems(nextItems);
  }
  //--------------------------------------------------------
  const total = items
    .filter((item) => item.isAdded)
    .reduce((acc, item) => acc + item.price, 0);
  //--------------------------------------------------------
  function handleCreateOrder(customerName) {
    const newOrder = {
      id: orders.length > 0 ? orders[orders.length - 1].id + 1 : 1,
      name: customerName,
      items: items.filter((item) => item.isAdded),
      amount: total,
      status: "pending",
    };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
    setItems(
      items.map((item) => {
        return { ...item, isAdded: false };
      })
    );
  }
  //--------------------------------------------------------
  const handleDeliverOrder = (id) => {
    const updateStatus = orders.map((order) =>
      order.id === id && order.status === "pending" ? { ...order, status: "delivered" } : order
    );
    setOrders(updateStatus);
    setFilteredOrders(updateStatus);
  };
  //--------------------------------------------------------
  const handleDelete = (id) => {
    const afterDelete = orders.filter((order) => order.id !== id);
    window.confirm("Are you sure to delete this order?") &&
      setFilteredOrders(afterDelete);
    setOrders(
      orders.map((order) => {
        if(order.id === id){
          return {...order, status: "deleted"}
        }else{
          return order
        }
      })
    );
  };
  //--------------------------------------------------------
  const handleFilterOrder = (filterValue) => {
    const filterMatchCase =
      filterValue === "all"
        ? orders
        : orders.filter((order) => order.status === filterValue);
    setFilteredOrders(filterMatchCase);
  };
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 flex-grow">
        <CreateOrder
          items={items}
          onAddClick={handleAdd}
          total={total}
          onPlaceOrder={handleCreateOrder}
        />
        <OrderDetails
          orders={filteredOrders}
          onDeliver={handleDeliverOrder}
          onDelete={handleDelete}
          ordersForSummary={orders}
          onFilter={handleFilterOrder}
        />
      </div>
    </>
  );
}
