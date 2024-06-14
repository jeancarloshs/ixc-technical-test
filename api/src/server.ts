import app from './app';

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port http://127.0.0.1:${port}`);
})