function createImmutableObject(obj) {
    function handleNested(value) {
        if (Array.isArray(value)) {
            return value.map(handleNested);
        } else if (value && typeof value === 'object') {
            return createImmutableObject(value);
        }
        return value;
    }

    const immutableObject = Array.isArray(obj) ? [] : {};
    
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        Object.defineProperty(immutableObject, key, {
            value: handleNested(value),
            writable: false,
            configurable: false,
            enumerable: true
        });
    });

    return immutableObject;
}

const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com",
    address: {
        street: "123 Main St",
        city: "CityName",
        state: "BS"
    }
};

const immutablePerson = createImmutableObject(person);

console.log(immutablePerson);

/// TESTING ///

try {
    immutablePerson.firstName = "Jane";
    console.log("FirstName after modification:", immutablePerson.firstName);
} catch (error) {
    console.error("Error:", error.message);
}

try {
    immutablePerson.address.city = "Another CityName";
    console.log("City after modification:", immutablePerson.address.city);
} catch (error) {
    console.error("Error:", error.message);
}
