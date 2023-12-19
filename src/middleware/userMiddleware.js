import { userValidSchema ,loginValidSchema,editProfileValidSchema,changePasswordValidSchema,profilePhotoValidSchema} from "../validations/userValidation.js";

export const createValidation = async (req, res, next) => {
    try {
        const body = req.body
        await userValidSchema.validate(body)
        next()
        
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message,
            error:error.name
        });
    }
}

export const loginValidation = async (req, res, next) => {
    try {
        const body = req.body
        await loginValidSchema.validate(body)
        next()
        
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message,
            error:error.name
        });
    }
}

export const editProfileValidation = async (req, res, next) => {
    try {
        const body = req.body
        await editProfileValidSchema.validate(body)
        next()
        
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message,
            error:error.name
        });
    }
}
export const changePasswordValidation = async (req, res, next) => {
    try {
        const body = req.body
        await changePasswordValidSchema.validate(body)
        next()
        
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message,
            error:error.name
        });
    }
}
export const profilePhotoValidation = async (req, res, next) => {
    try {
        const body = req.body
        await profilePhotoValidSchema.validate(body)
        next()
        
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message,
            error:error.name
        });
    }
}
