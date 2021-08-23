import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder, EmailValidator } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;

  private uid: any;
  username: any;
  email: any;
  age: any;


  constructor(
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.root.children[0].params.uid;

    this.db.database.ref(`users/${this.uid}`).on('value', snap => {
      const data = snap.val();
      this.username = data.username;
      this.email = data.email;
      this.age = data.age;
    });

    this.profileForm = this.formBuilder.group({
      username: new FormControl(this.username, [Validators.required]),
      email: new FormControl(this.email),
      age: new FormControl(this.age, [Validators.required]),
    })
    // this.profileForm.setValue({"age": 5});
    // this.profileForm.patchValue({"age": this.age });
  }
  public submit() {
    console.warn('Your profile has been modified', this.profileForm.value);
    const { username, age } = this.profileForm.value;
    let data;
    if (age) data = { age };
    if (username) data = { ...data, username };
    console.log('data', data);

    if (data)
      this.db.database.ref(`users/${this.uid}`).update(data)
        .then(() => { alert('update successful') })
        .catch(err => { alert(err.message); })
    // this.profileForm.reset();
  }

  public f() {
    console.warn('Your profile has been modified', this.profileForm.value);

  }

}
