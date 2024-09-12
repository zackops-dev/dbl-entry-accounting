const coaData = {
  '5837213f-3208-425e-a663-8e12738380c6': {
    id: '5837213f-3208-425e-a663-8e12738380c6',
    name: 'BS/Assets/Bank Checking',
    drCr: 'dr',
  },
  '5f918c32-41f5-4964-a84f-7eeea7284bda': {
    id: '5f918c32-41f5-4964-a84f-7eeea7284bda',
    name: 'BS/Assets/Accounts Receivable',
    drCr: 'dr',
  },
  '9a51ea1f-b850-47bc-8509-2af194616a50': {
    id: '9a51ea1f-b850-47bc-8509-2af194616a50',
    name: 'BS/Equity/Opening Balances',
    drCr: 'cr',
  },
  '04a76953-d1c5-48ce-a109-fd543e12c691': {
    id: '04a76953-d1c5-48ce-a109-fd543e12c691',
    name: 'BS/Equity/Retained Earnings',
    drCr: 'cr',
  },
  '1e254bb0-80a3-4c3f-a3bd-4ab8a5a903dd': {
    id: '1e254bb0-80a3-4c3f-a3bd-4ab8a5a903dd',
    name: 'PL/Expenses/Cost Of Sales',
    drCr: 'dr',
  },
  'dd72f5ab-2b65-4c55-a66f-919689a58ecf': {
    id: 'dd72f5ab-2b65-4c55-a66f-919689a58ecf',
    name: 'PL/Revenue/Sales',
    drCr: 'cr',
  },
  'c6d3b5a7-1389-42ed-9a83-7c40f921da7c': {
    id: 'c6d3b5a7-1389-42ed-9a83-7c40f921da7c',
    name: 'BS/Liabilities/Accounts Payable',
    drCr: 'cr',
  },
  'f1ac383b-bf5f-4912-8ffb-e52596a6c222': {
    id: 'f1ac383b-bf5f-4912-8ffb-e52596a6c222',
    name: 'BS/Liabilities/Taxes/GST',
    drCr: 'cr',
  },
};

const transactionData = [
  {
    id: 'f345e665-fadf-494d-b091-1dc51141e809',
    trDate: '2024-01-07',
    dr: '5837213f-3208-425e-a663-8e12738380c6',
    entity: {
      type: 'Purchase',
      description: 'Purchase - Flour from WindyMills',
      supplier: {
        id: 'ced0ca3a-01e8-45d7-b5d3-7515cee56c33',
        name: 'WindyMills LLC',
      },
      total: '452.00',
    },
  },
  {
    id: '801686b6-513d-422f-b65f-70326d8bfda4',
    trDate: '2024-01-08',
    dr: '5f918c32-41f5-4964-a84f-7eeea7284bda',
    entity: {
      type: 'Purchase',
      description: 'Purchase - Eggs from Happy Farm',
      supplier: {
        id: '31ba8c45-b4db-4715-8d8b-219fd9711461',
        name: 'Happy Farm Inc',
      },
      total: '226.00',
    },
  },
  {
    id: '2dc75475-d13c-4d10-a6bc-01b31a23be95',
    trDate: '2024-01-20',
    cr: 'f1ac383b-bf5f-4912-8ffb-e52596a6c222',
    entity: {
      type: 'Sale',
      product: {
        id: '4c34d0f0-4fbc-4956-bd0f-66cba4b6ffab',
        name: 'Sourdough Bread',
      },
      qty: 1,
      total: '6.59',
      tax: '0.86',
    },
  },
  {
    id: '58baf4ab-e228-4f34-aed0-513388c277da',
    trDate: '2024-01-20',
    cr: 'c6d3b5a7-1389-42ed-9a83-7c40f921da7c',
    entity: {
      type: 'Sale',
      product: {
        id: '612732e6-81e6-46d2-92bf-3fac91679601',
        name: 'French Baquette',
      },
      qty: 3,
      total: '14.97',
      tax: '1.95',
    },
  },
  {
    id: 'b371522a-bf05-4510-87cc-2b738134842a',
    trDate: '2024-01-20',
    dr: '1e254bb0-80a3-4c3f-a3bd-4ab8a5a903dd',
    entity: {
      type: 'Sale',
      product: {
        id: '8cde7b52-18cf-4bad-be05-dae3ba4c7e9a',
        name: 'Multigrain Loaf',
      },
      qty: 1,
      total: '6.99',
      tax: '0.90',
    },
  },
];
const finalTransactionData = [];

for (let i = 0; i < transactionData.length; i++) {
  finalTransactionData.push({
    id: transactionData[i].id,
    date: transactionData[i].trDate,
    cr: transactionData[i]?.cr ? coaData[transactionData[i]?.cr] : null,
    dr: transactionData[i]?.dr ? coaData[transactionData[i]?.dr] : null,
  });

  //   coaData.forEach(element => {

  //     return  coaData.id === transactionData[i]?.cr  ? coaData.name : null
  //   });

  // cr = null
  //   transactionData[i]?.cr ? coaData[transactionData[i]?.cr].name : null,
  //   if (ransactionData[i]?.cr) {
  //     cr = coaData[transactionData[i]?.cr].name;
  //   } else {
  //     cr = null
  //   }
}

const testData = {};

// console.log(JSON.parse(JSON.stringify(finalTransactionData)));
console.log({ finalTransactionData });
