import { useState } from "react";
import styles from "../../styles/Product.module.css";
import { useDispatch,useSelector } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import Image from "next/image";
import axios from "axios";

const Product = ({ pizza }) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
 
  const changePrice = (addOnprice) => {
    setPrice(price + addOnprice);
  };
  const test = useSelector(state=>state.cart)
  console.log(test)
  const handleSize = (index) => {
    const difference = pizza.prices[index] - pizza.prices[size];
    setSize(index);
    changePrice(difference);
  };

  const handleChange = (e, item) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(item.price);
      setExtras((prev) => [...prev, item]);
    } else {
      changePrice(-item.price);
      setExtras(extras.filter((option) => option._id != item._id));
    }
  };

  const handleClick = ()=>{
    dispatch(addProduct({...pizza,extras,price,quantity}))
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.imgContainer}>
            <Image
              src={pizza.img}
              alt=""
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div className={styles.right}>
          <h1 className={styles.title}>{pizza.title}</h1>
          <span className={styles.price}>${price}</span>
          <p className={styles.desc}>{pizza.desc}</p>
          <h3 className={styles.choose}>Choose the Sizes</h3>
          <div className={styles.sizes}>
            <div
              className={styles.size}
              onClick={() => {
                handleSize(0);
              }}
            >
              <Image
                src="/img/size.png"
                alt=""
                fill
                style={{ objectFit: "contain" }}
              />
              <span className={styles.number}>Small</span>
            </div>
            <div
              className={styles.size}
              onClick={() => {
                handleSize(1);
              }}
            >
              <Image
                src="/img/size.png"
                alt=""
                fill
                style={{ objectFit: "contain" }}
              />
              <span className={styles.number}>Medium</span>
            </div>
            <div
              className={styles.size}
              onClick={() => {
                handleSize(2);
              }}
            >
              <Image
                src="/img/size.png"
                alt=""
                fill
                style={{ objectFit: "contain" }}
              />
              <span className={styles.number}>Large</span>
            </div>
          </div>
          <h3 className={styles.choose}>Choose additional ingredients</h3>

          <div className={styles.ingredients}>
            {pizza.extraOptions.map((item) => (
              <div className={styles.option} key={item._id}>
                <input
                  type="checkbox"
                  name={pizza.text}
                  id={pizza.text}
                  className={styles.checkbox}
                  onChange={(e) => {
                    handleChange(e, item);
                  }}
                />
                <label htmlFor={pizza.text}>{item.text}</label>
              </div>
            ))}
          </div>
          <div className={styles.add}>
            <input
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
              defaultValue={1}
              className={styles.quantity}
            />
            <button className={styles.button} onClick={handleClick}>Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const product = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  return {
    props: {
      pizza: product.data,
    },
  };
}
export default Product;
