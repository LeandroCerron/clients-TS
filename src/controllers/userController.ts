import User from'../models/User';
import Role from'../models/Roles';

export const createUser = async(req:any,res:any) => {    
    const user = new User(req.body);
    const role = await Role.findOne({name:'user'});
    user.roles = [role._id];

    try {
        const newUser = await user.save();
        res.json(newUser);
    } catch (error) {
        console.log(error);
    }
}


export const getUsers = async(req:any,res:any,next:any) => {
    
    try {
        const roles = await Role.find();
        const users = await User.find();
        res.json([users, roles]);
    } catch (error) {
        console.log(error);
    }
}