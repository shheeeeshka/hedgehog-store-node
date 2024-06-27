import typeService from "../services/typeService.js";

class TypeController {
    async addType(req, res, next) {
        try {
            const { name } = req.body;
            const typeData = await typeService.addType(name);
            return res.json(typeData);
        } catch (e) {
            next(e);
        }
    }

    async getAllTypes(req, res, next) {
        try {
            const types = await typeService.getAllTypes();
            return res.json(types);
        } catch (e) {
            next(e);
        }
    }

    async getOneType(req, res, next) {
        try {
            const id = req.params.id;
            const typeData = await typeService.getOneType(id);
            return res.json(typeData);
        } catch (e) {
            next(e);
        }
    }

    async removeOneType(req, res, next) {
        try {
            const id = req.params.id;
            const typeData = await typeService.removeOneType(id);
            return res.json(typeData);
        } catch (e) {
            next(e);
        }
    }
}

export default new TypeController();