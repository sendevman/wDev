const methods = {
    generalError: (err, res) => {
        const data = err.code ? undefined : err.message;
        const code = err.code || 500;
        return res.status(code).json({
            status: code,
            message: err.msg || "An error has ocurred, try again",
            data
        });
    },
    generalSuccess: (res, message, data) => {
        return res.status(201).json({
            status: 201,
            message,
            data
        });
    },
    initApp: async () => {
        try {
            const user = require('../models/user');
            const total = await user.getAll();
            if (total.length === 0) {
                user.create({
                    phone: '6622XXXXXX',
                    name: "Super Admin",
                    email: "admin@hypergolic.com",
                    type: 1,
                    password: '12345678'
                });
            }
        } catch (e) {
            console.log('catch error initApp :', e);
        }

    }
}

module.exports = methods;