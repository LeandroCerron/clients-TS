import Client from '../models/Client';

export const createClient = async (req:any, res:any, next:any) => {

    const client = new Client(req.body);
    try {
        const clientSaved = await client.save();
        res.json(clientSaved);
    } catch (error) {
        console.log(error);
        next();
    }
}

export const getClients = async (req:any, res:any, next:any) => {
    try {
        const clients =  await Client.find();
        res.json(clients);
    } catch (error) {
        console.log(error);
        next();
    }
}

export const getClientById = async (req:any, res:any, next:any) => {
    try {
        const client = await Client.findById(req.params.id);
        res.json(client);
    } catch (error) {
        console.log(error);
        next();
    }
}

export const updateClientById = async (req:any, res:any, next:any) => {
    try {
        const client = await Client.findOneAndUpdate({_id: req.params.id}, req.body,{
            new:true            
        })
        res.json(client);
    } catch (error) {
        console.log(error);
        next();
    }
}

export const deleteClientById = async (req:any, res:any, next:any) => {
    try {
        await Client.findOneAndDelete({_id: req.params.id});
        res.json('Client deleted successfully');
    } catch (error) {
        console.log(error);
        next();
    }
}