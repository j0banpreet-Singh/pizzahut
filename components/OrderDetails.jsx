import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/OrderDetails.module.css";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

const OrderDetails = (props) => {
  console.log(window.google);
  const inputRef = useRef();
  const lib = ["places"];
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handlePlaceChange = () => {
    const [places] = inputRef.current.getPlaces();
    setAddress(places.formatted_address);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.createOrder({ customer, address, total: props.total, method: 0 });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span
          className={styles.cancel}
          onClick={() => {
            props.setCash(false);
          }}
        >
          X
        </span>
        {props.total !== 0 && (
          <h2>You will pay ${props.total} after Delievery</h2>
        )}
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="name" className={styles.label}>
            Full Name
          </label>
          <input
            type="text"
            className={styles.input}
            onChange={(e) => {
              setCustomer(e.target.value);
            }}
          />

          <label htmlFor="pnumber" className={styles.label}>
            Phone Number
          </label>
          <input type="text" className={styles.input} required />

          <label htmlFor="pnumber" className={styles.label}>
            Apt Number
          </label>
          <input type="text" className={styles.input} />

          <div className={styles.test}>
            <label htmlFor="location" className={styles.label}>
              Your Address
            </label>
            <LoadScript
              googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API}
              libraries={lib}
            >
              <StandaloneSearchBox
                onLoad={(ref) => (inputRef.current = ref)}
                onPlacesChanged={handlePlaceChange}
              >
                <input type="text" className={styles.input_main} />
              </StandaloneSearchBox>
            </LoadScript>
          </div>
          <button className={styles.button} type="submit">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderDetails;
