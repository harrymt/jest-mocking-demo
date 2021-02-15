import { Database } from "./src/Database";
import { Store } from "./src/store";
import { User } from "./src/types";

const start = () => {
  const db = new Database();
  const store = new Store(db);
  const harry: User = { id: 0, name: "Harry" };
  const john: User = { id: 1, name: "John" };

  store.addUser(harry, (users) => {
    console.log("After adding", users);
  });

  store.removeUser(harry.id, (users) => console.log("After removing", users));
  store.removeUser(john.id, (users) => console.log("After removing", users));

  // etc
  console.log("Users store", store.database.getUsers());
  console.log("Finished running program");
};

start();
