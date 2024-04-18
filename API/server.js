const express = require ('express');
const mysql = require ('mysql');
const port = 3000;
const cors = require ('cors');
const app = express ();
app.use(cors());
const sha1 = require('sha1');
