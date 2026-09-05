const express = require('express');
const path = require('path');
const os = require('os');
 
const pageRoutes = require('./routes/pages');
 
const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(express.static(path.join(__dirname, 'public')));
 
// All page routes are defined in routes/pages.js and pulled in here
app.use('/', pageRoutes);
 
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Platform: ${os.platform()}`);
});
 