import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';


// POST /api/auth/signup

export const signup = async (req, res) =>{

    const { firstName, lastName, email, password } = req.body;
    const userExists = await User.findOne({email});
    if (userExists){
        return res.status(400).json({message: 'User already exists'});
    }

    const user = await User.create({firstName, lastName, email, password});
    // .create() trigger the pre('save') hook

    generateToken(res, user._id);
    res.status(201).json({
        _id:user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,

    });
};

// POST /api/auth/login

export const login = async(req, res) =>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))){

        generateToken(res, user._id);
        res.json({
            _id:user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        });
    }
    else {
        res.status(401).json({message: 'Invalid email or password'})
    }
};

// POST /api/auth/logout
export const logout = (req, res) => {
    res.cookie('jwt', '', {httpOnly: true, expires: new Date(0)});
    res.json({message: 'Logged out successfully'})
}

// put /api/auth/change-password
export const changePassword = async (res, req) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!(await user.matchPassword({oldPassword}))){
        return res.status(401).json({message: 'Old password is incorrect'});
    }

    user.password = newPassword; //pre(save) will hash it
    await user.save();

    res.json({message: 'Password changed successfully'})
};