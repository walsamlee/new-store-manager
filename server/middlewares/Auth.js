
const Auth = {
    verifyAdmin(req, res, next) {
        const token = parseInt(req.headers.token, 10);

        if (token !== 1) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized to access route'
            })
        }

        next();
    },

    verifyAttendant(req, res, next) {
        const token = parseInt(req.headers.token, 10);

        if (token !== 0) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized to access route'
            })
        }

        next();
    }
};

module.exports = Auth;