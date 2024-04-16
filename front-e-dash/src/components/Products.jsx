import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("https://dash-board-api-one.vercel.app/", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const handleDelete = async (id) => {
    let result = await fetch(`https://dash-board-api-one.vercel.app/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const handleSearch = async (text) => {
    if (text) {
      let result = await fetch(
        `https://dash-board-api-one.vercel.app/${text}`,
        {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      result = await result.json();
      if (result) setProducts(result);
    } else getProducts();
  };
  return (
    <div className="text-center list">
      <h2>Product List</h2>
      <input
        type="search"
        class="form-control search"
        placeholder="Search..."
        aria-label="Search"
        onChange={(e) => handleSearch(e.target.value)}
      ></input>
      <ul class="text-center" style={{ fontWeight: 500, margin: "10px 0 0 0" }}>
        <li class="col">Serial No.</li>
        <li class="col">Name</li>
        <li class="col">Brand</li>
        <li class="col">Price</li>
        <li class="col">Operations</li>
      </ul>
      {products.length > 0 ? (
        products.map((product, index) => (
          <ul class="text-center">
            <li class="col">{index + 1}</li>
            <li class="col">{product.name}</li>
            <li class="col">{product.brand}</li>
            <li class="col">${product.price}</li>
            <li class="col">
              <button
                type="button"
                class="btn upd btn-danger"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
              <Link to={`/update/${product._id}`}>
                <button type="button" class="btn upd mx-1 btn-success">
                  Update
                </button>
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <h2>No Match FOUND!!!</h2>
      )}
    </div>
  );
}
