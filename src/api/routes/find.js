import express from 'express';
const router = express.Router();

/**
 *    /ext/?directors        to fetch file json
 */
router.get('/', function (req, res) {
   let {
      params: {ext},
      query
   } = req;
   
   res.setHeader('Content-Type', 'application/json');
   res.send(JSON.stringify({
      response: true  
   }));
})

export default router;