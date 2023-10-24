
    
    import React, { useState } from 'react';
    import EmptyCartButton from './EmptyCartButton';
    import PurchaseButton from './PurchaseButton';
    
    export default function CartPage({
      cartItems,
      onClearCart,
      onNavigateToProducts,
      setPurchaseMessage,
      updateProductStock,
      products,
    }) {
      const [showMessage, setShowMessage] = useState(false);
      const [purchaseMessage, setLocalPurchaseMessage] = useState('');
    
      const handlePurchaseClick = () => {
        setLocalPurchaseMessage('Tack för ditt köp! Ditt köp har genomförts.');
        setShowMessage(true);
    
        setTimeout(() => {
          setShowMessage(false);
          setLocalPurchaseMessage('');
        }, 3000);
    
        onClearCart();
    
        
        cartItems.forEach(item => {
          const product = products.find(product => product.id === item.id);
          if (product) {
            updateProductStock(item.id, product.stock - item.quantity);
          }
        });
      };
    
      const handleEmptyCartClick = () => {
        onClearCart();
        setLocalPurchaseMessage('Cart has been emptied.');
        setShowMessage(true);
    
        setTimeout(() => {
          setShowMessage(false);
          setLocalPurchaseMessage('');
        }, 3000);
      };
    
      return (
        <div className="cart-summary">
          {cartItems.length > 0 ? (
            <div>
              <h3>Total Price: ${calculateTotalPrice(cartItems, products)}</h3>
              <PurchaseButton onClick={handlePurchaseClick} purchaseMessage="" />
              <EmptyCartButton onEmptyCart={handleEmptyCartClick} />
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
          <button onClick={onNavigateToProducts}>Back to Products</button>
          {showMessage && <p>{purchaseMessage}</p>}
        </div>
      );
    }
    
    function calculateTotalPrice(cartItems, products) {
      let totalPrice = 0;
    
      cartItems.forEach(item => {
        const product = products.find(product => product.id === item.id);
        if (product) {
          totalPrice += product.price * item.quantity;
        }
      });
    
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      });
    
      return (totalPrice);
    }
    