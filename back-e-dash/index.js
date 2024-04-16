const express = require("express");
require("./config");
const cors = require("cors");
const user = require("./user");
const Product = require("./product");
const Jwt = require("jsonwebtoken");

require("dotenv").config();
console.log("server started");
const app = express();

app.use(express.json());
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.post("/signup", async (req, resp) => {
  const users = new user(req.body);
  let result = await users.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign(
    { result },
    process.env.jwtKey,
    { expiresIn: "24h" },
    (err, token) => {
      if (err) {
        resp.send({});
      }
      resp.send({ result, token });
    }
  );
  //   resp.send(result);
});
app.post("/login", async (req, resp) => {
  if (req.body.email && req.body.password) {
    let result = await user.findOne(req.body).select("-password");
    if (result) {
      Jwt.sign(
        { result },
        process.env.jwtKey,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) {
            resp.send({});
          }
          resp.send({ result, token });
        }
      );
    } else {
      resp.send({});
    }
  } else {
    resp.send({});
  }
});

app.post("/add", midlleWare, async (req, resp) => {
  let data = new Product(req.body);
  let result = await data.save();
  resp.send(result);
});

app.put("/update/:id", midlleWare, async (req, resp) => {
  let result = await Product.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

app.get("/", midlleWare, async (req, resp) => {
  let result = await Product.find();
  resp.send(result);
});

app.delete("/delete/:id", midlleWare, async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/update/:id", midlleWare, async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  // result=await result.json();
  resp.send(result);
});

app.get("/search/:key", midlleWare, async (req, resp) => {
  let result = await Product.find({
    $or: [
      {
        name: { $regex: req.params.key },
      },
      {
        brand: { $regex: req.params.key },
      },
    ],
  });
  resp.send(result);
});

function midlleWare(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    // console.log(token);
    Jwt.verify(token, process.env.jwtKey, (err, valid) => {
      if (err) {
        resp.send({
          result: "please send valid authorization key in the header",
        });
      } else {
        next();
      }
    });
  } else {
    resp.send({ result: "please send authorization key in the header" });
  }
}

app.listen(process.env.PORT);
