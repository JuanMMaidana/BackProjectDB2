import { getSecurityQuestionQuery } from "../querys/securityQuestionQuery";


export const getSecurityQuestion = async (_req, res) =>{
    
    try{

        const result = await getSecurityQuestionQuery();

        res.status(200).json(result.rows);
    }
    catch(error :any){
        res.status(500).json(error.message);
    }
}
