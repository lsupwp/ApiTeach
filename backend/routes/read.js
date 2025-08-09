const express = require("express");
const dotenv = require('dotenv');
const db = require('../utils/db')
const { responseError } = require("../modules/response");

dotenv.config();

const router = express.Router();

router.get('/read', async (req, res) => {

  const { id } = req.query;

  try {

    if (id == undefined) {
      const [products] = await db.query(
        "SELECT * FROM products"
      )

      res.json({ status: "ok", message: "fetch data success", products: products })
    } else {
      const [product] = await db.query(
        "SELECT * FROM products WHERE id = ?",
        [id]
      )

      if (product.length == 0) {
        return responseError(res, "Not found product!");
      }

      return res.json({ status: "ok", message: "fetch product success", product: product[0] });
    }
  } catch (err) {
    console.log(err)
    return responseError(res, "Internal server error!")
  }
});

module.exports = router;
