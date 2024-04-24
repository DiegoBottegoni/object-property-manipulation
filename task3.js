function BankAccount(initialBalance) {
  let balance = initialBalance;

  Object.defineProperty(this, 'balance', {
      get: function() {
          return balance;
      },
      set: function(newBalance) {
          balance = newBalance;
      }
  });

  this.getFormattedBalance = function() {
      return `$${balance}`;
  };
}

BankAccount.transfer = function(sourceAccount, targetAccount, amount) {
  if (amount > 0 && amount <= sourceAccount.balance) {
      sourceAccount.balance -= amount;
      targetAccount.balance += amount;
  } else {
      console.error("Transfer failed: Insufficient funds or invalid amount.");
  }
};

/// TESTING ///

const accountA = new BankAccount(1000);
const accountB = new BankAccount(500);

console.log('Account A initial balance:', accountA.getFormattedBalance());
console.log('Account B initial balance:', accountB.getFormattedBalance());

BankAccount.transfer(accountA, accountB, 200);

console.log('Account A balance after transfer:', accountA.getFormattedBalance());
console.log('Account B balance after transfer:', accountB.getFormattedBalance());
