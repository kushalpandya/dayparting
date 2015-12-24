/**
 * dayparting v0.1.0
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
            ID_PROP = 'data-daypartattachmentid',
            thisDaypart = {},
            daypartConfig = {};

        var fnIsValidDateObj,
            fnIsValidDOMElement,
            fnGenID,
            fnGetDaypartSlot;

        /**
         * Date object validity check < http://stackoverflow.com/a/1353711/414749 >.
         */
        fnIsValidDateObj = function(dateObj) {
            if (Object.prototype.toString.call(dateObj) === '[object Date]')
            {
                if (!isNaN(dateObj.getTime()))
                    return true;
            }

            return false;
        };

        /**
         * DOM element validity check < http://stackoverflow.com/a/384380/414749 >.
         */
        fnIsValidDOMElement = function(el) {
            return (
                typeof HTMLElement === "object" ?
                            el instanceof HTMLElement : //DOM2
                            el && typeof el === "object" && el !== null && el.nodeType === 1 && typeof el.nodeName==="string"
            );
        };

        /**
         * Generate Timestamp based random Unique IDs.
         */
        fnGenID = function() {
            return Math.floor(Math.random() * 10000000000000001);
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
                lateNight       =   { start: 2300,  end: 2359 },
                lateNightNext   =   { start: 0,   end: 200 },
                overnight       =   { start: 200,   end: 600 };

            var hh = dateObj.getHours(),
                mm = dateObj.getMinutes(),
                fnIsInSlot,
                slotName,
                hhmm;

            fnIsInSlot = function(slotRange, timeval) {
                return (timeval >= slotRange.start && timeval <= slotRange.end);
            };

            hhmm = parseInt((hh < 10 ? ('0' + hh) : hh) + '' + (mm < 10 ? ('0' + mm) : mm)); // Convert hh:mm in 1000s format.

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
            else if (fnIsInSlot(lateNightNext, hhmm))
                slotName = 'lateNight';
            else if (fnIsInSlot(overnight, hhmm))
                slotName = 'overnight';

            return slotName;
        };

        if (typeof config === 'object')
        {
            daypartConfig.locale = config.locale || 'en-US'; // Defaults to en-US locale.
            daypartConfig.localeJSON = (typeof config.localeJSON === 'object') ? config.localeJSON : {}; // Make sure we don't set undefined instead of an object.
            daypartConfig.binding = (typeof config.binding === 'boolean') ? config.binding : false; // Default to 'false' for Live data binding.
        }

        /** Daypart API Begin **/
        thisDaypart.attachments = [];

        /**
         * Resolve instance conflict in case module is loaded more than once.
         */
        thisDaypart.noConflict = function() {
            self.daypart = old_daypart;
            return daypart;
        };

        /**
         * Switches a locale to the provided locale.
         *
         * @param locale a valid locale identifier which is available in localeJSON.
         */
        thisDaypart.setLocale = function(locale) {
            var currentAttachment,
                i;

            if (daypartConfig.localeJSON[locale])
            {
                if (daypartConfig.binding)
                {
                    daypartConfig.locale = locale;
                    
                    for (i = 0; i < this.attachments.length; i++)
                    {
                        currentAttachment = this.attachments[i];
                        currentAttachment.setValue(this.for(currentAttachment.dateValue));
                    }
                }
                else
                    throw new Error("Binding not enabled on this Daypart instance.");
            }
            else
                throw new Error("Locale not available for: " + locale);
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

        /**
         * attach method of daypart, sets string representation of part of day from provided
         * Date object and attaches daypart locale switch to the provided Element.
         *
         * @param dateObj a valid Date object.
         * @param targetEl DOM element to attach with.
         */
        thisDaypart.attach = function(dateObj, targetEl) {
            var datepartSlot,
                currLocaleDaypart = daypartConfig.localeJSON[daypartConfig.locale],
                attachmentId,
                attachment;

            if (fnIsValidDOMElement(targetEl))
            {
                // Generate Unique ID for this attachment.
                attachmentId = fnGenID();
                targetEl.setAttribute(ID_PROP, attachmentId);

                // Create attachment object.
                attachment = {
                    id: attachmentId,
                    el: targetEl,
                    dateValue: dateObj,
                    setValue: function(value) {
                        this.el.innerText = value;
                    }
                };

                // Set Daypart value for current locale.
                attachment.setValue(this.for(dateObj));

                // Put attachment to a collection for later updates.
                this.attachments.push(attachment);

                return attachmentId;
            }
            else
                throw new Error("targetEl is not a valid DOM Element.");

            return false;
        };

        /** Daypart API end **/

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
