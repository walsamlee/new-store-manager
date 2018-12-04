import jwt from 'jsonwebtoken';

const Auth = {
    verifyToken(req, res, next) {
        const token = req.headers.token;

        jwt.verify(token, 'theadminisgreat', (err, decoded) => {
            if(err) {
                return res.json({
                    message: 'Invalid token verification'
                });
            }
            req.userData = decoded
            res.status(200);

            next();
          });
    },

    verifyAdmin(req, res, next) {
        const token = req.headers.token;

        jwt.verify(token, 'theadminisgreat', (err, decoded) => {
            if(err) {
                console.log(err);
                return res.json({
                    message: 'Invalid token for admin'
                });
            }

            if(decoded) {
                if(decoded.previlledge !== 1) {
                    return res.json({
                        message: 'Unauthorized to access this route'
                    })
                }
            }
            req.userData = decoded
            res.status(200);
            next();
          });
    },

    verifyAttendant(req, res, next) {
        const token = req.headers.token;

        jwt.verify(token, 'theadminisgreat', (err, decoded) => {
            if(err) {
                console.log(err);
                return res.json({
                    message: 'Invalid token for attendant'
                });
            }

            if(decoded) {
                if(decoded.previlledge !== 0) {
                    return res.json({
                        message: 'Unauthorized to access this route'
                    })
                }
            }
            req.userData = decoded
            res.status(200);
            next();
          });
    }
};

module.exports = Auth;