import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();



export const authMiddleware = async (req, res, next) => {
    
        const token = req.headers.authorization.split(' ')[1];

        console.log('Token recibido:', token);


        if(!token){
            throw new Error('No se ha encontrado el token');
        }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload & { ci: number };
        req.user = decoded;
        next();
    }
    catch(error:any){

        return res.status(401).json({ message: 'Token inválido' });
    }
}


export default authMiddleware;


