const express = require("express");
const dotenv = require('dotenv');
const db = require("../utils/db");
const { responseError } = require("../modules/response");

dotenv.config();

const router = express.Router();

router.post('/create', async (req, res) => {
    const { name, price, cost } = req.body;
    console.log(req.body)

    if (name == undefined || price == undefined || cost == undefined || name.trim() == "" || String(price).trim() == "" || String(cost).trim() == "") {
        return responseError(res, "All field is require!")
    }

    const newName = name.trim();
    const parsePrice = Number(price)
    const parseCost = Number(cost)

    if (!Number.isFinite(parsePrice) || !Number.isFinite(parseCost)) {
        return responseError(res, "price and cost need to be a number")
    }

    if (parsePrice < parseCost) {
        return responseError(res, "Price can't lower than cost!")
    }

    try {
        const [products] = await db.query(
            "SELECT * FROM products WHERE name = ?",
            [newName]
        )

        if (products.length > 0) {
            return responseError(res, "Product already exists!")
        }

        await db.query(
            "INSERT INTO products (name, price, cost) VALUES (?, ?, ?)",
            [newName, parsePrice, parseCost]
        )

        return res.json({ status: "ok", message: "Add product success!" });
    } catch (err) {
        console.log(err);
        return responseError(res, "Internal server error!")
    }
});

module.exports = router;