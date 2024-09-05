import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Load the selected category from localStorage if it exists
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      setSelectedCategory(savedCategory);
    }

    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        const sortedProducts = data.products.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setProducts(sortedProducts);

        const uniqueCategories = [...new Set(data.products.map((product) => product.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    localStorage.setItem('selectedCategory', category);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <section className="text-gray-600 body-font">
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="mx-6 my-3 px-5 py-3 border"
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={product.thumbnail}
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {product.category}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {product.title}
                </h2>
                <p className="mt-1">${product.price}</p>
                <Link to={`/ecommerce/${product.id}`}>
                  <button className="mt-4 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded">
                    View Product
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
