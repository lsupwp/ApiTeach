const express = require("express");
const dotenv = require('dotenv');
const db = require("../utils/db");
const { responseError } = require("../modules/response");

dotenv.config();

const router = express.Router();

router.post('/update', async (req, res)=>{
    const { id, name, price, cost } = req.body;

    if (id == undefined || name == undefined || price == undefined || cost == undefined || name.trim() == "" || String(id).trim() == "" || String(price).trim() == "" || String(cost).trim() == "") {
        return responseError(res, "All field is require!")
    }

    const newName = name.trim();
    const parsePrice = Number(price)
    const parseCost = Number(cost)

    if (!Number.isFinite(parsePrice) || !Number.isFinite(parseCost)) {
        return responseError(res, "price and cost need to be a number")
    }

    if (parsePrice <= parseCost) {
        return responseError(res, "Price can't lower than cost!")
    }

    try {
        const [product] = await db.query("SELECT * FROM products WHERE id = ?", [id])

        if (product.length == 0) {
            return responseError(res, "Not found product!");
        }

        if(product[0].price == parsePrice || product[0].cost == parseCost || product[0].name == newName) {
            return responseError(res, "No changes!");
        }

        await db.query("UPDATE products SET name = ?, price = ?, cost = ? WHERE id = ?", [newName, parsePrice, parseCost, id])
        
        return res.json({ status: "ok", message: "update product success" });
    } catch (err) {
        console.log(err)
        return responseError(res, "Internal server error!")
    }
});

module.exports = router;