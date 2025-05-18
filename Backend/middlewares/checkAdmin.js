

function checkAdmin(req,res,next){

    let user = req.user;
    if(!user.isAdmin){

        return res.status(403).json({
            message:"user must be admin",
        });

    }

    next();
    
}

module.exports = checkAdmin;