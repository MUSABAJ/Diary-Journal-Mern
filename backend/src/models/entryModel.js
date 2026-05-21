import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title:   { type: String, required: true, trim: true },
        content:   { type: String, required: true },
        mood:   { type: String, required: true},
        date:   { type: Date, required: true,},
    },
    {timestamps: true}
);

const Entry = mongoose.model('Entry', entrySchema);
export default Entry