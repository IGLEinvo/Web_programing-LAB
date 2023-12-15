const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Підключення до бази даних MySQL
const dbConfig = {
  host: '127.0.0.1', 
  user: 'root', 
  password: 'oko200505', 
  database: 'treasures_db' 
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Помилка підключення до бази даних: ' + err.stack);
    return;
  }
  console.log('Підключено до бази даних з ID ' + connection.threadId);
});


app.get('/treasures', (req, res) => {
  const sql = 'SELECT * FROM treasures'; 
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Помилка запиту до бази даних: ' + err.stack);
      return res.status(500).send('Помилка сервера');
    }
    res.json(results);
  });
});

app.post('/treasures', (req, res) => {
  const newTreasure = req.body;
  // Додаю новий скарб та отримую його ідентифікатор
  const sql = 'INSERT INTO treasures (name, description, price) VALUES (?, ?, ?)'; 
  connection.query(sql, [newTreasure.name, newTreasure.description, newTreasure.price], (err, result) => {
    if (err) {
      console.error('Помилка запиту до бази даних: ' + err.stack);
      return res.status(500).send('Помилка сервера');
    }
    newTreasure.treasureId = result.insertId; // ID скарбу
    res.status(201).json(newTreasure);
  });
});

app.put('/treasures/:id', (req, res) => {
  const treasureId = req.params.id;
  const editedTreasure = req.body;

  const sql = 'UPDATE treasures SET name = ?, description = ?, price = ? WHERE treasureId = ?'; // Замість 'treasures' - назва вашої таблиці
  connection.query(sql, [editedTreasure.name, editedTreasure.description, editedTreasure.price, treasureId], (err, result) => {
    if (err) {
      console.error('Помилка запиту до бази даних: ' + err.stack);
      return res.status(500).send('Помилка сервера');
    }
    res.status(200).json({ message: 'Скарб відредаговано' });
  });
});

app.delete('/treasures/:id', (req, res) => {
  const treasureId = req.params.id;
  const sql = 'DELETE FROM treasures WHERE treasureId = ?'; 
  connection.query(sql, [treasureId], (err, result) => {
    if (err) {
      console.error('Помилка запиту до бази даних: ' + err.stack);
      return res.status(500).send('Помилка сервера');
    }
    res.status(204).send(); // Відповідь про успішне видалення
  });
});

app.get('/treasures', (req, res) => {
  const sortBy = req.query.sortBy;
  let sql = 'SELECT * FROM treasures';

  if (sortBy === 'price') {
    sql += ' ORDER BY price'; // Сортування за ціною
  }

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Помилка запиту до бази даних: ' + err.stack);
      return res.status(500).send('Помилка сервера');
    }
    res.json(results);
  });
});

app.get('/treasures', (req, res) => {
  const name = req.query.name;
  let sql = 'SELECT * FROM treasures';

  if (name) {
    sql += ` WHERE name LIKE '%${name}%'`; // Пошук скарбів за іменем
  }

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Помилка запиту до бази даних: ' + err.stack);
      return res.status(500).send('Помилка сервера');
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Сервер слухає на порту ${port}`);
});
