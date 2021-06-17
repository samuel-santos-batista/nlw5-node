import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../entities/Connection';

import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

type IConnectionCreate = {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}  

class ConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor(){
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }
  
  public async create({ socket_id, user_id, admin_id, id }: IConnectionCreate): Promise<Connection>{

    const connection = this.connectionsRepository.create({
      socket_id, 
      user_id, 
      admin_id, 
      id 
    });
     
    await this.connectionsRepository.save(connection);

    return connection;
  }
  public async findByUserId(user_id: string): Promise<Connection>{
    const connection = await this.connectionsRepository.findOne({
      user_id,
    });

    return connection;
  }

  public async findAllWithoutAdmin(): Promise<Connection[]>{
    const connections = await this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ["user"],
    });
    console.log(connections)

    return connections;
  }
}

export { ConnectionsService }