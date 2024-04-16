import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPass] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleSubmit = async (e) => {
    let result = await fetch("http://dash-board-api-one.vercel.app/signup", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.token));

    navigate("/");
  };

  return (
    <>
      <div className="formm">
        <h2 className="reg">REGISTER</h2>
        <div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              name
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
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              value={email}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              class="form-control"
              id="exampleInputPassword1"
              onChange={(event) => setPass(event.target.value)}
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary"
            onClick={() => handleSubmit()}
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}
