import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    // createdAt: { type: Date, default: Date.now },
}, { timestamps: true })

const Note = mongoose.model('Note', NoteSchema)

export default Note