// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';
// import { stripePromise } from '@/utils/stripe';

// const CheckoutButton = () => {
//   // Access cartItems from Redux store
//   const cartItems = useSelector((state: RootState) => state.cart.items);

//   // Function to handle checkout
//   const handleCheckout = async () => {
//     // Call backend to create checkout session
//     const res = await fetch("/api/stripe/create-checkout-session", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ items: cartItems }), // Send cartItems to backend
//     });

//     const data = await res.json();

//     // Redirect to Stripe Checkout
//     const stripe = await stripePromise;
//     stripe?.redirectToCheckout({ sessionId: data.id });
//   };

//   return (
//     <button onClick={handleCheckout} className="bg-blue-500 text-white px-6 py-3 rounded-md">
//       Proceed to Checkout
//     </button>
//   );
// };

// export default CheckoutButton;
