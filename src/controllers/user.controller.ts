import { Request, Response } from "express";
import {postUserQuery, postUserLoginQuery, postFollowFriendQuery, getUserInfoQuery} from "../querys/userQuery";
import {getPublicationsFriendsQuery} from "../querys/publicationQuery";




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



export const postFollowFriend = async (req, res) =>{
    try{
        const {ci_friend} = req.body;

        const ci = req.user.ci;

        const user = await postFollowFriendQuery(ci,ci_friend);

        res.status(200).json(user.rows);
    }
    catch(error :any){
        console.log(error)
        res.status(500).json(error.message);
    }
}
    

export const getPublicationsFriends = async (req, res) =>{
    try{

        const ci = req.user.ci;

        const user = await getPublicationsFriendsQuery(ci);

        res.status(200).json(user.rows);
    }
    catch(error :any){
        console.log(error)
        res.status(500).json(error.message);
    }
}

export const getUserInfo = async (req, res) =>{
    try{

        const ci = req.user.ci;

        const user = await getUserInfoQuery(ci);

        res.status(200).json(user.rows);
    }
    catch(error :any){
        console.log(error)
        res.status(500).json(error.message);
    }
}

