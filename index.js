//////////////////////////////////////////////
///Synchronous
// const fs = require('fs');
// const jsonString = fs.readFileSync('./example/transactions.json', 'utf-8');
//const data = JSON.parse(jsonString);
const transactions = require('./example/transactions.json');

function getLedger(transactionData) {
  // transactionData
  if (!transactionData || !Array.isArray(transactionData)) {
    return;
  }
  let entryCount = 0;
  const ledger = [];
  for (let i = 0; i < transactionData.length; i++) {
    entryCount++;

    if (transactionData[i]?.entity?.type === 'Purchase') {
      ledger.push({
        entryNo: entryCount,
        description: transactionData[i].entity.description,
        debit: ' Expenses/Cost of Sales',
        credit: ' Liabilities/Accounts Payable',
        amount: transactionData[i].entity.total,
      });
    } else if (transactionData[i]?.entity?.type === 'Sale') {
      ledger.push({
        entryNo: entryCount,
        description:
          transactionData[i].entity.type +
          ' - ' +
          transactionData[i].entity.product.name,
        debit: ' Assets/Accounts Receivable',
        credit: ' Revenue/Sales ',
        amount: transactionData[i].entity.total,
      });

      entryCount++;

      ledger.push({
        entryNo: entryCount,
        description:
          transactionData[i].entity.type +
          ' - ' +
          transactionData[i].entity.product.name,
        debit: ' Assets/Accounts Receivable',
        credit: 'Liabilities/Taxes/GST',
        amount: transactionData[i].entity.tax,
      });
    } else {
      console.log('Error! transaction type not found');
    }
  }
  return ledger;
}

console.log(getLedger(transactions));

//////////////////////////////////////////////
///Asynchronous way - create the entries in reverse order in the ledger since while loop

// fs.readFile('./example/transactions.json', 'utf-8', (err, jsonString) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   try {
//     const data = JSON.parse(jsonString);
//     console.log(data.length);

//     let n = data.length;
//     let entryCount = 0;

//     while (n >= 0) {
//       entryCount++;
//       n = n - 1;

//       if (data[n].entity.type === 'Purchase') {
//         ledger.push({
//           no: entryCount,
//           description: data[n].entity.description,
//           debit: ' Expenses/Cost of Sales',
//           credit: ' Liabilities/Accounts Payable',
//           amount: data[n].entity.total,
//         });
//       } else if (data[n].entity.type === 'Sale') {
//         ledger.push({
//           no: entryCount,
//           description:
//             data[n].entity.type + ' - ' + data[n].entity.product.name,
//           debit: ' Assets/Accounts Receivable',
//           credit: ' Revenue/Sales ',
//           amount: data[n].entity.total,
//         });

//         entryCount++;

//         ledger.push({
//           no: entryCount,
//           description:
//             data[n].entity.type + ' - ' + data[n].entity.product.name,
//           debit: ' Assets/Accounts Receivable',
//           credit: 'Liabilities/Taxes/GST',
//           amount: data[n].entity.tax,
//         });
//       } else {
//         console.log('Error! transaction type not found');
//       }
//     }
//   } catch (err) {
//     console.log('Error parsing JSON', err);
//   }
//   console.log(ledger);
// });
