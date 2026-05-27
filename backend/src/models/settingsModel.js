import mongoose from "mongoose"

const SettingsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }, 
    theme: {
        type: String, 
        enum: ["light", "dark", "system"],
        default: 'system'
    },
 
    reminderEnabled: {
            type: Boolean,
            default: true,
    },
    reminderTime: {
        type: String,
        default: "08:00 PM",
    },
},
    {timestamps: true,}
)
 
const Settings = mongoose.model('Settings', SettingsSchema);
export default Settings;