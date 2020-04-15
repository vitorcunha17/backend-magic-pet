import * as yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll();

    return res.json({ users });
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    return res.json({ user });
  }

  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      password: yup.string().required(),
      permission: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Invalid Arguments' });
    }

    const password = await bcrypt.hash(req.body.password, 6);

    const user = await User.create({
      ...req.body,
      password,
    });

    return res.json({ user });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    await user.destroy();
    await user.save();

    return res.json({ message: 'OK' });
  }
}

export default new UserController();
