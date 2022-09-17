import App from '@/app';
import validateEnv from '@utils/validateEnv';
import ExampleRoute from './routes/example';

validateEnv();

const app = new App([new ExampleRoute()]);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error
BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

app.listen();
