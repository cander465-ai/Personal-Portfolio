const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});
app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'porjects.html'));
});
app.listen(PORT, () => {
    console.log(`Server started listening on http://localhost:${PORT}`);
});