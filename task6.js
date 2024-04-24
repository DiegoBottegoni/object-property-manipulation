function deepCloneObject(obj, map = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj);
    }

    if (Array.isArray(obj)) {
        const result = [];
        map.set(obj, result);
        for (const item of obj) {
            result.push(deepCloneObject(item, map));
        }
        return result;
    }

    if (map.has(obj)) {
        return map.get(obj);
    }

    const clonedObj = Object.create(Object.getPrototypeOf(obj));
    map.set(obj, clonedObj);
    
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = deepCloneObject(obj[key], map);
        }
    }
    return clonedObj;
}

/// TESTING ///

const original = {
    firstName: 'John',
    lastName: 'Doe',
    details: {
        age: 30,
        address: {
            street: "123 Main St",
            city: "CityName",
            state: "BS"
        }
    },
    date: new Date(),
    circular: {}
};
original.circular.self = original;

const cloned = deepCloneObject(original);
console.log(cloned);
console.log('Circular reference check:', cloned.circular.self === cloned);
