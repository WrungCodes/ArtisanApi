import express from 'express';
import bodyParser from 'body-parser';
import { StatusResponse } from './helpers';
import { 
    auth,profile
 } from './routes'

const app = express();

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));

//Routes


 app.use('/user', auth);
 app.use('/user/profile', profile);

//Random Route
app.get('/', (req, res) => StatusResponse.success(res, {
    status: 200,
    data: {
        message: 'Welcome to Artisan'
    }
}));

app.get('/*', (req, res) => StatusResponse.notfound(res, {
    status: 404,
    data: {
        message: 'Endpoint does not exist'
    }
}));

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`)
})

export default app;