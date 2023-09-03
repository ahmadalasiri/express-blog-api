import { devLogger } from './devLogger';
import { prodLogger } from './prodLogger';

let logger: any;

if (process.env.NODE_ENV === 'production') {
  logger = prodLogger;
} else {
  logger = devLogger;
}

export default logger;
