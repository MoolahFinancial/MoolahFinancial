import 'reflect-metadata';
import { MockProviderProvider } from '../mocks/mock.provider';

/**
 * Block level variable for assigning the Mock DatesProvider service to
 *
 */
let provider = null

/**
 * Re-create the MockDatesProvider class object before each
 * unit test is run
 *
 */
beforeEach(() => {
   provider         = new MockProviderProvider();

});



/**
 * Group the unit tests for the MockPoviderProvider into one
 * test suite
 *
 */
describe('Rest Provider', () =>
{
   /**
    * Test that we get user data from the database
    *
    */
   test('Connected to the User API', () =>
   {
      expect.assertions(1);
      let users = provider.getUsers();

      expect(users).toBeDefined();
   });
   test('Connected to the Portfolio API', () =>
   {
      expect.assertions(1);
      let portfolios = provider.getPortfolios();

      expect(portfolios).toBeDefined();
   });
});
