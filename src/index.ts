import app from './app';
import './database';

app.set('port', 4000);

app.listen( app.get('port'), () => {
    console.log('serevr running on port', app.get('port'));
})