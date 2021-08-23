import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models';

@Component({
  selector: 'app-friends-search',
  templateUrl: './friends-search.component.html',
  styleUrls: ['./friends-search.component.css']
})
export class FriendsSearchComponent implements OnInit {
  findUsers: string[] = [];
  users: string[] = [];
  search: string;
  friends: string[] = [];

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParam => {
      this.search = queryParam.search;
      this.searchUser(this.search);
      this.getFriends();
      this.removeExistFriend();
    })
  }

  searchUser(search: string) {
    this.db.database.ref(`users`).on('value', snap => {
      this.users = Object.values(snap.val()).map((user: any) => user?.username);
      this.findUsers = this.users.filter(user => user.includes(search));
      console.log('findUsers', this.findUsers);
      
    });
  }

  getFriends(){
    const uid = this.route.snapshot.root.children[0].params.uid;
    this.db.database.ref(`users/${uid}`).on('value', snap => {
      const data = snap.val().friends;
      this.friends = Object.values(data);
      this.friends.push(snap.val().username);
      console.log('friends', this.friends);      
    })
  }

  removeExistFriend(){
    this.findUsers = this.findUsers.filter(user => !this.friends.includes(user));
  }

  
  addFriend(username: string) {
    const uid = this.route.snapshot.root.children[0].params.uid;
    this.db.database.ref(`users/${uid}/friends`).push(username)
      .then(() => alert("add friend " + username))
      .catch(err => alert(err.message));

    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
