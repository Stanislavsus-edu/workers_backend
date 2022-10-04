const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const cors = require('koa2-cors');
const faker = require('@faker-js/faker');
var slow = require('koa-slow');

const app = new Koa();
app.use(slow({
  delay: 5000
}));

// Body Parsers
app.use(koaBody({ json: true, text: true, urlencoded: true }));

// CORS
app.use(
  cors({
    origin: '*',
    credentials: true,
    'Access-Control-Allow-Origin': true,
    allowMethods: ['GET'],
  })
);

const router = new Router();
faker.locale = "ru";

router.get('/news', async (ctx) => {
  const newsList = [];

  // FAKER data
  for (let i = 0; i < 5; i +=1) {
    const news = {
      id: faker.datatype.uuid(),
      received: Date.now(),
      image: faker.image.avatar(),
      body: faker.lorem.paragraph(),
    };
    newsList.push(news);
  };

  ctx.response.body = newsList;
});

app.use(router.routes()).use(router.allowedMethods());


const port = process.env.PORT || 7079;
const server = http.createServer(app.callback());
server.listen(port, () => console.log('Server started'));