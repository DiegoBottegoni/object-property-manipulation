function observeObject(targetObject, callback) {
    const handler = {
        get(target, property, receiver) {
            callback(property, 'get');
            return Reflect.get(target, property, receiver);
        },
        set(target, property, value, receiver) {
            callback(property, 'set');
            return Reflect.set(target, property, value, receiver);
        }
    };
    return new Proxy(targetObject, handler);
}

function logAction(property, action) {
    console.log(`Property '${property}' was ${action}.`);
}

const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com"
};

const observedPerson = observeObject(person, logAction);

/// TESTING ///

console.log(observedPerson.firstName);
observedPerson.age = 31;
console.log(observedPerson.age);
