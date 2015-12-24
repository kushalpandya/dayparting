Dayparting
======================

A Dayparting micro library to present time of day in Dayparts.

i.e. _8:00 AM_ **=>** _Early Morning_

It follows standard dayparting conventions (read more about Dayparting on [Wikipedia](https://en.wikipedia.org/wiki/Dayparting)).

###Example
![Example Results](http://i.imgur.com/BYarKj3.png)

###Configure
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

###Use
---

####Basic Usage
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

This will set `en-US` as default locale for `myDaypart` and use given `localeJSON`, note that structure of `localeJSON` follows [ICU Message Syntax](http://userguide.icu-project.org/formatparse/messages) where keynames have to be same as given in the example. You can have strings for multiple locales within same `localeJSON` like (and thus load external JSON file containing strings for multiple locales);

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

#### Use with Databinding
- **Initialize**
During initialization, along with `locale` and `localeJSON`, you can provide `binding` to enable data-binding on elements, it is `false` by default.

```javascript
var myDaypart = daypart({
	locale: 'en-US',
	localeJSON: {
		"en-US": {
	        "earlyMorning": "Early Morning",
	        ....
	        "primeTime": "Prime Time"
	    }
	},
	binding: true
});
```
- **Attaching Elements**
Once `myDaypart` is initialized and you have DOM with existing elements as follows;

```html
<div class="container">
	Will be aired at tomorrow 7:06 PM <label id="showTime"></label>
</div>
```

Use `attach()`  to add elements which will be bound to Daypart.

```javascript
myDaypart.attach(new Date(2015, 12, 24, 19, 06), document.getElementById('showTime'));
```

This will automatically set string for `7:06 PM` in the label with `en-US` locale.

- **Switch Locales**
Once elements are attached with `daypart` object, simply call `setLocale` on the object and contents of all the attached elements will be updated automatically.

```javascript
myDaypart.setLocale('fr-FR');
```


###Version Information
---
* 0.2.0 - Added support for one-way data-binding to enable live locale switch, bug fixes.
* 0.1.1 - Minor refactoring, README updated.
* 0.1.0 - First Release.

###Author
---
[Kushal Pandya](https://doublslash.com)
