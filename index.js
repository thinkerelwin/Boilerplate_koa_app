"use strict";

const http = require("http");
const Koa = require("koa");
const helmet = require("koa-helmet");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const compress = require("koa-compress");

const dotenv = require("dotenv").config();
const { name: apiName, version } = require("./package.json");
const router = require("./router/");
const PORT = process.env.PORT || 3000;
const app = new Koa();

app.use(logger());
app.use(helmet());
app.use(bodyParser());
app.use(cors());

const server = http.createServer(app.callback());
app.use(compress());
app.use(router.routes());

server.listen(PORT, async () => {
  console.log(`${apiName} Ver. ${version} listening ${PORT}`);
});
