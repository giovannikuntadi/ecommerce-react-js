import { Link } from 'react-router-dom';

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {string} image
 * @property {string} description
 */

/**
 * @typedef {Object} ProductCardProps
 * @property {Product} product
 */

/**
 * @param {ProductCardProps} props
 */
export function ProductCard({ product }) {
  return (
    <>
      <div className="product-card">
        <img src={product.image} alt={product.name} className="product-card-image" />
        <div className="product-card-content">
          <h3 className="product-card-name">{product.name}</h3>
          <p className="product-card-price">${product.price}</p>
          <div className="product-card-actions">
            <Link to="/" className="btn btn-secondary">
              View Details
            </Link>
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}
