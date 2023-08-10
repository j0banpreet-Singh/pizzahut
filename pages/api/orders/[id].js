import Order from "../../../models/Order";
import dbConnect from "../../../utils/mongo";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      const orders = await Order.findById(id);
      res.status(201).json(orders);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "PUT") {
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default handler;
