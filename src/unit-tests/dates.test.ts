import 'reflect-metadata';
import { MockDatesProvider } from '../mocks/mock.dates';


/**
 * Block level variable for assigning the Mock DatesProvider service to
 *
 */
let date 				= null;



/**
 * Re-create the MockDatesProvider class object before each
 * unit test is run
 *
 */
beforeEach(() => {
   date         = new MockDatesProvider();

});



/**
 * Group the unit tests for the MockDatesProvider into one
 * test suite
 *
 */
describe('Dates service', () =>
{
   /**
    * Test that the total months of the year are returned
    *
    */
   test('Returns all of the months of the year', () =>
   {
      expect.assertions(2);
      let months              = date.returnMonthsOfTheYear(),
          expected            = ['July', 'November'];

      expect(months).toHaveLength(12);
      expect(months).toEqual(expect.arrayContaining(expected));
   });



   /**
    * Test that the current month is returned
    *
    */
   test('Returns the current month', () =>
   {
      expect.assertions(1);
      let currentMonth        = date.returnCurrentMonth();

      expect(currentMonth).toBe("November");
   });



   /**
    * Test that the current timestamp is returned
    *
    */
   test('Returns the current timestamp', () =>
   {
      expect.assertions(1);
   	let timestamp         = date.returnCurrentTimestamp();
   	expect(timestamp).toBeGreaterThanOrEqual(Math.floor(Date.now()/1000));
   });




});
