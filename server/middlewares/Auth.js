import jwt from 'jsonwebtoken';

const Auth = {
    verifyToken(req, res, next) {
        const token = req.headers.token;
        
        jwt.verify(token, 'theadminisgreat', (err, decoded) => {
            if(err) {
                console.log(err);
                return res.json({
                    message: 'Invalid token'
                });
            }
            req.userData = decoded

            next();
          });
    },

    verifyAdmin(req, res, next) {
        const token = req.headers.token;

        jwt.verify(token, 'theadminisgreat', (err, decoded) => {
            if(err) {
                console.log(err);
                return res.json({
                    message: 'Invalid token'
                });
            }

            if(decoded) {
                if(decoded.previlledge !== 1) {
                    return res.status(401).json({
                        message: 'Unauthorized to access this route'
                    })
                }
            }
            req.userData = decoded

            next();
          });
    },

    verifyAttendant(req, res, next) {
        const token = req.headers.token;

        jwt.verify(token, 'theadminisgreat', (err, decoded) => {
            if(err) {
                console.log(err);
                return res.json({
                    message: 'Invalid token'
                });
            }

            if(decoded) {
                if(decoded.previlledge !== 0) {
                    return res.status(401).json({
                        message: 'Unauthorized to access this route'
                    })
                }
            }
            req.userData = decoded
            
            next();
          });
    }
};

module.exports = Auth;