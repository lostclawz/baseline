import {
   NODE_SERVER_PORT,
   WEBPACK_DEV_SERVER_PORT,
   PUBLIC_DIR,
} from '~/constants';
import find from '~/api/routes/find';
import express from 'express';
import colors from 'colors';


const app = express();

// mongoose.connect(DB_URL);
// var db = mongoose.connection;

// enable CORS for webpack
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', `http://localhost:${WEBPACK_DEV_SERVER_PORT}`);
   // res.setHeader('Access-Control-Allow-Origin', `file://`);
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   res.setHeader('Access-Control-Allow-Credentials', true);
   next();
});

// static assets
app.use(express.static(PUBLIC_DIR));

// routes
app.use('/find', find);

// start listening
app.listen(NODE_SERVER_PORT, () => {
   // launchFile(`http://localhost:${NODE_SERVER_PORT}`);
   console.log(`Server ready on ${colors.red(`port ${NODE_SERVER_PORT}`)}`);
});
