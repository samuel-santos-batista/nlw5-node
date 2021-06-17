import { getCustomRepository, Repository } from 'typeorm';
import { Setting } from '../entities/Setting';

import { SettingsRepository } from '../repositories/SettingsRepository';

type ISettingsCreate = {
  chat: boolean;
  username: string;
}

class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor(){
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }
  
  public async create({ chat, username }: ISettingsCreate){

    const userAlreadyExists = await this.settingsRepository.findOne({
      username
    });

    if(userAlreadyExists){
      throw new Error("User alredy exits")
    }

    const settings = this.settingsRepository.create({
      chat,
      username, 
    });
     
    await this.settingsRepository.save(settings);

    return settings;
  }

  public async findByUsername(username:string){
    const settings = this.settingsRepository.findOne({
      username, 
    });

    return settings;
  }

  public async update(username:string, chat: boolean){
    const settings = await this.settingsRepository
    .createQueryBuilder()
    .update(Setting)
    .set({ chat })
    .where("username = :username", {
      username
    })
    .execute();

    return settings;
  }
}

export { SettingsService }