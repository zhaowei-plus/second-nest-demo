import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  constructor() {
    this.users = [
      {
        id: 1,
        username: 'admin',
        password: 'admin',
      },
      {
        id: 2,
        username: 'test',
        password: 'test',
      },
    ];
  }

  async find(username: string): Promise<User> {
    const user = this.users.find((user) => user.username === username);
    if (user) {
      return user;
    }
    return null;
  }

  async list(): Promise<Array<User>> {
    return this.users.map((user) => {
      const { password, ...info } = user;
      return info;
    });
  }
}
