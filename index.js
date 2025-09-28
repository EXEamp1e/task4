const express = require('express');
const app = express();

// Middleware для статических файлов (если нужно)
app.use(express.static('public'));

// Маршрут /login - возвращает логин
app.get('/login', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send('038acec6-645a-4adb-a5ec-4fc12f83e8b8');
});

// Маршрут /hour - возвращает текущий час по Москве
app.get('/hour', (req, res) => {
  // Создаем дату с московским временем (UTC+3)
  const now = new Date();
  const moscowTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Moscow"}));
  
  // Получаем час и форматируем в HH
  const hour = moscowTime.getHours();
  const formattedHour = hour.toString().padStart(2, '0');
  
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(formattedHour);
});

// Корневой маршрут
app.get('/', (req, res) => {
  res.json({
    message: 'Server is running',
    endpoints: {
      '/login': 'Returns login',
      '/hour': 'Returns current Moscow hour in HH format'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
