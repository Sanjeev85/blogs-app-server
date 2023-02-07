import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    blogs: [{ type: mongoose.Types.ObjectId, ref: 'blog', required: true }],
});
const User = mongoose.model('User', UserSchema);
export default User;
