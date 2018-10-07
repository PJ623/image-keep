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
            this.result.createObjectStore(objectStoreName);
        }

        request.onsuccess = function () {
            console.log("Connected to database.");
            this.result.close(); // Not sure if needed here. No transaction has taken place.
        }

        this.put = function put(data, key) {
            var request = window.indexedDB.open(dbName, dbVersion);

            request.onsuccess = function () {
                var transaction = this.result.transaction(objectStoreName, "readwrite");
                var store = transaction.objectStore(objectStoreName);
                var action = store.put(data, key);

                action.onsuccess = function () {
                    console.log("Successfully put " + data + " into the database. " + "Data was stored with key, " + key + ".");
                }

                action.onerror = function () {
                    alert("Failed to put " + data + " with key, " + key + " into the database.");
                }

                // Arrow function to access lexical scope of 'this'!
                transaction.oncomplete = () => {
                    this.result.close();
                }
            }
        }

        this.getAll = function getAll(fn) {
            var request = window.indexedDB.open(dbName, dbVersion);

            request.onsuccess = function () {
                var transaction = this.result.transaction(objectStoreName, "readonly");
                var store = transaction.objectStore(objectStoreName);
                var action = store.getAll();

                if (!fn || typeof fn != "function") {
                    fn = function () {
                        console.log("result of getAll();", this.result);
                    }
                }

                action.onsuccess = fn; /*function () {
                    fn.call(this, store);
                }*/

                action.onerror = function () {
                    alert("Unable to get items from object store" + objectStoreName + ".");
                }

                // Arrow function to access lexical scope of 'this'!
                transaction.oncomplete = () => {
                    this.result.close();
                }
            }
        }

        this.remove = function remove(key, fn) {
            var request = window.indexedDB.open(dbName, dbVersion);

            request.onsuccess = function () {
                var transaction = this.result.transaction(objectStoreName, "readwrite");
                var store = transaction.objectStore(objectStoreName);
                var action = store.delete(key);

                action.onsuccess = function () {
                    console.log("Deleted item at " + key + ".");
                    if (fn && typeof fn == "function") {
                        fn();
                    }
                }

                action.onerror = function () {
                    alert("Failed to delete item at key " + key + ".");
                }

                // Arrow function to access lexical scope of 'this'!
                transaction.oncomplete = () => {
                    this.result.close();
                }
            }
        }

        this.clearRecords = function clearRecords() {
            var request = window.indexedDB.open(dbName, dbVersion);

            request.onsuccess = function () {
                var transaction = this.result.transaction(objectStoreName, "readwrite");
                var store = transaction.objectStore(objectStoreName);

                var action = store.clear();

                action.onsuccess = function () {
                    alert("Cleared database of all records.");
                }

                action.onerror = function () {
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