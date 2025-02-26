import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    console.log("Received body:", req.body);
    const { fullName, email, password } = req.body;

    console.log("Debugging Types:");
    console.log("Full Name:", fullName, "Type:", typeof fullName);
    console.log("Email:", email, "Type:", typeof email);
    console.log("Password:", password, "Type:", typeof password);


    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        fullName: fullName, 
        email,
        password: hashedPassword,
        profilePic: "default.jpg",
    });

    await newUser.save();
    generateToken(newUser._id, res);

    res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
    });
};

export const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "Invalid Credentials user "});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        generateToken(user._id, res);
        res.status(200).json({
            _id:user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        return res.status(500).json({message: "Error"});
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message: "Logged Out"});
    } catch (error) {
        console.log("Error in login controller", error.message);
        return res.status(500).json({message: "Error"});
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Picture is required" });
        }

        // Upload image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        // Update user with new profile picture
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error in update controller", error);
        return res.status(500).json({ message: "Internal Error" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}
