import { build } from './src/app';
import { PORT, HOST } from './src/environment'

build()
  .then(app => {
    // run the server!
    app.listen(PORT, HOST, (err, address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }

      app.log.info(`server listening on ${address}`);

      process.on('SIGINT', () => app.close());
      process.on('SIGTERM', () => app.close());
    });
  });
  
