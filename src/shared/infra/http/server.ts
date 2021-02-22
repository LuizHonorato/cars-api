import express from 'express';
import cors from 'cors';

import '@shared/infra/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3333, () => {
  console.log('Cars API started on port 3333! 🚀️');
});
