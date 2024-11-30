const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { 
         type: String,
         required: true 
        },
    dueDate: { 
        type: Date, 
        required: true 
    },
    priority: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 
    },
    userId: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'User ', 
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);