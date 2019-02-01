import { expect } from 'chai';
import { queryString } from '../requests';


describe('request utils', () => {
   // beforeEach(() => {})

   describe('queryString(queryObj)', () => {
      it('returns a query string reducing key value pairs of passed object', () => {
         const query = { test: '1' };
         expect(
            queryString(query),
         ).to.equal('?test=1');
      });
      it('ignores values for undefined keys', () => {
         let query = { test: undefined };
         expect(queryString(query)).to.equal('?test');
         query = {
            test: undefined,
            another_key: 'true',
         };
         expect(queryString(query)).to.equal('?test&another_key=true');
      });
   });
});
