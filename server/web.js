import express from "express";
import path from 'path';
import { graphqlHTTP } from "express-graphql";
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import root from './src/root';
import schema from './src/schema';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

import session from 'express-session';
import cookieParser from 'cookie-parser'

import {accessKeyId, secretAccessKey} from './awsconfig.json';

const app = express();
const prisma = new PrismaClient();

app.use(cookieParser());
app.use(session({ 
  secret: 'cat', 
  resave: false,
  saveUninitialized: true,
}))

app.use(cors({
  "origin": "http://localhost:3000",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "credentials": true,
  // "preflightContinue": true,
  "optionsSuccessStatus": 204
}));


AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: 'ap-northeast-2'
});

const s3 = new AWS.S3();

const upload = multer({
  dest: 'images/'
  // 이미지를 S3에 저장하는 방법
  // storage: multerS3({
  //   s3: s3,
  //   bucket: "nsarang",
  //   contentType: multerS3.AUTO_CONTENT_TYPE,
  //   acl: 'public-read',
  //   key: (req, file, cb) => {
  //     console.log(file);

  //     cb(null, file.originalname)
  //   }
  // }),
  // limits: { fileSize: 5 * 1024 * 1024 },
})

app.post('/post/img', upload.single('img'), (req, res) => {
  console.log('req.file: ', req.file);
  try {
    res.json(`http://${req.headers.host}/${req.file.path}`);
  } catch (err) {
    console.log(err);
  }
});

let liveInfo = {
  url: '1_NLzcoIMic', 
  time: 0
};

app.use('/live', async(req, res) => {
  if (req.method === 'POST') {
    liveInfo.url = req.query.url;
    liveInfo.time = Date.now();
    res.send('success');
  } else if (req.method === 'GET') {
    res.send(liveInfo);
  }
})


app.use('/graphql', (req, res, next) => {
  if (req.method === 'DELETE' || req.method === 'PUT') req.method = 'POST';
  next();
})

app.use('/graphql', graphqlHTTP(async(req, res) => 
  ({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: { prisma, req, res },
  })
));

app.use('/images', express.static('images'));
app.use(express.static(path.join(__dirname, './views')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/index.html'));
})

app.listen(4000);
console.log('Running GraphQL API server')