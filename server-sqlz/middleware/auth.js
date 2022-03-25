const jwt = require('jsonwebtoken')

// wants to like a post
// click the like button => auth middleware (NEXT) => like controller ...

const auth = async (req, res, next) => {
    try {
        // console.log(req.headers)
        let token;
        if (req && req.headers && req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }
        const isCustomAuth = token.length < 500;
        // if isCustomAuth it is our own, otherwise google auth

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, "test") // secretKey must be same as in Controllers/user

            req.userId = decodedData?.id;
        } else {
            // google token
            decodedData = jwt.decode(token)

            req.userId = decodedData?.sub;
        }

        next()
    } catch (e) {
        console.log(e)
    }
}

module.exports = auth
