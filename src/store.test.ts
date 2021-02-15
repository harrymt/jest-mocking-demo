"use strict";
import { Store } from "./store";
import { Database } from "./Database";

jest.mock("./Database", () => {
  class Database {
    public create() {}
  }
  return {
    Database,
  };
});

// Sample user data
const MOCK_USER_HARRY = { id: 0, name: "Harry" };
const MOCK_USER_JOHN = { id: 1, name: "John" };

// https://jestjs.io/docs/en/es6-class-mocks
describe("4 ways to create an ES6 class mock", () => {
  it("Automatic mock", () => {
    const mockDatabase = new Database();
    console.log(mockDatabase);
    const store = new Store(mockDatabase);
    expect(store.database.getUsers()).toHaveLength(2);
  });

  // TRY THIS  https://codewithhugo.com/jest-fn-spyon-stub-mock/

  //   const database = new Database();
  //   const store = new Store(database);

  //   // Stub database method
  //   const getUsers = jest.fn(Database, database.getUsers);

  //   // Overrides database.getUsers() implementation
  //   getUsers.onFirstCall().returns([MOCK_USER_HARRY, MOCK_USER_JOHN]);

  //   // `store.database.getUsers()` returns `[harry, john]`
  //   expect(store.database.getUsers().length).toEqual(2);

  //   // Put method back to normal 'remove stub'
  //   getUsers.restore();
  //   Database.mockClear(); // jest.spyOn instewad!
  // });
});
describe("Other tests", () => {
  it("Throws on invalid user", () => {
    expect(() =>
      new Store(new Database()).addUser({ invalid: "Yes" }, jest.fn())
    ).toThrowError("Cannot add user, input user is invalid.");
  });
});
// describe("stubs", () => {
//   // Cache the stubbed methods
//   let load;
//   let save;
//   beforeEach(() => {
//     // Stub out the database method
//     load = stub(database, "getUsers");

//     // Overriding implementation
//     load.onFirstCall().returns([]);

//     // Stub out another database method,
//     // but don't override its result
//     save = stub(database, "setUsers");
//   });

//   afterEach(() => {
//     // Unset the stubbed methods
//     load.restore();
//     save.restore();
//   });

//   it("store starts empty", () => {
//     // Stubs the specific method

//     // This is an example of a pointless assertion
//     // The result is defined above:
//     // `load.onFirstCall().returns([]);`
//     // There is no need to check the length.
//     expect(store.database.getUsers().length).toEqual(0);
//   });

//   it("new users can be added to the store", () => {
//     const currentUsers = [john];
//     const newUser = harry;

//     // Can override the initial stubbed method
//     load.onFirstCall().returns(currentUsers);

//     // Call our method we are testing
//     store.addUser(newUser, null);

//     // Check that the function `database.setUsers()` was called with
//     // our newly added user
//     assert.calledWith(save, [...currentUsers, newUser], null);
//   });
// });

// describe("spies", () => {
//   /**
//    * Spies:
//    *
//    * Spy on functions and see if they have been called.
//    *
//    * Pros:
//    * - Check if method has been called with certain variables
//    * - Check if callbacks have been called, and how many times
//    *
//    */
//   it("check that adding a user returns the updated list of users", () => {
//     // Spy on a variable
//     // Sinon is now watching this variable
//     const callback = spy();

//     // Use the variable in our function
//     store.addUser(john, callback);

//     // Now check that `callback([harry, john])` was called inside of `database.addUser()`
//     assert.calledWith(callback, [harry, john]);

//     // Now spy on our save method.
//     // Spies won't change the method, just tracks when `database.setUsers()` is called
//     let save = spy(database, "setUsers");

//     // This will now execute the database method
//     // Requiring the database to be setup first.
//     store.addUser(harry, () => {});

//     // Check that our `database.setUsers()` method, was called first.
//     assert.calledOnce(save);

//     // Revert our spy on `database.setUsers()`
//     save.restore();
//   });
// });

// describe("sandpit", () => {
//   /**
//    * Create a sandpit, and call everything using this pit
//    * then you don't have to call `x.restore()`.
//    */
//   const sandbox = createSandbox();

//   let load;
//   let save;
//   beforeEach(() => {
//     // Call same stubbing functions, but using `sandbox.`
//     load = sandbox.stub(database, "getUsers");
//     load.onFirstCall().returns([]);

//     save = sandbox.stub(database, "setUsers");
//     save.onFirstCall().returns(function () {
//       return [harry];
//     });
//   });

//   // Calls .restore() on load and save.
//   afterEach(() => sandbox.restore());

//   it("can add only users to the store", () => {
//     // Check our method is mocked
//     assert.match(database.getUsers().length, 0);
//   });
// });

// it("check that our sandpit works", () => {
//   // This will perform database tasks,
//   // instead of using our mocks because they are removed
//   store.addUser(harry, () => {});
//   assert.match(store.database.getUsers().length, 1);
// });

// /**
//  * Mocks:
//  *
//  * Use mocks to stub out whole objects.
//  */
// it("mocks", () => {
//   // Mock our whole database object
//   var db = mock(store.database);

//   // Setup our mock to replace functionality,
//   // if all we care about is that these methods
//   // were called once, we replace them with checks.
//   db.expects("setUsers").once();

//   // This needs to return something to continue with the method
//   // so we stub out the return value of `getUsers()`
//   db.expects("getUsers").once().returns([]);

//   store.addUser(harry, () => {});

//   // Verify that the mocked expects happened
//   // setUsers() was called once
//   // getUsers() was called once
//   db.verify();
// });

// /**
//  * WithArgs
//  */
// it.only("with args comparison", () => {
//   const fn = stub();
//   fn.withArgs({ id: 1 }).returns({ name: "harry" });
//   const result = fn({ id: 1 });
//   assert.match("harry", result.name);
// });
