import jwt from 'jsonwebtoken';

const generateToken = (res, userId) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.cookie('jwt', token,{
        httpOny:true,   // JS on the browser CANNOT read this cookie — blocks XSS only with http request
        secure: process.env.NODE_ENV != 'production',   // https only in production if true
        sameSite: 'strict', // Blocks cross-site request forgery (CSRF) 
        maxAge: 30 * 24 * 60 * 60 * 1000,    // 30 days in ms
    });
};

export default generateToken
