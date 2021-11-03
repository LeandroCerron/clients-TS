import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';
import Role from '../models/Roles';

export const verifyToken = async (req:any, res:any, next:any) => {
    
    try {
        const token = req.headers["authorization"];//x-access-token
        
        if(!token) return res.json({message: "No token provided"});

        const decoded = Object(jwt.verify(token, config.SECRET));
        //decoded -> { id: '32231asd458sd2a3sd', iat: 321321321321, exp: 32231231231231 } this format

        req.userId = decoded.id;
        //Store the 'id' in req as 'userId'
        const user = await User.findById(req.userId, {password: 0});

        if(!user) return res.json({message: "No user found"});

        next();
        
    } catch (error) {
        res.json({message: "Unauthorized"});
    }
}

export const isModerator = async(req:any, res:any, next:any) => {
    console.log(req.userId)
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id:{$in: user.roles}});

    for(let i= 0; i < roles.length; i++) {
        if(roles[i].name === 'moderator'){
            next();
            return;
        }
    }
    return res.json({message: 'Require Moderator role'});
}

export const isAdmin = async(req:any, res:any, next:any) => {
    console.log('FROM IS ADMIN');
    const user = await User.findById(req.userId);
    if(!user) return res.json({message: 'User not found'});

    const roles = await Role.find();

    for(let i= 0; i < roles.length; i++) {
        if(roles[i].name === 'admin'){
            next();
            return;
        }
    }
    return res.json({message: 'Require Admin role'});
}