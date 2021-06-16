import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { SettingsRepositories } from '../repositories/SettingsRepositories';

class SettingsController {
  public async create(request: Request, response: Response) {
    const { chat, username } = request.body;
      
    const settingsRepository = getCustomRepository(SettingsRepositories)
     
    const settings = settingsRepository.create({
      chat,
      username, 
    });
     
    await settingsRepository.save(settings);
     
    return response.status(201).json(settings)
  }
}

export { SettingsController }