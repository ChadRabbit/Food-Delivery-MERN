import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  const handleRemove = (index) => {
    dispatch({ type: 'REMOVE', index: index });
  };

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem('userEmail');
    try {
      const response = await fetch('http://localhost:5000/api/auth/orderData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });
      if (response.ok) {
        dispatch({ type: 'DROP' });
        alert('Order placed successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to place order: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error while checking out:', error);
      alert('Error occurred while placing order');
    }
  };

  // Calculate total price taking quantity into consideration
  const totalPrice = data.reduce((total, food) => total + (food.price * food.qty), 0);

  if (data.length === 0) {
    return (
      <div className="m-5 w-100 text-center fs-3 text-dark">The Cart is Empty!</div>
    );
  }

  return (
    <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
      <table className="table table-hover">
        <thead className="text-success fs-4">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Option</th>
            <th scope="col">Amount</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{food.name}</td>
              <td>{food.qty}</td>
              <td>{food.size}</td>
              <td>{food.price * food.qty}</td> {/* Adjusted to multiply price by qty */}
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
      </div>
      <div>
        <button className="btn bg-success mt-5" onClick={handleCheckOut}>
          Check Out
        </button>
      </div>
    </div>
  );
}
