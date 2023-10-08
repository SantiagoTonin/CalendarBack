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

export const deletePost = async (req, res) => {
  try {
    console.log(req.params)
    const resultPost = await post.findByPk(req.params.postId);
    if (!resultPost) {
      return res.status(500).json({
        message: "No se puede eliminar el post",
      });
    }
    await post.destroy({
      where: { postId: req.params.postId },
    });
    return res.status(200).json({
      message: "El post fue eliminado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
