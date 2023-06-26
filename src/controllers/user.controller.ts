import { Request, Response } from "express";
import {postUserQuery, postUserLoginQuery, postFollowFriendQuery, postUnFollowFriendQuery, postFriendshipStateQuery, getUserInfoQuery} from "../querys/userQuery";
import {getPublicationsFriendsQuery} from "../querys/publicationQuery";




export const postUser = async (req: Request, res: Response) =>{
    try{
        const {ci, names, surnames, email, ubication, password, password2, id_question, response} = req.body;

        console.log(password, password2)

        if(!password == password2){
            throw new Error('Las contraseñas no coinciden');
        }

        console.log(ci,names,surnames,email,ubication,password,id_question,response)

        const user = await postUserQuery(ci,names,surnames,email,ubication,password,id_question,response);

        res.status(200).json(user.rows);
    }
    catch(error:any){
        res.status(500).json(error.message);
    }
}



export const postUserLogin = async (req: Request, res: Response) =>{

    console.log(req.body , "body")
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


export const postFollowFriend = async (req, res) => {
    try {
      const { ci_friend, friendbool } = req.body;
      const ci = req.user.ci;
      let user;
  
      if (friendbool) {
        user = await postFollowFriendQuery(ci, ci_friend);
      } else if (!friendbool) {
        user = await postUnFollowFriendQuery(ci, ci_friend);
      }
  
      res.status(200).json(user.rows);
    } catch (error: any) {
      console.log(error);
      res.status(500).json(error.message);
    }
  };
  

  export const postFriendshipState = async (req, res) => {
    try {
      const { ci_friend } = req.body;
      const ci = req.user.ci;
      let user: boolean;
  
      console.log(ci, ci_friend)
  
      user = await postFriendshipStateQuery(ci, ci_friend);
  
      console.log(` ${ci} y ${ci_friend} son amigos? ${user}`)
  
      res.status(200).json(user);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: true, message: error.message });
    }
  };
  







    

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




