---
title: Backend
date: 2025-01-19
category: Technology
excerpt: Backend of web development
coverImage: https://www.appsyoda.com/blogimages/expressjs-nodejs.png
tags:
  - node
  - express
  - framework
---
**Asynchronous JavaScript**
- In general, Synchronous JavaScript reads line by line and executes the function. 
- Synchronous js will directly execute in main stack. 
- Meanwhile, if async js is present in the code, synchronous js execute directly in main stack while async js is moved to side stack.
- In side stack, the async code is processed but not executed.
- After the completion of every synchronous code in the main stack, async code is pushed to main stack then executed 

```javascript
async function test(){
const blob = await fetch ('https://randomuser.me/api/');
const result = await blob.json();
console.log(result);
}
test()

```

### Node.js 
- A javascript runtime environment
- A js wrapper built by 'Rahn dahl' to execute js code in v8 engine
- npm - node package manager 
	- A playstore/ appstore for node and other js frameworks
	- install in https://www.npmjs.com

### Modules
- Node.js comes default by many modules, popular ones;
	- HTTP
	- File system
	-  Path
##### File System module (fs)
- It can be added by:
```javascript
	const fs = require('fs');
```
- fs contains many API functions thats used to deal with backend problems
	- Using only a simple code we can create a file backup based on `fs.writeFile()` and `fs.copyFile()`.
> Handling with files in node.js can lead to debouncing, so its better to add debouncing function to the code to prevent debouncing 

```js
function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
```
this debounce create a delay for the function, so that a single click cannot return with multiple responses. 
