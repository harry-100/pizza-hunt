// create a variable to hold db connection

let db;
// establish a connection to indexDB database called 'pizza-hunt' and set it to version1
const request = indexedDB.open('pizza-hunt', 1);


/* Here, we create a variable db that will store the connected database object when the connection is complete. After that, we create the request variable to act as an event listener for the database. That event listener is created when we open the connection to the database using the indexedDB.open() method. */

// this event will emit if the database version changes (non-existent to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    // save a reference to the database 
    const db = event.target.result;
    // create an object store (table) called `new_pizza`, set it to have an auto incrementing primary key of sorts 
    db.createObjectStore('new_pizza', { autoIncrement: true });
  };

//    upon a successful
request.onsuccess = function(event) {
    //  when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;

    //  check if app is online, if yes run uploadPizza() function to send all db local data to api
    if(navigator.onLine) {
        uploadPizza();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new pizza and there's no internet connection

function saveRecord(record) {
    const transaction = db.transaction(['new_pizza'], 'readwrite');
//  access the object store for 'new-pizza'
const pizzaObjectStore = transaction.objectStore('new-pizza');
// add record to your store with add method
pizzaObjectStore.add(record);
}

