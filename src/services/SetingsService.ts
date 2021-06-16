import { getCustomRepository } from 'typeorm';

import { SettingsRepositories } from '../repositories/SettingsRepositories';

type ISettingsCreate = {
  chat: boolean,
  username: string;
}

class SettingsService {
  public async create({ chat, username }: ISettingsCreate){
    const settingsRepository = getCustomRepository(SettingsRepositories)
     
    const userAlreadyExists = await settingsRepository.findOne({
      username
    });


    const settings = settingsRepository.create({
      chat,
      username, 
    });
     
    await settingsRepository.save(settings);

    return settings;
  }
}

export { SettingsService }