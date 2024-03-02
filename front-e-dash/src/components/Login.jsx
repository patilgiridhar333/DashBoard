import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPass] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleSubmit = async () => {
    let result = await fetch("http://localhost:9000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    result = await result.json();

    if (result.token) {
      localStorage.setItem("user", JSON.stringify(result));
      localStorage.setItem("token", JSON.stringify(result.token));

      navigate("/");
    } else {
      alert("Enter Correct Details");
    }
  };
  return (
    <div>
      <div className="formm">
        <h2 className="reg">Login</h2>
        <div>
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
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
