import express,{Request, Response} from 'express';
import cors from 'cors'
import { PORT } from './config';
import ConnectToMongo from './config/db';
import { UploadRouter } from './routes/upload.route';

const app = express()

app.use(express.json());
app.use(cors())

// ConnectToMongo()

app.use(UploadRouter)

app.get('/',(_:Request, res:Response)=>{
    res.status(200).json({"message":"server is running"})
})

app.listen(PORT, ()=>{
    console.log("App is running on port 8000")
})