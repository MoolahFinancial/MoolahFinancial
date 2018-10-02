import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Platform } from 'ionic-angular';

@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(public http: HttpClient, private sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform) {
    this.databaseReady = new BehaviorSubject(false); // By default, our database is not yet ready
    // Once our platform is ready, create or open our database
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'MoolahFinancial.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        this.database = db; // Set our database to the SQLiteObject
        // Checks if the database is already filled
        this.storage.get('database_filled').then(val => {
          // If the database is filled, 
          if(val) {
            this.databaseReady.next(true); // Set the database as being filled out as true
          } else {
            this.fillDatabase(); // Call a method to fill out our database
          }
        });
      });
    });
  }

  // Method to make sure our database is ready
  public getDatabaseState() { 
    return this.databaseReady.asObservable();
  }

  // Method to fill up our database using a dump file
  fillDatabase(){
    // Retrieve the contents of our sql file
    this.http.get<string>('assets/startDump.sql')
    .subscribe(sql => { 
        // Pass in the text from the file and interpret it as sql queries (note: we can also interpret the string as JSON if we wanted to)
        this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(data => {
            this.databaseReady.next(true);
            // Set the database as being filled out as true (to avoid populating the db with the same dummy data)
            this.storage.set('database_filled', true);
        })
        .catch(e => console.log(e));
    });
  }

  /*
  * NOTE: Below here is where we perform some sql queries on our database
  */

  // Inserts a new user into our database
  addUser(firstName, middleName, lastName) 
  {
    let data = [firstName, middleName, lastName];
    return this.database.executeSql("INSERT INTO user (first_name, middle_name, last_name VALUES (?, ?, ?)", data).then(res => {
      return res;
    });
  }

  // Retrieves and returns all users in the database as an array
  getAllUsers()
  {
    return this.database.executeSql("SELECT * FROM user", []).then(data => {
      let users = [];
      if (data.rows.length > 0){
        for (var i = 0; i < data.rows.length; i++){
          users.push({
            firstName: data.rows.item(i).first_name,
            middleName: data.rows.item(i).middle_name,
            lastName: data.rows.item(i).last_name
          });
        }
      }
      return users;
    }, err => {
      console.log("Database Error: ", err);
      return [];
    });
  }




  // // Method to fill up our database using a dump file
  // fillDatabase(){
  //   this.http.get('assets/startDump.sql') // Retrieve our sql file
  //   .map(res => res.text()
  //   .subscribe(sql => {
  //     // Pass in the text from the file and interpret it as sql queries (note: we can also interpret the string as JSON if we wanted to)
  //     this.sqlitePorter.importSqlToDb(this.database, sql)
  //     .then(data => {
  //       this.databaseReady.next(true); // Set the database as being filled out as true
  //       // Set the database as being filled out as true (to avoid populating the db with the same dummy data)
  //       this.storage.set('database_filled', true);
  //     })
  //     .catch(e => console.log(e));
  //   });
  // }
}
