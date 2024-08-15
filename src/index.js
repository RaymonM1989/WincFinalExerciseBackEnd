import 'dotenv/config';
import express          from 'express';
import * as Sentry      from '@sentry/node';

import loginRouter      from './routes/login.js';
import amenitiesRouter  from './routes/amenities.js';
import usersRouter      from './routes/users.js';
import hostsRouter      from './routes/hosts.js';
import propertiesRouter from './routes/properties.js';
import reviewsRouter    from './routes/reviews.js';
import bookingsRouter   from './routes/bookings.js';

import logger           from './middleware/logger.js';
import errorHandler     from './middleware/errorHandler.js';


const app = express();

Sentry.init(
{
    dsn: "https://f4488a291b63bfb66aaaf1872caa814d@o4507768700600320.ingest.de.sentry.io/4507768706498640",
    integrations: 
    [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
      ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
    ],
    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use(logger);

app.use('/login', loginRouter);
app.use('/amenities', amenitiesRouter);
app.use('/users', usersRouter);
app.use('/hosts', hostsRouter);
app.use('/properties', propertiesRouter);
app.use('/reviews', reviewsRouter);
app.use('/bookings', bookingsRouter);

app.get('/', (req, res) => 
{
  res.send('Hello world!');
});

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

app.listen(3000, () => 
{
  console.log('Server is listening on port 3000');
});
