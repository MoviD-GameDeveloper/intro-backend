import { User } from "../models/user.model.js";

const registerUser = async (req,res) => {
    try{
        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({ message: "All fields are important" })
        }

        const exsisting = await User.findOne({ email: email.toLowerCase() })
        if(exsisting){
            return res.status(400).json({ message: "User are already exsists" })
        }

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({
            message: "User registered",
            user: {id: user.id, email: user.email, username: user.username}

        });
    }
    catch (error) {
        res.status(500).json({ message: "Iternal server error", error: error.message});
    }
}

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email: email.toLowerCase()
        });
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        })

        res.status(200).json({
            message: "User logged in",
            user: {
               id: user.id,
               email: user.email,
               username: user.username
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const logoutuser = async (req,res ) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({
            email
        });

        if(!user) return res.status(404).json({
            message: "User not found"
        });

        res.status(200).json({
            message: "Logout succesful"
        })
    } 
    catch (error) {
        res.status(500).json({
            message: "Iternal Server Error", error
        })
    }
}

export {
    registerUser,
    loginUser,
    logoutuser
}