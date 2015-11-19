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
        var thisDaypart = this,
            TODAY = new Date(),
            daypartConfig,
            isValidDateObj;

        /**
         * Date object validity check < http://stackoverflow.com/a/1353711/414749 >.
         */
        isValidDateObj = function() {
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
         * Initialize Locale strings.
         */
        thisDaypart.initlocale = function(userLocale) {
            var thisDaypart = this,
                defaultLocale;

            if (typeof userLocale === 'object')
                thisDaypart.locale = userLocale;
        };

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
            if (isValidDateObj(dateObj))
            {
                console.log('This is chaos', dateObj);
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
