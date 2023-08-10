import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";


const isProduction = process.env.NODE_ENV === "production";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const Order = ({orders}) => {
  const status = orders.status;
  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tr}>
                <td className={styles.id}>{orders._id}</td>
                <td className={styles.name}>{orders.customer}</td>
                <td className={styles.address}>{orders.address}</td>
                <td className={styles.price}>${orders.total}</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.row}>
            <div className={statusClass(0)}>
              <Image src="/img/paid.png" alt="" width={50} height={50} />
              <span>Payment</span>
              <Image
                src="/img/checked.png"
                className={styles.checkedIcon}
                alt=""
                width={20}
                height={20}
              />
            </div>
            <div className={statusClass(1)}>
              <Image src="/img/bake.png" alt="" width={50} height={50} />
              <span>Preparing</span>
              <Image
                src="/img/checked.png"
                className={styles.checkedIcon}
                alt=""
                width={20}
                height={20}
              />
            </div>
            <div className={statusClass(2)}>
              <Image src="/img/bike.png" alt="" width={50} height={50} />
              <span>On the way</span>
              <Image
                src="/img/checked.png"
                className={styles.checkedIcon}
                alt=""
                width={20}
                height={20}
              />
            </div>
            <div className={statusClass(3)}>
              <Image src="/img/delivered.png" alt="" width={50} height={50} />
              <span>Delieverd</span>
              <Image
                src="/img/checked.png"
                className={styles.checkedIcon}
                alt=""
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h1 className={styles.title}>CART TOTAL</h1>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Subtotal:</b>${orders.total}
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Discount:</b>$0.00
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Total:</b>${orders.total}
            </div>
            <button className={styles.button}>PAID</button>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async({params})=>{
  const req = await axios.get(`${serverUrl}/api/orders/${params.id}`)
  const data = req.data
  return{
    props:{
      orders:data
    }
  }
}
export default Order;
