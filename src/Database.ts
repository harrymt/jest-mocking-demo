import { User } from "./types";

export type SetUsersCallback = (users: User[]) => void;

export class Database {
  private privateUsers: User[];

  constructor() {
    this.privateUsers = [];
  }

  getUsers = (): User[] => {
    console.log("Connecting to complex database...");
    return this.privateUsers;
  };

  setUsers = (newUsers: User[], callback: SetUsersCallback): void => {
    console.log("Connecting to complex database...");
    this.privateUsers = newUsers;
    callback(newUsers);
  };
}
