import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const token = getCookie("token");
  const router = useRouter();
  const handleRoute = () => {
    router.push("/admin/login");
  };

  const handlecookie = () => {
    deleteCookie("token");
    router.reload();
  };
  console.log(quantity);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/mobile.png" alt="" width="42" height="42" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>+1 (437)-240-4086</div>
        </div>
      </div>

      <div className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem}>Homepage</li>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <Image src="/img/phut.png" alt="" width="72" height="67" />
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>

      <div className={`${styles.item} ${styles.heading}`}>Pizza Hut</div>

      <div className={styles.item}>
        {token ? (
          <button className={styles.button} onClick={handlecookie}>
            Logout
          </button>
        ) : (
          <button className={styles.button} onClick={handleRoute}>
            Login
          </button>
        )}
        <Link href={"/cart"}>
          <div className={styles.cart}>
            <Image src="/img/cart2.png" alt="" width="40" height="40" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
