import React, { useState } from "react";
import styles from "../../styles/Admin.module.css";
import axios from "axios";
import Image from "next/image";

const index = ({ products, orders }) => {
  const [productList, setProductList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [count, setCount] = useState(1);
  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    try {
      const del = await axios.delete(
        `http://localhost:3000/api/products/${id}`
      );
      setProductList(productList.filter((item) => item._id != id));
      setCount(count + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (id) => {
    console.log(id);
    const req = await axios.get(`http://localhost:3000/api/orders/${id}`);
    const currentStatus = req.data.status;
    try {
      const orderUpdate = await axios.put(
        `http://localhost:3000/api/orders/${id}`,
        { status: currentStatus + 1 }
      );
      setOrderList([
        ...orderList.filter((item) => item._id != id),
        orderUpdate.data,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(orderList);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1>Products</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((item) => (
              <tr className={styles.tr} key={item._id}>
                <td className={styles.td}>
                  <div className={styles.imgContainer}>
                    <Image
                      src={item.img}
                      width={50}
                      height={50}
                      style={{ objectFit: "contain" }}
                      alt=""
                    />
                  </div>
                </td>
                <td className={styles.td}>{item._id.slice(0, 5)}</td>
                <td className={styles.td}>{item.title}</td>
                <td className={styles.td}>${item.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.item}>
        <h1>Orders</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Order Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((item) => (
              <tr key={item._id}>
                <td>{item._id.slice(0, 5)}</td>
                <td>{item.customer}</td>
                <td>{item.total}</td>
                <td>{item.method === 0 ? " Cash On Delievery" : "Paid"}</td>
                <td>
                  <button className={styles.buttonStatus}>
                    {status[item.status]}
                  </button>
                </td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleStatus(item._id)}
                  >
                    Next Stage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default index;
export const getServerSideProps = async (context) => {
  const mycookie = context.req?.cookies || "";
  console.log(mycookie.token);
  if (mycookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  const req = await axios.get("http://localhost:3000/api/products");
  const orderReq = await axios.get("http://localhost:3000/api/orders");
  const data = req.data;
  return {
    props: {
      products: data,
      orders: orderReq.data,
    },
  };
};
