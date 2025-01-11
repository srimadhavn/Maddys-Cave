---
title: Node.js
date: 2025-01-10
category: Technology
excerpt: Node.js and its backend capabilites!
coverImage: https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg
tags:
  - js
  - Framework
  - backend
---
Before node.js,

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
