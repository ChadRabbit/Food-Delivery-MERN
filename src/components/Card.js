import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import 'bootstrap/dist/css/bootstrap.css';

export default function Card(props) {
  const dispatch = useDispatchCart();
  const cartData = useCart(); // Using useCart hook to access cart data
  const priceRef = useRef();
  const { name, id, options, imgSrc, p: foodItem, description } = props;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(""); // State to track selected size

  // Function to handle adding item to cart
  const handleAddToCart = async () => {
    // Ensure size is selected
    if (!size) {
      alert("Please select a size");
      return;
    }

    // Find the price based on the selected size
    const selectedOption = options.find(option => Object.keys(option).includes(size));
    const price = selectedOption?.[size];
    if (price) {
      await dispatch({
        type: "ADD",
        id: id,
        name: name,
        price: parseInt(price), // Ensure price is converted to integer
        qty: qty,
        size: size,
        description: description, // Add description to the dispatched item
      });
      console.log(cartData); // Log the cart data after dispatching
    }
  };

  // Effect to update final price when size or qty changes
  useEffect(() => {
    // Ensure size is not empty and options are available
    if (size && options.length > 0) {
      // Find the price based on the selected size
      const selectedOption = options.find(option => Object.keys(option).includes(size));
      const price = selectedOption?.[size];
      if (price) {
        let finalPrice = qty * parseInt(price);
        if (!isNaN(finalPrice)) {
          priceRef.current.textContent = `Rs ${finalPrice}/-`; // Update price display
        }
      }
    }
  }, [qty, size, options]);

  return (
    <div>
      <div className="card mt-10" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={imgSrc}
          className="card-img-top"
          alt="Food"
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <div className="container w-100 d-flex align-items-center">
            <select
              className="m-2 h-100 bg-success rounded"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value))}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">Select Size</option>
              {options.flatMap(option =>
                Object.entries(option).map(([size, price]) => (
                  <option key={size} value={size}>
                    {`${size} - Rs ${price}`}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <div className="fs-5" ref={priceRef}></div>
            <button
              className="btn btn-success justify-center ms-2"
              onClick={handleAddToCart}
              disabled={!size} // Disable button if size is not selected
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}