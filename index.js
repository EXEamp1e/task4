const express = require('express');
const app = express();

// Middleware для обработки CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'x-test, ngrok-skip-browser-warning, Content-Type, Accept, Access-Control-Allow-Headers');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Middleware для парсинга тела запроса как текста
app.use(express.text({ type: '*/*' }));

// Обработчик для маршрута /result4/
app.all('/result4/', (req, res) => {
  const xTestHeader = req.headers['x-test'] || '';
  const body = req.body || '';
  
  const responseData = {
    message: '038acec6-645a-4adb-a5ec-4fc12f83e8b8',
    'x-result': xTestHeader,
    'x-body': body
  };
  
  res.json(responseData);
});

// Обработчик для корневого маршрута
app.get('/', (req, res) => {
  res.json({ 
    info: 'Use /result4/ endpoint',
    example: 'Send request with x-test header and body to get response'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
