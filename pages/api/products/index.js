import dbConnect from "../../../utils/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method} = req;


  await dbConnect();

  if (method === "GET") {
    try {
     const products = await Product.find()
     res.status(201).send(products)
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const product = await Product.create(req.body);
      // await product.save()
      res.status(201).json(product);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  }
}