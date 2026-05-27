import Settings from '../models/settingsModel.js';

//  GET api/settings
export const getSettings = async (req, res) => {
   try {
     const settings = await Settings.findOne({user: req.user._id});

    if (!settings){
        const newSettings = await Settings.create({user: req.user._id});
        return res.status(201).json({
        success: true,
        data: newSettings 
        })
    };
    res.status(200).json({
        success: true,
        data: settings
    })
   } catch (error) {
    console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal error'
        })
   }
};

// UPDATE SETTINGS
// PUT api/settings
export const updateSettings = async (req, res) => {
    try {
        
    const {theme, reminderEnabled, reminderTime} = req.body;

    const settings = await Settings.findOne({user: req.user._id, });
    if (!settings) return res.status(404).json({message: 'Settings not found'});
        Object.assign(settings, req.body)  // merge only the fields sent
        const updated = await settings.save();
     
        
        res.status(200).json({
            success: true,
            data: updated
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal error'
        })
    }
}