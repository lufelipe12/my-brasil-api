const axios = require("axios");

const api = axios.create({
  baseURL: "https://brasilapi.com.br",
});

module.exports = api;
