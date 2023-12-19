import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helper/userHelper.js";
import JWT from "jsonwebtoken"




//!Creating User -----------------------------------------
export const createUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: `Already registered Please login`,
            });
        }
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            email,
            password: hashedPassword,
        }).save();
        user.password = null
        res.status(201).send({
            success: true,
            message: `Account Created Successfully`,
            user
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: `Something went wrong while creating account`,
            error
        });
    }

}




//! Create Profile-----------------------------------
export const createProfile = async (req, res) => {
    try {
        const { id } = req.params
        const { name, username, bio, gender, city } = req.body

        const existingUsername = await userModel.findOne({ username });
        if (existingUsername) {
            return res.status(400).send({
                success: false,
                message: `username already exists`,
            });
        }
        let check = await userModel.findById(id);
        if (!check) {
            return res.status(404).send({
                success: false,
                message: `id not found`,
            });
        }
        // if (!check.otpVerified) {
        //     return res.status(404).send({
        //         success: false,
        //         message: `Account not Verified `,
        //     });
        // }
        let profilePhoto
        if (gender === 'male') {
            profilePhoto = "https://ik.imagekit.io/wish/profile_male_8ehYIB1Sn.png?updatedAt=1689059584233"
        } else {
            profilePhoto = "https://ik.imagekit.io/wish/profile_female_zmA3Pp9jk.png?updatedAt=1689059584204"
        }
        const user = await userModel.findByIdAndUpdate(id, {
            name,
            username,
            bio,
            gender,
            city,
            profilePhoto
        }, { new: true })
        user.password = null
        res.status(201).send({
            success: true,
            message: `Profile Created Successfully`,
            user
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: `Something went wrong while creating profile`,
            error
        });
    }

}

//!Login User-----------------------------------------

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: `user not found `,
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                message: `Password Incorrect`,
            });
        }
        const token = await JWT.sign({ _id: user._id }, process.env.JWT, {
            expiresIn: "30d",
        });
        res.status(200).send({
            success: true,
            message: `Login successfully`,
            user: {
                name: user.name,
                email: user.email,
                role:user.role
            },
            token,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Error while login`,
            error,
        });
    }
};


//!Edit Profile-----------------------------------

export const editProfile = async (req, res) => {
    try {
        // const { id } = req.params
        const id = req.userDetails._id

        const { name, username, gender, city, address, country,pinCode, email, phone, profilePhoto} = req.body
        //? name,phone,username are required
        let check = await userModel.findById(id);
        if (!check) {
            return res.status(404).send({
                success: false,
                message: `user not found`,
            });
        }

        const user = await userModel.findByIdAndUpdate(id, {
            name, username, gender, city, address, country,pinCode, email, phone, profilePhoto
        }, { new: true })
        user.password = null
        res.status(201).send({
            success: true,
            message: `Profile Updated Successfully`,
            user
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: `Something went wrong while updating profile`,
            error
        });
    }

}
//! Edit Profile Photo----------------------------

export const editProfilePhoto = async (req, res) => {
    try {
        // const { id } = req.params
        const id = req.userDetails._id
        const { profilePhoto } = req.body;
        let user = await userModel.findById(id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: `id not found`,
            });
        }
        const updated = await userModel.findByIdAndUpdate(id, {
            profilePhoto
        }, { new: true })
        updated.password = null
        res.status(201).send({
            success: true,
            message: `profile picture Updated Successfully`,
            profilePhoto: updated.profilePhoto
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: `Something went wrong while updating profile picture`,
            error
        })
    }
}

//! Get Single User------------------------------

export const getUser = async (req, res) => {
    try {
        // const { id } = req.params
        const id = req.userDetails._id

        let user = await userModel.findById(id);
        if(!user){
            return res.status(404).send({
                status:false,
                message:`User Not Found`
            })
        }

        user.password = null
        res.status(200).send({
            success: true,
            message: `Profile Fetched Successfully`,
            user
        });


    } catch (error) {
        return res.status(500).send({
            success: false,
            message: `Something went wrong while fetching profile`,
            error
        });
    }
}

//! Get Single User(admin)------------------------------

export const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params
        // const userId = req.userDetails._id

        let user = await userModel.findById(id);
        if(!user){
            return res.status(404).send({
                status:false,
                message:`User Not Found`
            })
        }

        user.password = null
        res.status(200).send({
            success: true,
            message: `Profile Fetched Successfully`,
            user
        });


    } catch (error) {
        return res.status(500).send({
            success: false,
            message: `Something went wrong while fetching profile`,
            error
        });
    }
}

//! Get All the Users(admin)------------------------------

export const allUser = async (req, res) => {
    try {
        let user = await userModel.find();
        user.password = null
        res.status(200).send({
            success: true,
            message: `All Profiles Fetched Successfully`,
            user
        });


    } catch (error) {
        return res.status(500).send({
            success: false,
            message: `Something went wrong while fetching profiles`,
            error
        });
    }
}

//! Change the Password------------------------------

export const changePassword = async (req, res) => {
    try {
        const id = req.userDetails._id
        // const { id } = req.params
        const { oldPassword, password } = req.body;

        let user = await userModel.findById(id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: `id not found`,
            });
        }
        const match = await comparePassword(oldPassword, user.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                message: `Old Password incorrect`,
            });
        }
        const hashedPassword = await hashPassword(password);
        const updated = await userModel.findByIdAndUpdate(id, {
            password: hashedPassword
        }, { new: true })
        updated.password = null
        res.status(201).send({
            success: true,
            message: `Password Updated Successfully`,
        });


    } catch (error) {
        return res.status(500).send({
            success: false,
            message: `Something went wrong while changing password`,
            error
        });
    }
}





