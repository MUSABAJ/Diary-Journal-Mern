import User from '../models/userModel.js';

// GET /api/users/me

export const getProfile = async (req, res) => {
  // req.user is already set by the protect middleware
  const {_id, firstName, lastName, email} = req.user;
  res.json({_id, firstName, lastName, email});

};

// Put /api/users/me
export const updateProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    console.log(req.body)
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    
    const updated = await user.save();

    res.json({
        _id:updated.id,
        firstName: updated.firstName,
        lastName: updated.lastName,
     });
}; 

