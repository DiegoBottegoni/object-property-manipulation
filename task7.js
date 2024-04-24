const schema = {
    firstName: {
        type: "string",
        required: true
    },
    lastName: {
        type: "string",
        required: true
    },
    age: {
        type: "number",
        required: true,
        min: 0,
        max: 120
    },
    email: {
        type: "string",
        required: true,
    }
};

function validateObject(obj, schema) {
    for (const key in schema) {
        const rule = schema[key];
        const value = obj[key];

        if (rule.required && !(key in obj)) {
            console.log(`${key} is required but missing.`);
            return false;
        }

        if (value != null && typeof value !== rule.type) {
            console.log(`${key} is expected to be a ${rule.type}, but it is a ${typeof value}.`);
            return false;
        }

        if (rule.min != null && value < rule.min) {
            console.log(`${key} should be at least ${rule.min}.`);
            return false;
        }

        if (rule.max != null && value > rule.max) {
            console.log(`${key} should be no more than ${rule.max}.`);
            return false;
        }
    }
    return true;
}

/// TESTING ///

const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com"
};

const person2 = {
    firstName: "John",
    lastName: "Doe",
    age: "30",
    email: "john.doe@example.com"
};

const person3 = {
    firstName: "John",
    lastName: "Doe",
    age: 121,
    email: "john.doe@example.com"
};

const result = validateObject(person, schema);
console.log("Validation result:", result);
const result2 = validateObject(person2, schema);
console.log("Validation result:", result2);
const result3 = validateObject(person3, schema);
console.log("Validation result:", result2);