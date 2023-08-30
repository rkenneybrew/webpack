# Devbug

Debug your node app with a much better console.log() alternative. Devbug will do a better job formatting the variables you want to output and allow you
to choose colors so you don't get confused when debugging. Additionally, devbug provides you with a master on-off switch so you can
disable all your debug outputs for production.

## Installation

```
npm install --save devbug
```


## Usage

First create a property called debugmode in your local package.json file:

```
...
"dependencies": {
    "mocha": "^3.5.3",
    "nyc": "^11.2.1"
  },
"debugmode": true
```

Then simply pull out the methods you need and use them:

```
const {dbg,colors} = require('devbug');

dbg(<summary>,<variable to display>,<color>);
```


## Examples

### Debugging

**Reminder:** *In your package.json file make sure you add a property called 'debugmode' and set it to true for this to work:*

```
const {dbg,colors} = require('devbug');

const plotPoint = {x:3, y:10}
dbg("Temperate weather", plotPoint, colors.WHITE);

plotPoint.x = 5
dbg("Warm weather", plotPoint, colors.YELLOW);

plotPoint.x = 10
dbg("Hot weather", plotPoint, colors.RED);
```

### Messaging

Unlike dbg (above), msg works even when 'debugmode' is set to false:

```
const {msg,colors} = require('devbug');

try {
    return processObject(obj)
  } catch (error) {
    msg('Error', 'There was a problem processing the object', colors.RED);
  }
```

## Support

If you experience any bugs or issues please post a comment here:  <https://github.com/Firebrand/devbug/issues>
Typically it will get responded to and resolved within 24hrs.
Make sure to include the error message as well as the css you are inputting into it.

## License

ISC
