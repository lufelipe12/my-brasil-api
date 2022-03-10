const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const api = require("./Services");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const port = 3000;

app.get("/endereco/:cnpj", async (req, res) => {
  await api
    .get(`/api/cnpj/v1/${req.params.cnpj}`)
    .then((response) => {
      const { uf, cep, bairro, numero, complemento } = response.data;
      const treatedData = {
        uf: uf,
        cep: cep,
        bairro: bairro,
        numero: numero,
        complemento: complemento,
      };
      res.status(200).send(treatedData);
    })
    .catch((_) => {
      const errMsg = {
        message: `CNPJ ${req.params.cnpj} inválido.`,
        type: "bad_request",
        name: "BadRequestError",
      };
      res.status(400).send(errMsg);
    });
});

app.listen(port, () => {
  console.log(`Express started at http://localhost:${port}`);
});
