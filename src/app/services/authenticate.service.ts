import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private storage: Storage
  ) { }

  loginUser(credentials): Promise<string> {
    return new Promise(async (accept, reject) => {
      const registeredUser = await this.storage.get('user');
      if (credentials.email === 'test@test.com' && credentials.password === '12345') {
        accept('Login correcto');
      } else if (registeredUser && credentials.email === registeredUser.email && credentials.password === atob(registeredUser.password)) {
        accept('Login correct');
      } else {
        reject('Login incorrecto');
      }
    });
  }

  registerUser(userToRegister) {
    userToRegister.password = btoa(userToRegister.password);
    return this.storage.set('user', userToRegister);
  }
}
