import app from './api/app.js';

const port = 3001 //port number of server endpoint


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})