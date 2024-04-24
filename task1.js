const person = {};

Object.defineProperties(person, {
  firstName: {
    value: "John",
    writable: false,
    enumerable: true,
    configurable: false
  },
  lastName: {
    value: "Doe",
    writable: false,
    enumerable: true,
    configurable: false
  },
  age: {
    value: 30,
    writable: false,
    enumerable: true,
    configurable: false
  },
  email: {
    value: "john.doe@example.com",
    writable: false,
    enumerable: true,
    configurable: false
  }
});

person.updateInfo = function(newInfo) {
  for (const key in newInfo) {
    if (Object.getOwnPropertyDescriptor(this, key) && !Object.getOwnPropertyDescriptor(this, key).writable) {
      console.warn(`Cannot update ${key} as it is read-only.`);
    } else {
      this[key] = newInfo[key];
    }
  }
};

Object.defineProperty(person, 'address', {
  value: {},
  writable: true,
  enumerable: false,
  configurable: false
});

/// TESTING ///

console.log('Initial Person:', person);

person.updateInfo({ firstName: "Jane", age: 32 });
console.log('Updated Person:', person);

console.log('Address Property:', person.address);
person.address = { city: "New York" };
console.log('Updated Address:', person.address);