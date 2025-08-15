const express = require('express');
const serverless = require('serverless-http');
const app = require('../../server'); // Import your Express app

module.exports.handler = serverless(app);