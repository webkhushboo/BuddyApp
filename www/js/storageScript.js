
function addKeyValueToSession(key, value) {
    simpleStorage.set(key, value);
}


function getValueFromSession(key, placeholder) {
    var value = simpleStorage.get(key);
    if (typeof value === 'undefined' || value == null) {
        return false;
    }
    return value;
}

function doLogout() {
    // clear local storage and redirect to home page
    simpleStorage.flush();
}