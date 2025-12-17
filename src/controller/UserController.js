const userSchema = require('../models/UserModel')
const tokenUtil = require('../util/TokenUser')
const password = require('../util/PasswordEncrypt')
const Mail = require('../util/Email')
const multer = require("multer");
const cloudinaryUpload = require("./CloudinaryUtil")

const validateUserInput = (req, res, next) => {
    const { email, password, fullname, mobileNo } = req.body;
    if (!email || !password || !fullname || !mobileNo) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields'
        });
    }
    next();
};

// Add error handling wrapper
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

const getUsers = async (req, res) => {
    const allUsers = await userSchema.find()
    res.status(200).json({
        data: allUsers,
        message: "All users Fetched Successfully"
    })
}

const addUser = async (req, res) => {
    const hashedPassword = await password.hashedpassword(req.body.password);
    const newUser = {
        fullname: req.body.fullname,
        mobileNo: req.body.mobileNo,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    }
    const user = await userSchema.create(newUser)
    await Mail.sendingmail(user.email, "Login Acknowledge", "Welcome To RealNest")
    if (user) {
        const token = tokenUtil.generateToken(user.toObject())
        res.status(201).json({
            data: user,
            token: token,
            message: "User added Successfully"
        })
    }
    else {
        res.status(404).json({
            message: "User not added Successfully"
        })
    }
}


const deleteUser = async (req, res) => {
    const id = req.params.id;
    const removeUser = await userSchema.findByIdAndDelete(id)
    if (removeUser) {
        res.status(200).json({
            data: removeUser,
            message: 'User Deleted Successfully'
        })
    }
    else {
        res.status(404).json({
            message: 'No such User found'
        })
    }
}
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Remove _id and password from update data to prevent issues
        const { _id, password, ...updateData } = req.body;
        
        const updatedUser = await userSchema.findByIdAndUpdate(
            id, 
            updateData,
            { new: true } // This returns the updated document
        );
        
        if (updatedUser) {
            res.status(201).json({
                data: updatedUser,
                message: "User Updated Successfully"
            });
        } else {
            res.status(404).json({
                message: "No Such User Found"
            });
        }
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({
            message: "Error updating user",
            error: error.message
        });
    }
}

const getSingleUser = async (req, res) => {

    const id = req.body.id;
    const user = await userSchema.findById(req.params.id);
    if (user) {
        res.status(200).json({
            data: user,
            message: "user Fetched Successfully"
        })
    }
    else {
        res.status(404).json({
            data: user,
            message: "user not Fetched Successfully"
        })
    }
}
const storage = multer.diskStorage({
    destination: "./upload/",
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/txt") {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    }
}).single("makaanFile");

const uploadFile = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                console.log('if...', err);
                res.status(500).json({
                    message: "File Upload Failed"
                })
            }
            else {
                if (req.file !== undefined) {
                    const fileFetched = await cloudinaryUpload.uploadimg(req.file)
                    res.status(200).json({
                        file: req.file.originalname,
                        cloudinaryData: fileFetched,
                        message: "File Uploaded Successfully",
                    })
                }

            }
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "File Upload Failed"
        })
    }
}

const loginUser = async (req, res) => {

    const email = req.body.email
    const pass = req.body.password
    const userEmail = await userSchema.findOne({ email: email })
    if (userEmail) {
        const isMatch = await password.comparepassword(pass, userEmail.password)
        if (isMatch) {
            res.status(200).json({
                user: userEmail,
                message: "Login Successfull",
            })
        }
        else {
            res.status(400).json({
                message: "Incorrect Password"
            })
        }
    } else {
        res.status(400).json({
            user: userEmail,
            message: "User Not Found"
        })
    }

}
module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    getSingleUser,
    uploadFile,
    loginUser,
    validateUserInput
}