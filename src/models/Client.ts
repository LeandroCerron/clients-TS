import { Schema, model } from 'mongoose';

const clientSchema = new Schema({
    name: {
        type: String,
        trim: true, 
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    telephone: {
        type: Number,
        trim: true,
        required: true
    }
},
{
    timestamps: true
});

export default model('Client', clientSchema);