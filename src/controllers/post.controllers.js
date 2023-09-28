import { post } from "../models/post.js";

export const createPost = async (req, res) => {
  try {
    const { cellsId } = req.body;
    const result = await post.create({ cellsId: cellsId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
