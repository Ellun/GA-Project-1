// 'use strict'
// import express from 'express';
// import path from 'path';
// import logger from 'morgan';
const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

app.use( logger( 'dev' ) );
app.use( express.static( path.join( __dirname, 'public') ) );
// app.use( bodyParser.urlencoded( { extended: false } ) );
// app.use( bodyParser.json() );

// app.use( '/users', userRoutes );
// app.use( '/score', expressJWT({secret:SECRET}), scoreRoutes );

app.get( '*', ( req,res ) => {
  res.sendFile( path.join( __dirname,'public/index.html') )
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Ayyyeeeeeee Sexyyy Lady! ', port);
});
