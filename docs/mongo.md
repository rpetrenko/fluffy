## mongodb notes
- show dbs

- use db_name (will create new database if it was not found above)

- after you switch to database drop it with 
>db.dropDatabase()

- create collection:
>db.createCollection("collection_name", { capped : true, autoIndexID : true, size : 6142800, max : 10000 } )

- drop collection
>db.collection_name.drop()

- insert an entry to a collection
>db.collection_name.insert({
   _id: ObjectId(7df78ad8902c),
   title: 'MongoDB Overview', 
   description: 'MongoDB is no sql database',
   by: 'tutorials point',
   url: 'http://www.tutorialspoint.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 100
})

- find entry with title = "second title"
> db.fluffy.find({"title": "second title"}).pretty()
 {
 	"_id" : ObjectId("5412682559d4a14179abe616"),
 	"title" : "second title",
 	"description" : "MongoDB is no sql database",
 	"by" : "tutorials point",
 	"url" : "http://www.tutorialspoint.com",
 	"tags" : [
 		"mongodb",
 		"database",
 		"NoSQL"
 	],
 	"likes" : 100
 }
 
- update collection entry
>db.mycol.update({'title':'MongoDB Overview'},{$set:{'title':'New MongoDB Tutorial'}})

- save method completely replaces the record with new data
>db.COLLECTION_NAME.save({_id:ObjectId(object_id_goes_here),NEW_DATA})

- delete a record
>db.mycol.remove({'title':'MongoDB Overview'})


