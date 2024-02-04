import express from "express";
import bcrypt  from "bcrypt";

const app = express();
const port =  3000;

//in - memory
const users =[];

app.use(express.json());

app.post("/register", async(req, res, next)=>{
     try{
          const {email, password} = req.body;
          //find user
          const findUser= users.find((data)=> email == data.email)
          if(findUser){
               res.status(400).send("This email is exist");
          }

          //Hash password
          const hashedPassword = await bcrypt.hash(password, 10);
          users.push({email, password: hashedPassword});
          res.status(201).send("Registered Successfully")
     }catch(error){
          res.status(500).send({message: error.message})
     }
})

app.post("/login", async (req, res, next)=>{
     try {
          const {email, password} = req.body;
          //find user
          const findUser= users.find((data)=> email == data.email);
          if(!findUser){
               res.status(400).send("Wrong email or password")
          }

          const passwordMatch = await bcrypt.compare(password,findUser.password);

          if(passwordMatch){
               res.status(200).send("logged in successfully")
          }else{
               res.status(400).send("Wrong email or password")
          }
     } catch (error) {
           res.status(500).send({message : error.message})    
     }
})



app.listen(port, ()=> {
     console.log(`Server is started on port ${port}`);
})
