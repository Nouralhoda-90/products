
import ProductSearch from './ProductSearch';
import SortProducts from './SortProducts';

export default function Navbar({ cartCount, onProductsClick, onCartClick, onSearch, onSort }) {
  

  const handleCartClick = () => {
    onCartClick(); // Handle cart click logic, e.g., navigate to the cart page
  };

  const handleProductsClick = () => {
    onProductsClick(); 
  };

  return (
    <div className="navbar">
      <ProductSearch onSearch={onSearch} hasSearchButton={true} />
      <SortProducts onSort={onSort} />
      <button onClick={handleProductsClick}>Products</button>
      <button onClick={handleCartClick}>Cart ({cartCount})</button>
    </div>
  );
}