---
title: MongoDB
date: 2025-01-20
category: Technology
excerpt: Learn about NOSQL and mongoDB and connection with express.js
coverImage: https://s3.amazonaws.com/info-mongodb-com/_com_assets/cms/kuzt9r42or1fxvlq2-Meta_Generic.png
tags:
  - Database
  - SQL
  - RDBMS
---

# SQL vs NoSQL
- SQL are Relational Databases whereas, NoSQL are non-relational or distributed database.
**Popular SQL databases**
- MySQL
- PostgreSQL
- SQLite

**Popular NoSQL Databases**
- MongoDB
- Redis
- Amazon DynamoDB

## MongoDB
- A popular NoSQL database
- Datas are stored in the form of key-value pair.
### Inserting :
- In mongoDB, objects are stored in a collection, To create a collection: `db.createCollection("cats")`
	- This will create a collection named 'cats'
- To insert datas(objects) into the mongoDB collection, 2 methods can be used

		1. `db.insertOne({document})`
		2. `db.insertMany({documents})`

	- Examples:
```
db.insertOne({
	name : "siamese",
	gender : "female",
	age : 3
	})
```

```
db.insertMany([
{
name : "Persian",
gender : "male",
age : 2
},
{
name : "Russian",
gender : "male",
age : 8
}]
	)
```

### Finding : 
- In mongoDB, objects inside the collections can be accessed by using the `find()` method.
- To find everything in the collection, `db.cats.find()` -> This results in every documents present in the collection named cats.
