import mongoose from 'mongoose';
import config from './config'

mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABSE}`)
    .then(res => { console.log('DB connected')})
    .catch(err => {console.log(err)})