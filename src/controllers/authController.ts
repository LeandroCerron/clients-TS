import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Roles';
import bcrypt from 'bcryptjs';

export const singup = async (req:any, res:any) => {
    const {name, email, password, roles} = req.body;
    const salt = bcrypt.genSaltSync(10);
    //Generate new user with encrypted password
    const user = new User({
        name, 
        email, 
        password: bcrypt.hashSync(password, salt)
    })
    //I check if 'roles' exist, if they exist assign them and if they do not exist I assign the role of 'user' by default.
    if(roles) {
        const foundRoles = await Role.find({name: {$in: roles}});
        user.roles = foundRoles.map(role => role._id);
    }else{
        const role = await Role.findOne({name:'user'});
        user.roles = [role._id];
    }
    //Save the new user and return the generated 'token' which expires in 24 hours.
    try {
        const savedUser = await user.save();
        
        const token = jwt.sign({id: savedUser._id}, config.SECRET, {
            expiresIn: 86400 //24 hours
        });
        res.json({token});
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req:any, res:any) => {
    //I search by mail if a user exist
    const userFound = await User.findOne({email: req.body.email}).populate('roles');

    if(!userFound) return res.json({message: 'No user found'});
    //I make a comparison between the entered password and the existing password.
    const matchPassword = await bcrypt.compareSync(req.body.password, userFound.password);

    if(!matchPassword) return res.status(401).json({token: null, message: 'Invalid password'});
    //if 'matchPassword' is true, generate and send the 'token'
    const token = jwt.sign({id: userFound._id}, config.SECRET, {expiresIn: 86400});

    res.json({token});
}