import React, { useState } from "react";

export default function Add() {
  const [name, setName] = useState();
  const [brand, setBrand] = useState();
  const [price, setPrice] = useState();
  const [err, setError] = useState(false);

  const handleSubmit = async () => {
    // console.log({ name, price, brand });
    if (!name || !brand || !price) {
      setError(true);
      return;
    }

    let userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userId);
    let result = await fetch("/add", {
      method: "post",
      body: JSON.stringify({ name, brand, price, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setBrand("");
    setName("");
    setPrice("");
    // console.log(result);
  };

  return (
    <>
      <div className="formm">
        <h2 className="reg">Add Product</h2>
        <div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              class="form-control"
              value={name}
              id="name"
              aria-describedby="emailHelp"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          {err && !name && <span className="invalid">required</span>}
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Brand <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              class="form-control"
              value={brand}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(event) => setBrand(event.target.value)}
            />
          </div>
          {err && !brand && <span className="invalid">required</span>}

          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Price <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              value={price}
              class="form-control"
              id="exampleInputPassword1"
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          {err && !price && <span className="invalid">required</span>}

          <button
            type="submit"
            class="btn btn-primary"
            onClick={() => handleSubmit()}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}
