import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId
    }]
},
{
    timestamps: true
});

export default model('User', userSchema);