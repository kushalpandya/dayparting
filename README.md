Dayparting
======================

A Dayparting micro library to present time of day in Dayparts.

Example; _8:00 AM_ **=>** _Early Morning_

It follows standard dayparting conventions (read more about Dayparting on [Wikipedia](https://en.wikipedia.org/wiki/Dayparting)).

###Example
![Example Results](http://i.imgur.com/BYarKj3.png)

###Usage
---
####In web browser
Include `dayparting.js` like your any other JS file using `script` tag in your page `<head>`.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
	<title>My Webpage</title>
	...
	...
	<script type="text/javascript" src="js/dayparting.js"></script>
</head>
```

####In Node Environment
Install `dayparting` using `npm`
```javascript
npm install dayparting --save-dev
```
Use `require` to load Dayparting module.

```javascript
var dayparting = require('dayparting');
```
- **Initialize:**
Instantiate the `dayparting` with a locale configuration.

```javascript
var myDaypart = daypart({
	locale: 'en-US',
	localeJSON: {
		"en-US": {
	        "earlyMorning": "Early Morning",
	        "lateMorning": "Late Morning",
	        "afternoon": "Afternoon",
	        "earlyFringe": "Early Fringe",
	        "lateFringe": "Late Fringe",
	        "lateNight": "Late Night",
	        "overnight": "Overnight",
	        "primeAccess": "Prime Access",
	        "primeTime": "Prime Time"
	    }
	}
});
```

This will set `en-US` as default locale for `myDaypart` and use given `localeJSON`, note that structure of `localeJSON` config follow [ICU Message Syntax](http://userguide.icu-project.org/formatparse/messages) where keynames has to be same as given in the example. You can have strings for multiple locales within same `localeJSON` like;

```javascript
{
	"en-US": {
        "earlyMorning": "Early Morning",
        "lateMorning": "Late Morning",
        ...
        ...
        "primeTime": "Prime Time"
    },
    "fr_FR": {
	    "earlyMorning": "Tôt le matin",
        "lateMorning": "Tard dans la matinée",
        ...
        ...
        "primeTime": "Prime Time"
    }
}
```
- **Call:**
Daypart provides a method `for()` which accepts `date` object as a parameter, and returns string representation for the time within that date object.

```javascript
var date = new Date();

date.setHours(13);
date.setMinutes(15);

myDatepart.for(date); // returns 'Afternoon'
```

###Version Information
---
* 1.0.0 - First Release.

###Author
---
[Kushal Pandya](https://doublslash.com)
