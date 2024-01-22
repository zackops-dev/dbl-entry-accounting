## Double Entry Accounting Engine

The engine can be configured with a chart of accounts and rules that describe how to process various transactions. Once the engine is setup it can process a given transaction and return zero or more entries as a result. Zero entries are returned if there are no rules associated with a given transaction so the engine doesn't know how to process it.

### How to use:
```javascript
const coa = [{ ... }, ... ]     // an array representing chart of accounts
const rules = [{ ... }, ... ]   // an array of rules
const process = accountingEngine({ coa, rules })

const someTransaction = {
  id: "2dc75475-d13c-4d10-a6bc-01b31a23be95",
  trDate: "2024-01-20",
  entity: {
    type: "Sale",
    ... // other entity fields here
  }
}
const entries = process(someTransaction)   // returns an array of entries
```

Resulting entries have the following structure:
```javascript
{
  id: "fa9ae510-af48-4e46-8c08-78104c0b06fd",     // UUID v4
  trId: "2dc75475-d13c-4d10-a6bc-01b31a23be95",   // transaction id
  description: "Sale - product name",             // some text describing the entry
  dr: "5f918c32-41f5-4964-a84f-7eeea7284bda",     // debited account
  cr: "dd72f5ab-2b65-4c55-a66f-919689a58ecf",     // credited account
  amount: "6.59"
}
```

For example given the following simplified chart of accounts (COA) used by a small bakery:
```
---+------------------------------+--------
 # | account                      | dr/cr
---+------------------------------+--------
 1 | Assets/Bank Checking         | Debit
 2 | Assets/Accounts Receivable   | Debit
 3 | Equity/Opening Balances      | Credit
 4 | Equity/Retained Earnings     | Credit
 5 | Expenses/Cost Of Sales       | Debit
 6 | Revenue/Sales                | Credit
 7 | Liabilities/Accounts Payable | Credit
 8 | Liabilities/Taxes/GST        | Credit
```

The following purchase transactions:
```
---+-----------------------+--------+------------
 # | description           |  total | date
---+-----------------------+--------+------------
 1 | Flour from WindyMills | 452.00 | 2024-01-07
 2 | Eggs from Happy Farm  | 226.00 | 2024-01-08
```

And the following sales transactions:
```
---+-----------------+-------+-----+-------+------+------------
 # | product         | price | qty | total |  tax | date
---+-----------------+-------+-----+-------+------+------------
 1 | Sourdough Bread |  6.59 |   1 |  6.59 | 0.86 | 2024-01-20
 2 | French Baquette |  4.99 |   3 | 14.97 | 1.95 | 2024-01-20
 3 | Multigrain Loaf |  6.99 |   1 |  6.99 | 0.90 | 2024-01-20
```

The accounting engine will generate the following entries in the ledger:
```
---+----------------------------------+----------------------------+------------------------------+--------
 # | description                      | debit                      | credit                       | amount
---+----------------------------------+----------------------------+------------------------------+--------
 1 | Purchase - Flour from WindyMills | Expenses/Cost of Sales     | Liabilities/Accounts Payable | 452.00
 2 | Purchase - Eggs from Happy Farm  | Expenses/Cost of Sales     | Liabilities/Accounts Payable | 226.00
 3 | Sale - Sourdough Bread           | Assets/Accounts Receivable | Revenue/Sales                |   6.59
 4 | Sale - Sourdough Bread           | Assets/Accounts Receivable | Liabilities/Taxes/GST        |   0.86
 5 | Sale - French Baquette           | Assets/Accounts Receivable | Revenue/Sales                |  14.97
 6 | Sale - French Baquette           | Assets/Accounts Receivable | Liabilities/Taxes/GST        |   1.95
 7 | Sale - Multigrain Loaf           | Assets/Accounts Receivable | Revenue/Sales                |   6.99
 8 | Sale - Multigrain Loaf           | Assets/Accounts Receivable | Liabilities/Taxes/GST        |   0.90
```

In the above case each `Purchase` transaction resulted in a single entry:
- Debit Account (Expenses/Cost of Sales) -> Credit Account (Liabilities/Accounts Payable) -> Amount (total)

And each `Sale` transaction resulted in two entries:
- Debit Account (Assets/Accounts Receivable) -> Credit Account (Revenue/Sales) -> Amount (total)
- Debit Account (Assets/Accounts Receivable) -> Credit Account (Liabilities/Taxes/GST) -> Amount (tax)
