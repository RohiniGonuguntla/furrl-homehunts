import React from 'react';
import { Link } from 'react-router-dom'; 
import './ProductItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons'; 

const ProductItem = ({ product }) => {
    const firstImage = product.images.length > 0 ? product.images[0] : null;

    const handleShareClick = (e) => {
        e.preventDefault();
        alert('Product shared successfully!');
    };

    return (
        <div className="product-item">
            {firstImage && (
                <Link
                    to={`https://web.furrl.in/productDetail?id=${product.id}&ref=vibeResults_HomeHunts`}
                    className="product-detail-link"
                >
                    <div
                        className="product-image"
                        style={{
                            backgroundImage: `url(${firstImage.src})`,
                            backgroundSize: 'cover',
                            width: '100%',
                            height: '300px',
                            position: 'relative',
                        }}
                    >
                        <button
                            className="share-button"
                            onClick={handleShareClick}
                        >
                            <FontAwesomeIcon icon={faShare} />
                        </button>
                    </div>
                </Link>
            )}
            <div className="product-details">
                <p>{product.brand.map((b) => b.name).join(', ')}</p>
                <h2>{product.title}</h2>
                <div style={{
                            display : 'flex',
                            flexDirection : 'row',
                            gap: '3px'
                            }}>
                    <p>Rs: {product.price.value} </p>
                    <p style={{textDecoration:'line-through'}}>Rs: {product.MRP.value} </p>
                    <p> {product.discountPercent}%</p>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
