import Entry from "../models/entryModel.js";

// POST /api/entries

export const createEntry = async (req, res) => {
    const {title, content, mood, date} = req.body;
    const entry = await Entry.create({user: req.user._id, title, content, mood, date});
    res.status(201).json(entry);
};

// GET /api/entries
export const getEntries = async (req, res) => {

    const entries = await Entry.find({user: req.user._id}).sort({date: -1})
    res.json(entries)
};

// GET /api/entries/search?text=
export const searchEntries = async (req, res) => {
    const {text} = req.query;
    const entries = await Entry.find({
        user: req.user._id,
        $or:[
        {title: {$regex: text, $options: 'i'}},
        {content: {$regex: text, $options: 'i'}},
        ],
    }).sort({date:-1});
    res.json(entries);  
};

// GET /api/entries/:id
export const getEntry = async (req, res) =>{
    const entry = await Entry.findOne({_id: req.params.id, user:req.user._id});
    if (!entry) return res.status(404).json({message: 'Entry not found'});
    res.json(entry)
;}

// PATCH /api/entries/:id
export const updateEntry = async (req, res) => {
    const entry = await Entry.findOne({_id:req.params.id, user:req.user._id});
    if (!entry) return res.status(404).json({message: 'Entry not found'});

    Object.assign(entry, req.body)  // merge only the fields sent
    const updated = await entry.save();
    res.json(updated);
};

// DELETE /api/entries/:id
export const deleteEntry = async (req, res) => {
    const entry = await Entry.findOneAndDelete({_id:req.params.id, user:req.user._id});
    if (!entry) return res.status(404).json({message: 'Entry not found'});
    res.json({ message: 'Entry deleted'})
};