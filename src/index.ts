import { MusicController } from './controller/MusicController';
import  express, { Request, Response} from 'express'
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response)=>{
  res.send({message: "Pong!"})
})

const musicController = new MusicController()

app.get("/musics", musicController.getMusic)
app.post("/musics", musicController.postMusic)
app.put("/musics/:id", musicController.editMusic)