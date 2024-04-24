const product = {
    name: "Laptop"
  };
  
  Object.defineProperties(product, {
    price: {
      value: 1000,
      enumerable: false,
      writable: false,
      configurable: false
    },
    quantity: {
      value: 5,
      enumerable: false,
      writable: false,
      configurable: false
    }
  });
  
  function getTotalPrice(product) {
    const priceDescriptor = Object.getOwnPropertyDescriptor(product, 'price');
    const quantityDescriptor = Object.getOwnPropertyDescriptor(product, 'quantity');
    
    if (priceDescriptor && quantityDescriptor) {
      return priceDescriptor.value * quantityDescriptor.value;
    } else {
      throw new Error("Could not find the necessary product information.");
    }
  }
  
  function deleteNonConfigurable(obj, propName) {
    const propDescriptor = Object.getOwnPropertyDescriptor(obj, propName);
  
    if (propDescriptor && !propDescriptor.configurable) {
      throw new Error(`Cannot delete the non-configurable property: ${propName}`);
    } else if (propDescriptor) {
      delete obj[propName];
    } else {
      throw new Error(`Property ${propName} does not exist.`);
    }
  }
  
  /// TESTING ///

  console.log("Total Price:", getTotalPrice(product));
  
  try {
    deleteNonConfigurable(product, 'price');
  } catch (error) {
    console.error(error.message);
  }

  console.log("Price undeleted")
  console.log([product.price]);
  
  try {
    deleteNonConfigurable(product, 'name');
  } catch (error) {
    console.error(error.message);
  }
  
  console.log("Name deleted")
  console.log([product.name]);