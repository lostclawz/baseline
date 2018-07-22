import { expect } from 'chai';
import sinon from 'sinon';
import {queryString} from '../requests';


describe('request utils', function () {

   // beforeEach(() => {})

   describe('queryString(queryObj)', () => {
      it(`returns a query string reducing key value pairs of passed object`, () => {
         let query = {"test": "1"};
         expect(
            queryString(query)
         ).to.equal("?test=1");
      });
      it(`ignores values for undefined keys`, () => {
         let query = {"test": undefined};
         expect(queryString(query)).to.equal("?test");
         query = {
            "test": undefined,
            "another_key": "true"
         };
         expect(queryString(query)).to.equal("?test&another_key=true");
      })
   })

})