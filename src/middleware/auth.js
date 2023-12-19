import JWT from "jsonwebtoken";

//! For GET apis authentication is used and For PUT and POST Authorization is used

export const authentication = (req, res, next) => {
    try {
        let token = req.headers.authorization || req.headers.token;
        token = token.replace("Bearer ", "");
        let decode = JWT.verify(token, process.env.JWT);
        req.userDetails = decode;
        next();
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Authentication Failed`,
            error,
        });
    }
}
export const authorization = (req, res, next) => {
    try {
        // const {id}=req.params || req.body
       const id= req.userDetails._id
        let token = req.headers.authorization || req.headers.token;
        token = token.replace("Bearer ", "");
        let decode = JWT.verify(token, process.env.JWT);
        if(id===decode._id){
            next();
        }else{
            res.status(401).send({
                success:false,
                message:`You are not Authorized`
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Authorization Failed`,
            error,
        });
    }
}

export const isAdmin=(req,res,next)=>{
    res.status(200).send({
        success: true,
        message: `Under Development`,
      
    });
}