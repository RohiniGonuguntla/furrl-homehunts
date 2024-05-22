import React, { useState, useEffect } from 'react';
import ProductItem from '../ProductItem/ProductItem.js';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts(page, pageSize);
  }, [page,pageSize]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight && !loading) {
        if (page < totalPages) {
          setPage(prevPage => prevPage + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, totalPages, loading]);

  const fetchProducts = async (page, pageSize, filters = []) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.furrl.in/api/v2/listing/getListingProducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: {
            page,
            pageSize,
            filters,
            id: "#HomeHunts",
            entity: "vibe"
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // Append new products to existing list
      setProducts(prevProducts => [...prevProducts, ...data.data.getListingProducts.products]);
      setTotalPages(data.data.getListingProducts.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handler for category button clicks
  const handleCategoryClick = (categoryId) => {
    let filters = [];
    if (categoryId === 'all') {
      // Fetch all products without any filters
      setPage(1);
      setProducts([]); // Clear current products
      fetchProducts(1, pageSize);
    } else {
      // Fetch products based on category
      if (categoryId === 'apparel') {
        filters = [{ id: "921a91f5-e45a-4700-ba65-79dd9d5ba99a", type: "CATEGORY" }];
      } else if (categoryId === 'home') {
        filters = [{ id: "15857eef-1bb0-4e96-b89c-d83594efb835", type: "CATEGORY" }];
      } else if (categoryId === 'accessories') {
        filters = [{ id: "cad99555-71f7-4804-8c38-4edf328441d6", type: "CATEGORY" }];
      }
      setPage(1); // Reset page to 1 when switching categories
      setProducts([]); // Clear current products
      fetchProducts(1, pageSize, filters);
    }
  };

  return (
    <div>
      <div>
        <img src="https://cdn.furrl.in/vibes/VibeCard_HomeHunts.jpg" alt="VibeCard" className="vibe-card" />
      </div>
      <div className="category-buttons">
        <button onClick={() => handleCategoryClick('all')}>All</button>
        <button onClick={() => handleCategoryClick('apparel')}>Apparel</button>
        <button onClick={() => handleCategoryClick('home')}>Home</button>
        <button onClick={() => handleCategoryClick('accessories')}>Accessories</button>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default ProductList;
