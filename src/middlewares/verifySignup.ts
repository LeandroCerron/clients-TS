import {ROLES} from '../models/Roles';
import User from '../models/User';

export const checkRolesExisted = (req:any, res:any, next:any)=>{
    if(req.body.roles){
        for(let i = 0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({message:`The ROLE ${req.body.roles[i]} sent does not exist`});
            }
        }
    }
    next();
}

export const checkDuplicateUser = async(req:any, res:any, next:any) => {
    const user = await User.findOne({name: req.body.name});

    if(user) return res.status(400).json({message:`The user already exists`});

    const email = await User.findOne({email: req.body.email});

    if(email) return res.status(400).json({message:`The email already exists`});

    next();

}