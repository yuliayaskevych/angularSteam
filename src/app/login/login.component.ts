import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'steamClone';
  public loginForm = this.formBuilder.group({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  })

  private uid: any;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private router: Router,
    private userService: UserService
  ) { }

  public ngOnInit(): void { }

  public submit() {
    const { email, password } = this.loginForm.value

    this.auth.signInWithEmailAndPassword(email, password)
    // this.userService.login(email, password)
      .then((res) => { console.log('succes', res); this.uid = res.user?.uid })
      .then(() => { this.router.navigate(['/menu', this.uid, 'profile']) })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        alert(error.message);
      })
    this.loginForm.reset();
  }

}
