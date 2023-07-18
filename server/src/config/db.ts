import { connect } from 'mongoose';

export default async (DB: string) => {
  const options: any = {
    dbName: 'simplicityDB',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  };

  connect(DB, options)
    .then(() => {
      console.log('DB CONNECTION SUCCESSFUL!');
    })
    .catch((err) => console.log(`An error occurred: ${err}`));
};
