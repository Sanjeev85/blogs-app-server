import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getAllUser = async (req, res) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }
    if (!users) return res.status(404).json({ msg: 'no users found' });
    return res.status(200).json({ users: users });
};

export const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }
    if (existingUser) {
        // unauthorized status
        return res.status(400).json({ message: 'user already exist' });
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    });
    try {
        user.save();
    } catch (err) {
        console.log(err);
    }
    return res.status(201).json({ user });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(404).json({ msg: "email doesn't exist" });
    }

    const isPasswordCorrect = bcrypt.compareSync(
        password,
        existingUser.password
    );
    if (!isPasswordCorrect) {
        return res.status(400).json({ msg: 'incorrect password' });
    }
    return res.status(200).json({ msg: 'user loggedIn successfully' });
};
