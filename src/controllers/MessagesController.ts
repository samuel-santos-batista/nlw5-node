import { Request, Response } from 'express';
import { MessagesService } from '../services/MessagesService';

class MessagesController {
  public async create(request: Request, response: Response): Promise<Response
  > {
    const { admin_id, text, user_id} = request.body;
    
    const messagesService = new MessagesService();

    const messages = await messagesService.create({
      admin_id,
      text,
      user_id
    })

      return response.status(201).json(messages);
   }

   public async shoowByUser(request: Request, response: Response): Promise<Response
   > {
     const { id: user_id } = request.params;
     
     const messagesService = new MessagesService();
 
     const messages = await messagesService.listByUser(user_id)
 
       return response.status(201).json(messages);
    }
}

export { MessagesController }