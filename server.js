
import express from 'express'
import Produs from './dbProduse.js' 
import mongoose from 'mongoose';
import Pusher from 'pusher';
import cors from 'cors';
import User from './dbCredentials.js';

const app = express()



const pusher = new Pusher({
    appId: "1777850",
    key: "201af38afbea08fac47a",
    secret: "f7540cf10bc586b9df99",
    cluster: "eu",
    useTLS: true
  });
  



//app.use(cors())
                    
const conection_url='mongodb+srv://admin:bv3YYVtbN3zKEBxs@cluster0.v5cv1pp.mongodb.net/produse?retryWrites=true&w=majority&appName=Cluster0';

app.use(express.json());

app.use(cors());


mongoose.connect(conection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
  

  const db=mongoose.connection;
  db.once("open",()=>{
    console.log("DB connected");
    const produsCollection=db.collection
    ("produscontents");
    const changeStream=produsCollection.watch();
  
    changeStream.on('change',(change)=>{

        console.log("A fost schimbata",change);

        if(change.operationType === 'insert'){
          const messageDetails=change.fullDocument;
          pusher.trigger('produse','insertd',
          {
            id:messageDetails.id,
              title:messageDetails.title,
              marime:messageDetails.marime,
              descriere:messageDetails.descriere,
              image:messageDetails.image,
              price:messageDetails.price,
              rating:messageDetails.rating
          });
      }else {
        console.log('Eroare trigger Pusher')
      }


    });
  });

const port = process.env.PORT||9000;
app.get("/",(req,res)=>res.status(200).send("hello world"));
app.post('/produse/new', async (req, res) => {
    const dbMessage = req.body;
    
    try {
      const data = await Produs.create(dbMessage);
      res.status(201).send(data);
    } catch(err) {
      res.status(500).send(err);
    }
  });
  app.get('/produse/sync', async (req, res) => {
    try {
      const data = await Produs.find({});
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  app.post('/register', async (req, res) => {
    try {
      const { nume, parola } = req.body;
      
      // Verifică dacă există deja un utilizator cu acest nume
      const userExists = await User.findOne({ nume: nume });
      if (userExists) {
        return res.status(400).json({ message: 'Există deja un utilizator cu acest nume.' });
      }
  
      // Crearea unui nou utilizator
      const user = new User({
        nume,
        parolaHash: parola // parola va fi hash-uită în middleware-ul pre-save definit în schema
      });
  
      await user.save();
      res.status(201).json({ message: 'Utilizator creat cu succes.' });

    } catch (error) {
      console.error(error);
      res.status(500).json({message:'Eroare la crearea utilizatorului.'});
    }
  });
  app.post('/login', async (req, res) => {
    try {
      const { nume, parola } = req.body;
      
      // Găsește utilizatorul după nume
      const user = await User.findOne({ nume: nume });
      if (!user) {
        return res.status(400).send('Utilizatorul nu există.');
      }
  
      // Verifică parola
      const isMatch = await user.verifyPassword(parola);
      if (!isMatch) {
        return res.status(400).send('Parola incorectă.');
      }
  
      res.send('Autentificare cu succes.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Eroare la autentificare.');
    }
  });
  
app.listen(port,()=>console.log(`listen to localhost:${port}`));