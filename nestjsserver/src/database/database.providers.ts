import * as mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose-fix';
import * as config from 'config';

// tslint:disable-next-line
export const databaseProviders: any = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<mongoose.Connection> => {
      // tslint:disable-next-line
      (mongoose as any).Promise = global.Promise;
      const dbConnection: mongoose.Connection = mongoose.connection;

      switch (process.env.NODE_ENV) {
        case 'test': {
          const { host } = config.get('dbConfigTest');
          const mockgoose: Mockgoose = new Mockgoose(mongoose);

          mockgoose.helper.setDbVersion('3.4.3');
          mockgoose.prepareStorage().then(async () => await mongoose.connect(host));
          break;
        }

        default: {
          const { host } = config.get('dbConfig');
          await mongoose.connect(host, { useNewUrlParser: true });
        }
      }

      return dbConnection;
    },
  },
];
