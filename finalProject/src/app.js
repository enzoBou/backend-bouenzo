import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from 'socket.io';
import mongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import displayRoutes from 'express-routemap';
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import * as dotenv from 'dotenv';
import cartRouter from './routes/cart.router.js';
import chatRouter from './routes/chat.router.js';
import emailRouter from './routes/email.router.js';
import productsRouter from './routes/products.router.js';
import sessionRouter from './routes/session.router.js';
import viewsRouter from './routes/views.router.js';
import mockingRouter from './routes/mocking.router.js';
import loggerTest from './routes/loggerTest.js';
import productModel from './dao/models/index.js';
import ProductServiceDao from "./repository/index.js";
import compression from 'express-compression';
import addLogger from './utils/logger.js';

dotenv.config();
const productManager = new ProductServiceDao;
const app = express();
const PORT = 8080;
const MONGO_URL = process.env.MONGO_URL;
const BASE_PREFIX = process.env.BASE_PREFIX;
const httpServer = app.listen(PORT, () => {displayRoutes(app);console.log(`Listening on ${PORT}`);});
const socketServer = new Server(httpServer);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression({
	brotli: {enabled: true, zlib: {} } 
}));
app.use(addLogger);

initializePassport();
app.use(session({
	store: mongoStore.create({
		mongoUrl: MONGO_URL,
		mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true},
		ttl: 60 * 3600,
	}),
	secret:'secretSession',
	rolling: true,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 60 * 3600,
		sameSite: 'strict',
		secure: true
	}
}));
app.use(passport.initialize());

app.engine('handlebars', handlebars.engine());
app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'handlebars');

app.use(`/${BASE_PREFIX}/products`, productsRouter);
app.use(`/${BASE_PREFIX}/cart`, cartRouter);
app.use(`/${BASE_PREFIX}/chat`, chatRouter);
app.use(`/${BASE_PREFIX}/session`, sessionRouter);
app.use(`/${BASE_PREFIX}`, viewsRouter);
app.use(`/mail`, emailRouter);
app.use(`/mockingproducts`, mockingRouter);
app.use(`/${BASE_PREFIX}/loggerTest`, loggerTest);

app.get('/realtimeproducts', async (req, res) => res.status(200).render('realTimeProducts'));

socketServer.on("connection", async socket => {
	console.log('Nuevo cliente conectado');

	const products = await productModel.find({});
	socket.emit('products', products);

	socket.on('addProd', async products => await productManager.addProduct(products));

	socket.on('delProd', async id => await productManager.deleteProductById(id));
});

mongoose.connect(MONGO_URL);
