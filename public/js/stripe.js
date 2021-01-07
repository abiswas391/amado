/* eslint-disable */
const stripe = Stripe(
  'pk_test_51I5FJZCtuKUeQXDL3NJYaP9FvqB4UldpwHyUsWqsws7VrhWjKplLvB8yEsiYz36uNAx1iTPseCKfVv9wFqf9Cwfs00YXuyaJ9h'
);

const orderProduct = async (productId) => {
  try {
    // console.log(productId);
    // 1) Get the session from the server/API
    const session = await axios(`/api/v2/orders/checkout-session/${productId}`);
    // console.log(session);

    // 2) Create the checkout form + charge the credit card
    return stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    console.log(err.message);
  }
};

const orderBtn = document.getElementById('order-product');

if (orderBtn) {
  orderBtn.addEventListener('click', (e) => {
    // console.log('working');
    e.target.textContent = 'PROCESSING...';
    const { productid } = e.target.dataset;
    // console.log(productid);
    orderProduct(productid);
  });
}
