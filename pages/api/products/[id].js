import Product from "../../../models/Product";
import dbConnect from "../../../utils/mongo";

export default async function handler(req, res) {
  const { query:{id}, method } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if(method === "PUT"){
    try {
        const product = await Product.findByIdAndUpdate(id,req.body,{
            new:true
        })

        res.status(201).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
  }

  if(method === "DELETE"){
    const{query:{id}} = req
    try {
        await Product.findByIdAndDelete(id);
        res.status(201).json("product deleted successfully")
    } catch (error) {
        res.status(500).json(error)
    }
  }
}
