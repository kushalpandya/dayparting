/**
 * dayparting v1.0.0
 *
 * Author: Kushal Pandya <kushalspandya@gmail.com> (https://doublslash.com)
 * Date: 18 November, 2015
 *
 * Main Dayparting Script.
 */

 "use strict";

 (function() {
    var self = this,
        hasRequire = (typeof require !== 'undefined'),
        old_daypart = self.daypart,
        daypart;

    daypart = self.daypart = function(config) {
        var TODAY = new Date(),
            thisDaypart = {},
            daypartConfig = {};

        var fnIsValidDateObj,
            fnGetDaypartSlot;

        /**
         * Date object validity check < http://stackoverflow.com/a/1353711/414749 >.
         */
        fnIsValidDateObj = function(dateObj) {
            if (Object.prototype.toString.call(dateObj) === '[object Date]')
            {
                if (!isNaN(dateObj.getTime()))
                {
                    return true;
                }
            }

            return false;
        };

        /**
         * Resolve appropriate Daypart from the time present in given date object.
         *
         * Core Logic behind Dayparting is in this method, it follows the slots given in https://en.wikipedia.org/wiki/Dayparting.
         * You can change these slots if you're targetting a particular region of the world which has different slots.
         */
        fnGetDaypartSlot = function(dateObj) {
            var earlyMorning    =   { start: 600,   end: 900 },
                lateMorning     =   { start: 900,   end: 1200 },
                afternoon       =   { start: 1200,  end: 1700 },
                earlyFringe     =   { start: 1700,  end: 2000 },
                lateFringe      =   { start: 2000,  end: 2300 },
                lateNight       =   { start: 2300,  end: 200 },
                overnight       =   { start: 200,   end: 600 };

            var hh = dateObj.getHours(),
                mm = dateObj.getMinutes(),
                fnIsInSlot,
                slotName,
                hhmm;

            fnIsInSlot = function(slotRange, timeval) {
                return (timeval >= slotRange.start && timeval <= slotRange.end);
            };

            hhmm = parseInt(hh + '' + (mm < 10 ? ('0' + mm) : mm)); // Convert hh:mm in 1000s format.

            if (fnIsInSlot(earlyMorning, hhmm))
                slotName = 'earlyMorning';
            else if (fnIsInSlot(lateMorning, hhmm))
                slotName = 'lateMorning';
            else if (fnIsInSlot(afternoon, hhmm))
                slotName = 'afternoon';
            else if (fnIsInSlot(earlyFringe, hhmm))
                slotName = 'earlyFringe';
            else if (fnIsInSlot(lateFringe, hhmm))
                slotName = 'lateFringe';
            else if (fnIsInSlot(lateNight, hhmm))
                slotName = 'lateNight';
            else if (fnIsInSlot(overnight, hhmm))
                slotName = 'overnight';

            return slotName;
        };

        if (typeof config === 'object')
        {
            daypartConfig.locale = config.locale || 'en-US'; // Defaults to en-US locale.
            daypartConfig.localeJSON = (typeof config.localeJSON === 'object') ? config.localeJSON : {}; // Make sure we don't set undefined instead of an object;
        }

        /**
         * Resolve instance conflict in case module is loaded more than once.
         */
        thisDaypart.noConflict = function() {
            self.daypart = old_daypart;
            return daypart;
        };

        /**
         * for method of daypart, returns string representation of part of day from provided
         * Date object.
         *
         * @param dateObj a valid Date object.
         */
        thisDaypart.for = function(dateObj) {
            var datepartSlot,
                currLocaleDaypart = daypartConfig.localeJSON[daypartConfig.locale];

            if (fnIsValidDateObj(dateObj))
            {
                datepartSlot = fnGetDaypartSlot(dateObj);
                return currLocaleDaypart[datepartSlot];
            }
            else
                throw new Error("Date is invalid.");
        };

        return thisDaypart;
    };

    // UMD Definition < https://github.com/umdjs/umd >.
    if (typeof exports !== 'undefined')
    {
        if (typeof module !== 'undefined' &&
            module.exports)
        {
            exports = module.exports = daypart;
        }
        exports.daypart = daypart;
    }
    else
    {
        self.daypart = daypart;
    }

 }).call(this);
