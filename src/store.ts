import { User, IsUser } from "./types";
import { SetUsersCallback, Database } from "./Database";

export class Store {
  database: Database;
  constructor(database: Database) {
    this.database = database;
  }

  addUser(user: any, callback: SetUsersCallback): void {
    if (!IsUser(user)) {
      throw new Error("Cannot add user, input user is invalid.");
    }

    const newUsers = [...this.database.getUsers(), user];
    this.database.setUsers(newUsers, callback);
  }

  removeUser(id: number, callback: SetUsersCallback): void {
    const newUsers = this.database
      .getUsers()
      .filter((user: User) => user.id !== id);
    this.database.setUsers(newUsers, callback);
  }
}
