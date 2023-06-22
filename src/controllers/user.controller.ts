import { Request, Response } from "express";
import {postUserQuery, postUserLoginQuery} from "../querys/userQuery";
import bcrypt from 'bcrypt';


const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };



export const postUser = async (req: Request, res: Response) =>{
    try{
        const {ci, names, surnames, email, ubication, password, password2, id_question, response} = req.body;

        console.log(password, password2)

        if(!password == password2){
            throw new Error('Las contraseñas no coinciden');
        }

        const hashedPassword2 = await hashPassword(password);

        console.log(hashPassword)


        const user = await postUserQuery(ci,names,surnames,email,ubication,hashedPassword2,id_question,response);

        res.status(200).json(user.rows);
    }
    catch(error){
        res.status(500).json(error);
    }
}



export const postUserLogin = async (req: Request, res: Response) =>{
    try{
        const {ci, password} = req.body;

        const user = await postUserLoginQuery(ci,password);

        res.status(200).json(user.rows);
    }
    catch(error :any){
        console.log(error)
        res.status(500).json({error : error.message});
    }
}

