import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import CartItem from './CartItem';
import CartPage from './CartPage'; 
import UseCart from './UseCart';
import '../css/style.css';
const apiUrl = 'http://localhost:3001/products';

export default function App() {
  const { cart, cartCount, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = UseCart([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState('products');
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('asc');

  useEffect(() => {
    fetch(apiUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase()); // Filter products by name based on search term
  });

  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    if (sortType === 'asc') {
      return a.price - b.price; // Sort in ascending order
    } else {
      return b.price - a.price; // Sort in descending order
    }
  });


  const updateProductStock = (productId, newStock) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, stock: newStock };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm); 
  };

  const handleSort = (sortType) => {
    setSortType(sortType); 
  };
  const handleProductsClick = () => {
    setCurrentPage('products');
    setSearchTerm(''); }

    
  return (
    <div>
      <Navbar cartCount={cartCount} onProductsClick={handleProductsClick} onCartClick={() => setCurrentPage('cart')} onSearch={handleSearch} onSort={handleSort} />
      {error && <div>Error: {error}</div>}
      {currentPage === 'products' && (
        <div className="products">
          {sortedProducts.map(product => (
            <div key={product.id} className="product">
              <h3>{product.name}</h3>
              <img className="product-image" src={product.image} alt={product.name} />
              <p>Price: {product.price} kr</p>
              <p>Stock: {product.stock}</p>
              {product.stock > 0 && <button onClick={() => addToCart(product)}>Add to Cart</button>}
            </div>
          ))}
        </div>
      )}
      {currentPage === 'cart' && (
        <div className="cart">
          {cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => increaseQuantity(item.id)}
              onDecrease={() => decreaseQuantity(item.id)}
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
          <CartPage
            cartItems={cart}
           
            onClearCart={clearCart}
            onNavigateToProducts={() => setCurrentPage('products')}
            setPurchaseMessage={setPurchaseMessage}
            updateProductStock={updateProductStock}
            products={products}
          />

          {purchaseMessage && <p>{purchaseMessage}</p>}
        </div>
      )}
    </div>
  );
}