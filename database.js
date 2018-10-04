var Database = {
    connect: function (dbName, dbVersion) {
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

        if (!window.indexedDB) {
            alert("Indexed DB is not supported by your browser.");
            return;
        }

        var request = window.indexedDB.open(dbName, dbVersion);
        const objectStoreName = "ImageCollection";

        request.onerror = function () {
            alert(this.error);
        }

        request.onupgradeneeded = function () {
            console.log("Upgrade is needed.");
            this.result.createObjectStore(objectStoreName, { autoIncrement: true });
        }

        request.onsuccess = function () {
            console.log("Connected to database.");
            this.result.close(); // Not sure if needed here. No transaction has taken place.
        }

        this.put = function (data) {
            var request = window.indexedDB.open(dbName, dbVersion);

            request.onsuccess = function () {
                var transaction = this.result.transaction(objectStoreName, "readwrite");
                var store = transaction.objectStore(objectStoreName);

                var action = store.put(data);

                action.onsuccess = function () {
                    console.log("Successfully put " + data + " into the database.");
                }

                action.onerror = function () {
                    alert("Failed to put new data into database.");
                }

                // Arrow function to access lexical scope of 'this'!
                transaction.oncomplete = () => {
                    this.result.close();
                }
            }
        }

        this.getAll = function (fn) {
            var request = window.indexedDB.open(dbName, dbVersion);

            request.onsuccess = function () {
                var transaction = this.result.transaction(objectStoreName, "readonly");
                var store = transaction.objectStore(objectStoreName);

                var action = store.getAll();

                // Do all logic in here.

                if (!fn || typeof fn != "function") {
                    fn = function () {
                        console.log("result of getAll();", this.result);
                    }
                }

                action.onsuccess = fn;

                action.onerror = function () {
                    alert("Action could not be completed.");
                }

                // Arrow function to access lexical scope of 'this'!
                transaction.oncomplete = () => {
                    this.result.close();
                }
            }
        }

        this.clearRecords = function() {
            var request = window.indexedDB.open(dbName, dbVersion);

            request.onsuccess = function(){
                var transaction = this.result.transaction(objectStoreName, "readwrite");
                var store = transaction.objectStore(objectStoreName);

                var action = store.clear();

                action.onsuccess = function(){
                    alert("Cleared database of all records.");
                }

                action.onerror = function(){
                    alert("Could not clear database of all records.");
                }

                // Arrow function to access lexical scope of 'this'!
                transaction.oncomplete = () => {
                    this.result.close();
                }
            }
        }

        delete this.connect;
    }
}