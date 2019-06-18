// Data in Database
[{name:"Dhruv",last:"Upadhyay",technology:["angular","react"]},
{name:"Dhruv",last:"Upadhyay",technology:["angular","react","nodejs"]},
{name:"Dhruv",last:"Upadhyay",technology:["react"]}]


db.find({technology:{$in:["angular"]}});

//it will simply find all the objects which have key technolgy in which angular is inlcuded