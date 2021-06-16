import { getCustomRepository } from 'typeorm';

import { MessagesRepository } from '../repositories/MessagesRepository';

type IMessagesCreate = {
  admin_id: string;
  text: string;
  user_id: string;
}

class MessagesService {
  public async create({ admin_id, text, user_id }: IMessagesCreate){
    const messagesRepository = getCustomRepository(MessagesRepository)
     
    const message = await messagesRepository.create({
      admin_id,
      text,
      user_id
    });
    
    await messagesRepository.save(message);

    return message;
  }
}

export { MessagesService }