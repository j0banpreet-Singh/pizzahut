import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetails from "../components/OrderDetails";
import Link from "next/link";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const router = useRouter();
  const dispatch = useDispatch();

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if (res.status === 201) {
        router.push(`/orders/${res.data._id}`);
        dispatch(reset());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {cart.products.length < 1 ? (
        <div className={styles.empty}>
          <h1>your cart is empty</h1>
          <Image
            src="/img/emoty.jpg"
            width={300}
            height={300}
            alt=""
            style={{ objectFit: "contain" }}
          />
          <Link href={"/"}>
            <button className={styles.emptyButton}>Try Our New Pizza's</button>
          </Link>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.left}>
            <table className={styles.table}>
              <thead className={styles.tHead}>
                <tr className={styles.trTitle}>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Extras</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((item) => (
                  <tr className={styles.tr} key={item._id}>
                    <td className={styles.td}>
                      <div className={styles.imgContainer}>
                        <Image
                          src={item.img}
                          fill
                          style={{ objectFit: "contain" }}
                          alt=""
                        />
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.name}>{item.title}</span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.extras}>
                        {item.extras.map((option) => (
                          <span key={option._id}>{option.text},</span>
                        ))}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.price}>${item.price}</span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.quantity}>{item.quantity}</span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.total}>
                        ${item.quantity * item.price}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.right}>
            <div className={styles.wrapper}>
              <h1 className={styles.title}>CART TOTAL</h1>
              <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
              </div>
              <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Discount:</b>$0.00
              </div>
              <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Total:</b>${cart.total}
              </div>

              {open ? (
                <div className={styles.paymentMethods}>
                  <button
                    className={styles.payButton}
                    onClick={() => setCash(true)}
                  >
                    CASH ON DELIEVERY
                  </button>
                </div>
              ) : (
                <button className={styles.button} onClick={() => setOpen(true)}>
                  CHECKOUT NOW!
                </button>
              )}
            </div>
          </div>
          {cash && (
            <OrderDetails
              total={cart.total}
              createOrder={createOrder}
              setCash={setCash}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
