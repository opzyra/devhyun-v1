import './env';

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';

import hbs from 'express-handlebars';
import helpers from 'handlebars-helpers';

import hbshelper from '@/lib/hbshelper';
import session from '@/lib/session';
import debug from '@/middleware/debug';
import { endpoint, error } from '@/middleware/error';

import routes from '@/routes';

const app = express();

// 뷰 엔진
app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
    partialsDir: 'views/partials/',
    helpers: Object.assign(helpers(), hbshelper),
  }),
);

app.set('view engine', 'hbs');

if (process.env.NODE_ENV == 'production') {
  app.enable('view cache');
  app.use(compression());
}

// 보안
app.use(helmet());

// 정적파일
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// 바디파서
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 쿠키파서
app.use(cookieParser());

// 디버거
app.use(debug);

// 세션
app.use(session.config);
app.use(session.listener());

// 라우터
app.use(routes);
app.use(endpoint, error);

export default app;
