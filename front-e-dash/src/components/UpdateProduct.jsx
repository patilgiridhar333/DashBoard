import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Add() {
  const [name, setName] = useState();
  const [brand, setBrand] = useState();
  const [price, setPrice] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleSubmit1(params.id);
  }, []);
  const handleSubmit1 = async (id) => {
    let result = await fetch(`https://dash-board-api-one.vercel.app/${id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();

    setName(result.name);
    setBrand(result.brand);
    setPrice(result.price);
  };
  const handleSubmit = async () => {
    let id = params.id;
    let result = await fetch(`https://dash-board-api-one.vercel.app/${id}`, {
      method: "put",
      body: JSON.stringify({ name, brand, price }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();

    navigate("/");
  };

  return (
    <>
      <div className="formm">
        <h2 className="reg">Update Product</h2>
        <div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              <b>New Name</b>
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

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              <b> Brand</b>
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

          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              <b> Price</b>
            </label>
            <input
              type="text"
              value={price}
              class="form-control"
              id="exampleInputPassword1"
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary"
            onClick={() => handleSubmit()}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
}
