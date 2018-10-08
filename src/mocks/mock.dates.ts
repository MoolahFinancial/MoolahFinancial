import { Injectable } from '@angular/core';


@Injectable()
export class MockDatesProvider
{


   /**
    * Months of the year
    */
   private _MONTHS : any =  [ "January",
       	   					  "February",
       	   					  "March",
       	   					  "April",
       	   					  "May",
       	   					  "June",
       	   					  "July",
       	   					  "August",
       	   					  "September",
       	   					  "October",
       	   					  "November",
       	   					  "December" ];

   constructor()
   {}




   /**
    *
    * Determines whether a date value needs a leading zero to be added to it or not
    *
    * @method addLeadingZerosToDateValueIfRequired
    * @return {String}
    *
    */
   addLeadingZerosToDateValueIfRequired(digit : number) : string
   {
       let num  : any      =   digit;
       if(num < 10)
       {
           num        =   '0' + num;
       }
       return num;
   }




   /**
    *
    * Return all of the months of the year
    *
    * @public
    * @method returnMonthsOfTheYear
    * @return {Array}
    *
    */
   returnMonthsOfTheYear() : any
   {
      return this._MONTHS;
   }




   /**
    *
    * Return the current date (Year, month & day format)
    *
    * @public
    * @method returnCurrentMonth
    * @return {String}
    *
    */
   returnCurrentMonth() : any
   {
       let currDate       : any    =   new Date(),
       	   currMonth      : any    =   this._MONTHS[currDate.getMonth()];
       return currMonth;
   }





   /**
    *
    * Return the current date (Year, month & day format)
    *
    * @public
    * @method returnCurrentDate
    * @return {String}
    *
    */
   returnCurrentDate() : any
   {
       let currDate       : any    =   new Date(),
           currYear       : any    =   currDate.getFullYear(),
           currMonth      : any    =   this.addLeadingZerosToDateValueIfRequired((currDate.getMonth() + 1)),
           currDay        : any    =   this.addLeadingZerosToDateValueIfRequired(currDate.getDate()),
           currDateValue  : any    =   currYear + '-' + currMonth + '-' + currDay;

       return currDateValue;
   }




   /**
    *
    * Return the current timestamp
    *
    * @public
    * @method returnCurrentTimestamp
    * @return {Integer}
    *
    */
   returnCurrentTimestamp() : number
   {
       let currentTimestamp : number  =   Math.floor(Date.now()/1000);
       return currentTimestamp;
   }


}
