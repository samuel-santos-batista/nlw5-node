import { getCustomRepository } from 'typeorm';

import { SettingsRepository } from '../repositories/SettingsRepository';

type ISettingsCreate = {
  chat: boolean,
  username: string;
}

class SettingsService {
  public async create({ chat, username }: ISettingsCreate){
    const settingsRepository = getCustomRepository(SettingsRepository)
     
    const userAlreadyExists = await settingsRepository.findOne({
      username
    });

    if(userAlreadyExists){
      throw new Error("User alredy exits")
    }

    const settings = settingsRepository.create({
      chat,
      username, 
    });
     
    await settingsRepository.save(settings);

    return settings;
  }
}

export { SettingsService }