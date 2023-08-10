import Order from "../../../models/Order";
import dbConnect from "../../../utils/mongo";

const handler = async (req, res) => {
  const { method } = req;
  await dbConnect();

  if(method === "GET"){
    try {
        const orders = await Order.find();
        res.status(201).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
  }

  if(method === "POST"){
    try {
        const order = await Order.create(req.body)
        res.status(201).json(order)
    } catch (error) {
      console.log("error",error)
        res.status(500).json(error)
    }
  }
};


export default handler