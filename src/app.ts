import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import postmanToOpenApi from 'postman-to-openapi';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import DB from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import multer from 'multer';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.initial404();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    DB.sequelize
      .authenticate()
      .then(() => logger.info('Connected to the database'))
      .catch(err => logger.error(err));
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(multer().fields([{ name: 'file', maxCount: 1 }]));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    if (this.env === 'development') {
      const postmanCollection = `${__dirname}/../seeds_api_doc.postman_collection.json`;
      const outputFile = `${__dirname}/../seeds_api_doc.swagger.yml`;

      postmanToOpenApi(postmanCollection, outputFile, { defaultTag: 'General' })
        .then(() => {
          console.log('Swagger Success Update from Postman');
        })
        .catch(err => {
          console.log('Swagger Error', err);
        });
    }

    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Seeds Documentations',
        },
      },
      apis: ['seeds_api_doc.swagger.yml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  // catch 404 and forward to error handler
  private initial404() {
    this.app.use((req, res) => {
      res.status(200).json({ statusCode: '404', success: false, data: req.headers['user-agent'], message: `${req.originalUrl} not found` });
    });
  }
}

export default App;
