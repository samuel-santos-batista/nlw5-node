import { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService';

class SettingsController {
  public async create(request: Request, response: Response) {
    const { chat, username } = request.body;
    
    try {  
      const settingsService = new SettingsService();

      const settings = await settingsService.create({
        chat, 
        username 
      })

      return response.status(201).json(settings)
    } catch(err){

      return response.status(400).json({
        message: err.message
      });
    }
   }

  public async findByUsername(request: Request, response: Response) {
    const { username } = request.params;
    
    const settingsService = new SettingsService();
  
    const settings = await settingsService.findByUsername(username);

    return response.json(settings);
  }

  public async update(request: Request, response: Response) {
    const { username } = request.params;
    const { chat } = request.body;

    const settingsService = new SettingsService();
  
    await settingsService.update(
      username,
      chat
    );

    return response.json({ ok: true });
  }

}

export { SettingsController }