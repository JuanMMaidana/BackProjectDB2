import { Request, Response } from "express";
import {postUserQuery, postUserLoginQuery} from "../querys/userQuery";




export const postUser = async (req: Request, res: Response) =>{
    try{
        const {ci, names, surnames, email, ubication, password, password2, id_question, response} = req.body;

        console.log(password, password2)

        if(!password == password2){
            throw new Error('Las contraseñas no coinciden');
        }

        

        const user = await postUserQuery(ci,names,surnames,email,ubication,password,id_question,response);

        res.status(200).json(user.rows);
    }
    catch(error:any){
        res.status(500).json(error.message);
    }
}



export const postUserLogin = async (req: Request, res: Response) =>{
    try{
        const {ci, password} = req.body;

        const user = await postUserLoginQuery(ci,password);

        res.status(200).json(user);
    }
    catch(error :any){
        console.log(error)
        res.status(500).json(error.message);
    }
}



