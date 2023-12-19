import express from "express";
const router = express.Router()
import { changePasswordValidation, createValidation ,editProfileValidation,loginValidation,profilePhotoValidation} from "../middleware/userMiddleware.js";
import { allUser, changePassword, createUser, editProfile, editProfilePhoto, getSingleUser, getUser, login} from "../controllers/userController.js";
import { authentication,authorization, isAdmin } from "../middleware/auth.js";

//! For GET apis authentication is used and For PUT and POST authentication & Authorization is used



router.post("/create" ,createValidation,createUser)

router.post("/login",loginValidation ,login)

router.put("/editProfile/",editProfileValidation,authentication,authorization,editProfile)

router.put("/changePassword/",changePasswordValidation,authentication,authorization,changePassword)

router.put("/editProfilePhoto/",profilePhotoValidation,authentication,authorization,editProfilePhoto)

router.get("/",authentication,getUser)




//! (Only Admin)
router.get("/allUser",allUser)
router.get("/:id",isAdmin,getSingleUser)

export default router;