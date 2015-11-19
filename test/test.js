/**
 * dayparting  tests v0.1.0
 *
 * Author: Kushal Pandya <kushalspandya@gmail.com> (https://doublslash.com)
 * Date: 18 November, 2015
 *
 * Dayparting Test Script for Mocha and Chai.
 */
var should = require('chai').should(),
    dayparting = require('../dayparting'),
    localeJSON = require('../locale.json'),
    currentLocale = 'en-US',
    myDaypart;

myDaypart = dayparting({
    locale: currentLocale,
    localeJSON: localeJSON
});

describe('#daypart.for()', function() {
    it('Shows 7:00 AM as Morning', function() {
        var date = new Date();

        date.setHours(7);
        date.setMinutes(0);

        myDaypart.for(date).should.equal(localeJSON[currentLocale]['earlyMorning']);
    });

    it('Shows 10:30 AM as Late Morning', function() {
        var date = new Date();

        date.setHours(10);
        date.setMinutes(30);

        myDaypart.for(date).should.equal(localeJSON[currentLocale]['lateMorning']);
    });

    it('Shows 1:15 PM as Afternoon', function() {
        var date = new Date();

        date.setHours(13);
        date.setMinutes(15);

        myDaypart.for(date).should.equal(localeJSON[currentLocale]['afternoon']);
    });

    it('Shows 6:20 PM as Early Fringe', function() {
        var date = new Date();

        date.setHours(18);
        date.setMinutes(20);

        myDaypart.for(date).should.equal(localeJSON[currentLocale]['earlyFringe']);
    });

    it('Shows 9:10 PM as Late Fringe', function() {
        var date = new Date();

        date.setHours(21);
        date.setMinutes(10);

        myDaypart.for(date).should.equal(localeJSON[currentLocale]['lateFringe']);
    });

    it('Shows 11:30 PM as Late Night', function() {
        var date = new Date();

        date.setHours(23);
        date.setMinutes(30);

        myDaypart.for(date).should.equal(localeJSON[currentLocale]['lateNight']);
    });

    it('Shows 3:00 AM as Overnight', function() {
        var date = new Date();

        date.setHours(3);
        date.setMinutes(0);

        myDaypart.for(date).should.equal(localeJSON[currentLocale]['overnight']);
    });
});
