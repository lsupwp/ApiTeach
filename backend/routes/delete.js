const express = require("express");
const dotenv = require('dotenv');
const db = require("../utils/db");
const { responseError } = require("../modules/response");

dotenv.config();

const router = express.Router();

router.post('/delete', async (req, res)=>{
    const { id } = req.body;

    if (id == undefined || String(id).trim() == "") {
        return responseError(res, "All field is require!")
    }

    try {
        const [product] = await db.query("SELECT * FROM products WHERE id = ?", [id])

        if (product.length == 0) {
            return responseError(res, "Not found product!");
        }

        await db.query("DELETE FROM products WHERE id = ?", [id])

        return res.json({ status: "ok", message: "delete product success" });
    } catch (err) {
        console.log(err)
        return responseError(res, "Internal server error!")
    }
});

module.exports = router;