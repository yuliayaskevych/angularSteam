import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {

  private uid: any;
  friends: any;

  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.root.children[0].params.uid;
    this.db.database.ref(`users/${this.uid}`).on('value', snap => {
      const data = snap.val().friends;
      this.friends = Object.keys(data)
        .map(key => ({ username: data[key], id: key }));
    })
  }
  removeFriend(id: string) {
    this.db.database.ref(`users/${this.uid}/friends/${id}`)
      .remove()
      .then(() => alert('delete successful'))
      .catch((err) => alert(err.message))
  }
}
