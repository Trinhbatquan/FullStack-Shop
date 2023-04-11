const express = require('express');
const productRoutes = express.Router();
const Product = require('../Model/ProductModel')
const checkingToken = require('../MiddleWare/checkingToken')


//get al products use pagination and query word
productRoutes.get("/", async (req, res) => {
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;


    const count = await Product.countDocuments();
    const products = await Product.find({}).limit(pageSize).skip(pageSize * (page - 1)).sort({_id: -1})
    if (products) {
        res.status(200).send({products, page, pages: Math.ceil(count / pageSize)});
    } else {
        res.status(404).send("Not Found");
    }
} )


productRoutes.get("/:id", async (req, res) => {
    const data = await Product.findById({
        _id : req.params.id
    });
    if (data) {
        res.status(200).send(data);
    } else {
        res.status(404).send("Not Found");
    }
} )



//add review to product
productRoutes.post("/:id/review", checkingToken, async (req, res) => {


    const {rating, comment} = req.body;

    const product = await Product.findById({
        _id : req.params.id
    });
    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        )
        //find la ham cua Array, khong phai cua mongooose
        if (alreadyReviewed) {
            res.status(400).send({mess: "Product already Reviewed"})
        } else {
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id
            }
            product.reviews.push(review)
            product.numReviews = product.reviews.length
            product.rating = product.reviews.reduce((acc, item) => 
            acc + item.rating, 0) / product.reviews.length;

            await product.save()
            res.status(200).send({mess: "Add Review Successfully"})
        }
    } else {
        res.status(404).send("Not Found");
    }
} )


module.exports = productRoutes;