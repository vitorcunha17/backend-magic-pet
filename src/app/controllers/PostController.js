import { Op } from 'sequelize';
import moment from 'moment';
import Post from '../models/Post';
import File from '../models/File';
import User from '../models/User';

class PostController {
  async index(req, res) {
    const { start, end } = req.query;
    if (start && end) {
      const posts = await Post.findAll({
        where: {
          createdAt: {
            [Op.and]: {
              [Op.gte]: moment(start)
                .subtract(1, 'day')
                .format('YYYY-MM-DD'),
              [Op.lte]: moment(end).format('YYYY-MM-DD'),
            },
          },
        },
        include: [
          { model: File },
          {
            model: User,
            as: 'user',
            attributes: ['name', 'avatar_user'],
            include: [{ model: File, as: 'avatar' }],
          },
        ],
        order: ['createdAt'],
      });

      return res.json({ posts });
    }
    let posts = await Post.findAll({
      include: [
        { model: File },
        {
          model: User,
          as: 'user',
          attributes: ['name', 'avatar_user'],
          include: [{ model: File, as: 'avatar' }],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.json({ posts });
  }

  async show(req, res) {
    const { id } = req.params;

    const post = await Post.findByPk(id);

    return res.json({ post });
  }

  async store(req, res) {
    const { content } = req.body;

    if (req.file) {
      const { originalname: name, filename: path } = req.file;

      const file = await File.create({
        name,
        path,
      });

      const post = await Post.create({
        content,
        image: file.id,
        user_id: req.userId,
      });

      return res.json({ post });
    }

    const post = await Post.create({
      content,
      user_id: req.userId,
    });

    return res.json({ post });
  }

  async update(req, res) {
    const { id } = req.params;
    const { content } = req.body;

    if (req.file) {
      const { originalname: name, filename: path } = req.file;

      const file = await File.create({
        name,
        path,
      });

      const post = await Post.findByPk(id);

      if (req.userId !== post.user_id) {
        return res.status(401).json({ error: 'Not Permited' });
      }

      await post.update({
        content,
        image: file.id,
        user_id: req.userId,
      });

      await post.save();

      return res.json({ post });
    }

    const post = await Post.findByPk(id);

    if (req.userId !== post.user_id) {
      return res.status(401).json({ error: 'Not Permited' });
    }

    await post.update({
      content,
    });

    await post.save();

    return res.json({ post });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const post = await Post.findByPk(id);

    if (req.userId !== post.user_id) {
      return res.status(401).json({ error: 'Not Permited' });
    }

    await post.destroy();
    await post.save();

    return res.json({ post });
  }
}

export default new PostController();
