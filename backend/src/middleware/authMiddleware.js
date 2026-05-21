import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token){
        return res.status(401).json({message: "Not authorized, no token"});
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user to request (minus password) so controllers can use it
        req.user = await User.findById(decode.userId).select('-password');
        next();
    } catch (error) {
        res.status(401).json({message: 'Not authorized, invalid token'})
    }
};

export default protect;