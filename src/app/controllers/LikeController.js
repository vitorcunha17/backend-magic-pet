import Like from '../models/Like';

class LikeController {
  async show(req, res) {
    const likes = await Like.findAndCountAll({
      where: {
        post_id: req.params.id,
      },
    });

    return res.json({ likes, userId: req.userId });
  }

  async store(req, res) {
    const { postId } = req.params;

    const vefiryLike = await Like.findOne({
      where: {
        user_id: req.userId,
      },
    });

    if (vefiryLike) {
      return res.json({ error: 'Not Permited, Liked Post' });
    }

    const like = await Like.create({
      post_id: postId,
      user_id: req.userId,
    });

    return res.json({ like });
  }

  async destroy(req, res) {
    const { postId } = req.params;

    const like = await Like.findOne({
      where: {
        post_id: postId,
        user_id: req.userId,
      },
    });

    await like.destroy();
    await like.save();

    return res.json({ like });
  }
}

export default new LikeController();
