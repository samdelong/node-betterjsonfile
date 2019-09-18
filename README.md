# Node.js - betterjsonfile
<i>Note - Not affiliated with node-jsonfile</i><br />
Seamlessley manage JSON files in Node.js.

# Installation

```
npm install --save betterjsonfile
```

# How to use
No complex API

```javascript
const bjson = require('betterjsonfile')
var myVar = bjson('./file.json')

// Now, just use it as a normal JSON object. Changes will be saved automatically.

myVar.name = "Sam"

```

Inner objects are saved automatically as well

```javascript

myVar.list = {
  friends: []
}
myVar.list.friends.push('David')

```

# Advanced usage
You can also have betterjsonfile write in the background
```javascript
// Non-synchronous
require('betterjsonfile')('./test.json',false)
```
