import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: AngularFireAuth,
  ) { }

  public login(email: string, password: string) {
    return new Promise<any>((res, rej) => {
      this.auth.signInWithEmailAndPassword(email, password)
      .then(resp => res(resp), err => rej(err));
    })
  }
}
