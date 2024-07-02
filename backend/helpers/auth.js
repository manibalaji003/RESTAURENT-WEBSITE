const expressJwt = require('express-jwt')

const authJwt=()=>{
    const secret = process.env.JWT_SECRET;
    const api = process.env.API_URL;
    return  expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/api\/v1\/items(.*)/ , methods: ['GET', 'OPTIONS'] },
            `${api}/users/login`
        ]
    })
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}

module.exports.authJwt = authJwt; 