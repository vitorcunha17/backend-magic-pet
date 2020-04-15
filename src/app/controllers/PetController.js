import Pet from '../models/Pet';

class PetController {
    async store(req, res) {
        const pet = await Pet.create({ ...req.body, user_id: req.userId });
        return res.json({ pet });
    }

    async index(req, res) {
        const pets = await Pet.findAll({
            where: { user_id: req.userId },
        });

        return res.json({ pets });
    }
}
export default new PetController();