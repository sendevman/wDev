const developer = require('../database/developer');

const model = {
    create: async data => {
        if (!data) throw { code: 400, msg: "Data is required" };
        if (!data.apiId) throw { code: 400, msg: "API ID is required" };
        
        //const existDeveloper = await developer.getByEmail(data.apiId);
        //if (existDeveloper) throw { code: 400, msg: "The developer already exists" };

        return await developer.create(data);
    },
    update: async data => {
        if (!data) throw { code: 400, msg: "Data is required" };
        if (!data.id) throw { code: 400, msg: "Id is required" };
        if (!data.apiId) throw { code: 400, msg: "API ID is required" };

        const existUser = await user.getById(data.id);
        if (!existUser) throw { code: 400, msg: "The user doesn't exists" };

        return await developer.update(data.id, data);
    },
    delete: async data => {
        if (!data) throw { code: 400, msg: "Params is empty" };
        if (!data._id) throw { code: 400, msg: "ID is required" };
        return await developer.delete(data._id);
    },
    getAll: async () => {
        return await developer.getAll();
    },
    getById: async data => {
        if (!data) throw { code: 400, msg: "Data is empty" };
        if (!data._id) throw { code: 400, msg: "ID is required" };
        return await developer.getById(data._id);
    },
    getByToken: async data => {
        if (!data) throw { code: 400, msg: "Data is empty" };
        if (!data.developer_id) throw { code: 400, msg: "Id is required" };
        return await developer.getById(data.developer_id);
    }
}

module.exports = model;