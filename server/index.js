const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const budgets = [
  {
    name: 'Groceries',
    amount: 500,
    remaining: 325,
    daysUntilReset: 13,
  },
  {
    name: 'Eating Out',
    amount: 200,
    remaining: 125,
    daysUntilReset: 13,
  },
  {
    name: 'Entertainment',
    amount: 500,
    remaining: 125,
    daysUntilReset: 13,
  },
  {
    name: 'Utilities',
    amount: 400,
    remaining: 0,
    daysUntilReset: 13,
  },
  {
    name: 'Mortgage',
    amount: 1500,
    remaining: 0,
    daysUntilReset: 13,
  },
]

app.prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))

    server.get('/api/getEnvelopes', (req, res) => {
      res.send(budgets)
    })

    server.get('/api/getEnvelopes/:id', (req, res) => {
      const { id } = req.params;
      const item = budgets.find(item => item.name === id)
      item !== undefined ? res.send(item) : res.status(404).send();
    })

    server.put('/api/updateEnvelope', (req, res) => {
      const { name, amount } = req.body;
      const item = budgets.find(item => item.name === name);
      const itemIdx = budgets.indexOf(item);
      budgets[itemIdx].amount = amount;
    })

    server.post('/api/newEnvelope', (req, res) => {
      const newItem = req.body;
      newItem === undefined ? res.status(400).send() : budgets.push(newItem);
    })

    server.delete('/api/deleteEnvelope/:name', (req, res) => {
      const { name } = req.params;
      const item = budgets.find(item => item.name === name);
      const itemIdx = budgets.indexOf(item);
      budgets.splice(itemIdx, 1);
    })


    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })