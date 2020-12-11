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

import {accessKeyId, secretAccessKey} from './awsconfig.json';

const app = express();
const prisma = new PrismaClient();

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: 'ap-northeast-2'
});

const s3 = new AWS.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "nsarang",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      console.log(file);
      cb(null, file.originalname)
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
})

app.post('/post/img', upload.single('img'), (req, res) => {
  try {
      // console.log("req.file: ", req.file.location); // 테스트 => req.file.location에 이미지 링크(s3-server)가 담겨있음 
      res.json(req.file.location);
  } catch (err) {
      console.log(err);
  }
});


app.use(cors({
  "origin": "http://localhost:3000",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "credentials": true,
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));


app.use('/graphql', (req, res, next) => {
  if (req.method === 'DELETE' || req.method === 'PUT') req.method = 'POST';
  next();
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
  context: {
    prisma,
  },
}));




app.use(express.static(path.join(__dirname, './views')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/index.html'));
})

app.listen(4000);
console.log('Running GraphQL API server')