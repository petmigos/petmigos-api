import { Company } from "../../domain/entities/Company";

const express = require('express');
const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

app.post('/signup-company', async (req, res) => {
    try {
      const user = new Company({
        cnpj: req.body.cnpj,
        category: req.body.category,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        signature: req.body.signature,
        password: req.body.password
      });
  
      await user.save();
  
      res.status(201).send({ message: 'Empresa cadastrada com sucesso' });
    } catch (error) {
      res.status(400).send({ message: 'Erro ao cadastrar empresa' });
    }
  });