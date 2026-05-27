import Entry from '../models/entryModel.js';
import User from '../models/userModel.js';


//Get /api/dashboard
export const getStats = async (req, res) => { 

    try{
    //Total entries
    const totalEntry = await Entry.find({user: req.user._id}).countDocuments();
    // streak count
    const { streak } = await User.findById(req.user._id);
    // Recent Entry
    const recentEntries = await Entry.find({
            user: req.user._id,
        }).sort({ createdAt: -1 })
            .limit(5);

    const moodEntry = await Entry.find({user: req.user_id});

    if (moodEntry){
        const moodsCount = {
                happy: 0,
                sad: 0,
                angry: 0,
                anxious: 0,
                neutral: 0,
                calm: 0,
                
        }; 
        moodEntry.forEach(element => {
            if (element.mood === 'happy')
                moodsCount.happy+=1;
            else if(element.mood === 'angry')
                moodsCount.angry+=1;
            else if(element.mood === 'sad')
                moodsCount.sad+=1;
            else if(element.mood === 'anxious')
                moodsCount.anxious+=1;
            else if(element.mood === 'calm')
                moodsCount.calm+=1;
            else if(element.mood === 'excited')
                moodsCount.excited+=1;
            else
                moodsCount.neutral +=1;
        }); 
        let pivot= 0;
        let moodValue ;
        let commonMood='neutral';
        for (let i in moodsCount) {
            if (moodsCount[i] >= pivot){
                commonMood = i;
                pivot=moodsCount[i];
                moodValue = moodsCount[i];
            }
        }
        res.json ({
            commonMood: commonMood,
            moodValue: moodValue,
            streak: streak,
            totalEntry: totalEntry,
            recentEntries: recentEntries,
        })
    }
}
catch (error){
console.error(error);
res.status(500).json({
    success: false,
    message: 'Internal Error'
})
}
}