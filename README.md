#  ⛱ <span style="color:red">ACME <span style="color:blue">Retirement Investments - <span style="color:green">Plans Participants Funds <span style="color:black">Backend (Mohan's Project #4)

## 1. Technologies used

* HTML, CSS, JavaScript, Google Chrome
* Express Node.js Web App Framework for routing to provide the end points to enable the HTTP requests
* AXIOS the promise based Client HTTP Request processor
* REST (Representational state transfer) Architecture using JavaScript and JSON
* Object-oriented, dynamic, scalable NoSQL database MongoDB on Cloud
* Compass GUI for MongoDB
* Postman API Client was used to test complex HTTP requests and returned JSONs
* Mongoose ODM (Object Data Modeling) library for MongoDB and Node.js
* MongoDB Atlas to connect to cloud service provider of choice - AWS
* Heroku Cloud Application Platform for Deployment
* Deployed at https://retireapp-backend.herokuapp.com/

## 2. Learning Experience

* MongoDB / Mongoose - The NoSQL and Object Oriented Database is new to me and quite exciting. I am used to traditional relational databases like DB2, MS SQL Server, Sybase or Star Schema Focus
* Generating Express API rendered using routes to be consumed by AXIOS frontend. Implementation promise based async/await mechanism

## 3. Approach & Design Components - REST Table, Seeding, Git Repo Maintenance

### 3.1 Planning

    .
    ├── README.md
    ├── app 
    │   ├── models
    │   │   ├── plan.js
    │   │   ├── participant.js
    │   │   └── fund.js
    │   └── routes
    │       ├── articles.js
    │       ├── participants.js
    │       ├── funds.js
    │       └── index.js
    ├── config
    │   └── db.js
    └── server.js

### 3.2 REST Table

Each of tht Plan RESTful routes were coded based on the table below

<table>
<thead>
<tr>
<th>Rt#</th>
<th>Path</th>
<th>HTTP Verb</th>
<th>Purpose</th>
<th>Mongoose Method</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>/plans</td>
<td>GET</td>
<td>List all plans </td>
<td>Plan.find()</td>
</tr>
<tr>
<td>2</td>
<td>/plans/new</td>
<td>GET</td>
<td>Show new plan form</td>
<td>N/A</td>
</tr>
<tr>
<td>3</td>
<td>/plans</td>
<td>POST</td>
<td>Create a new plan, then redirect somewhere</td>
<td>Plan.create()</td>
</tr>
<tr>
<td>4</td>
<td>/plans/:id</td>
<td>GET</td>
<td>Show info about one specific plan</td>
<td>Plan.findById()</td>
</tr>
<tr>
<td>5</td>
<td>/plans/:id/edit</td>
<td>GET</td>
<td>Show edit form for one plan</td>
<td>Plan.findById()</td>
</tr>
<tr>
<td>6</td>
<td>/plans/:id</td>
<td>PUT</td>
<td>Update particular plan, then redirect somewhere</td>
<td>Plan.findByIdAndUpdate()</td>
</tr>
<tr>
<td>7</td>
<td>/plans/:id</td>
<td>DELETE</td>
<td>Delete a particular plan, then redirect somewhere</td>
<td>Plan.findByIdAndRemove()</td>
</tr>
</tbody>
</table>

### 3.3 Seed Processes

Data for the collections were generated using stand alone Seed process listed below

<details>
  <summary>Click to expand!</summary>

```JavaScript
const mongoose = require('mongoose');
const Plan = require('../models/plan');
const Participant = require('../models/participant');
const mongoURI = 'mongodb://localhost/project-2-dev';
mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log('the connection with mongod is established');
  }
);
(async function () {
  //await mongoose.connection.dropCollection('plans');
  //await mongoose.connection.dropCollection('participants');
  // CREATE TWO PARTICIPANTS
  const gates = await Participant.create({
    partName: 'Bill Gates',
    partSsn: '123-45-6789',
    partIsHce: true, // Higly Compensated Employee :D
    partIsActive: true,
  });
  const palat = await Participant.create({
    partName: 'Mohan Palat',
    partSsn: '987-65-4321',
    partIsHce: false, 
    partIsActive: true,
  });
  // CREATE TWO PLANS
  const aesp = new Plan({
    planName: 'ACME Employee Savings Plan',
    planIsInstitutional: true,
    participants: [],
  });
  const map401k = new Plan({
    planName: 'Mom and Pop 401k Plan',
    planIsInstitutional: false,
    participants: [],
  });
  // PUSH THE PARTICIPANTS ONTO THE PLAN'S
  // PARTICIPANTS ARRAY (ASSOCIATE!)
  aesp.participants.push(gates);
  map401k.participants.push(palat); 
  aesp.save(function (err, plan) {
    if (err) {
      console.log(err);
    } else {
      console.log('first plan is ', plan);
    }
  });
  map401k.save(function (err, plan) {
    if (err) {
      console.log(err);
    } else {
      console.log('second plan is ', plan);
    }
  });
})();
```
</details>

### 3.4 Git Repo, Checkpoints to roll back if necessary to ensure prompt delivery of the App

<details>
  <summary>Click to expand!</summary>

    git commit -m "Commit 01 - Repo for retireapp-backend created"
    git commit -m "Commit 02 - Added config/db.js"
    git commit -m "Commit 03 - Added app/routes/index.js"
    git commit -m "Commit 04 - Added ./server.js"
    git commit -m "Commit 05 - Added app/models/plan.js, app/models/participant.js"
    git commit -m "Commit 06 - Added app/routes/plans.js, app/routes/participants.js"
    git commit -m "Commit 07 - app/models/article.js, app/models/article.js" 
    git commit -m "Commit 08 - CREATE, POST, /api/plans = changed to async await"
    git commit -m "Commit 09 - Except for ON - TRUE Mapping MVP is complete "
    git commit -m "Commit 10 - Heroku Deployment"

</details>

## 4. Technical Requirements

Company ACME Retirement Investments deals with clients who will become participants investing in plans which ACME will offer them. Plans are a combination of funds which are investment vehicles which the participants can invest in by buying shares. I was recruited as a full stack deeloper to develop web forms which could maintain all the plans ACME offers, participants who have invested in each plan and their association.  

### 4.1 Problem: 

ACME wants to maintain (Create, Read, Update, Delete) their plans, participants and maybe the funds belonging to the plan and the associations between using a web app.

### 4.2 Solution and who would use it

It will be used by the Plan/Participant Maintenance and Plan Sponsor team to view the plan properties and how they can improve the participant experience on web.

#### 4.2.1 UI Soutioning
Used HTML, CSS, JavaScript, Google Chrome, Express Node.nj Framework routing 

#### 4.2.2 Data Storage Soutioning
MongoDB/Compass and Mongoose ODM with Postman 

#### 4.2.3 Solutioning Cloud Deployment to AWS
Heroku Cloud Application Platform for Deploment

## 5. User Stories and their implementation status

* As a user, I should be able list all the retirement plans of ⛱ ACME Retirement Investments **Status: Complete**
* As a user, I should be able list all the participants of ⛱ ACME Retirement Investments **Status: Complete**
* As a user, I should be able to click on plan and be able to view details (show page) **Status: Complete**
* As a user, when I am on the above show page, I should be able to edit and save the changes **Status: Complete**
* As a user, when I am on the above show page, I should be able delete the plan **Status: Complete**
* As a user, when I am on the above show page, I should be able to go back to plan list page without making any changes **Status: Complete**
* As a user, I should be able to get a web page where I can add a new plan **Status: Complete**
* As a user, when I do data entry the toggle (Y/N) fields must display as check boxes **Status: Complete**

## 6. Unsolved Issues and Future Enhancements

* More fields in the models.
* Currently Full CRUD is available only for Plans. Make it available for Participants and Funds
* Fund Model was added. The model needs to be associated to Plans and Participants and eventually provide pages using Mongoose .populate() method to a) Given a prticipant, list all associated plans and funds b) Given a plan, provide a list of available funds. The JavaScript code for it is already created - ./populate/populatePlan.js as below

<details>
  <summary>Click to expand!</summary>

```JavaScript
const mongoose = require('mongoose');
const Plan = require('../models/plan');
const Participant = require('../models/participant');
const mongoURI = 'mongodb://localhost/project-2-dev';
mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log('the connection with mongod is established');
  }
);
Plan.findOne({ planName: 'Mom and Pop 401k Plan' })
  .populate('participants') // <- pull in part data
  .exec((err, plan) => {
    console.log(plan);
    if (err) {
      return console.log(err);
    }
    if (plan.participants.length > 0) {
      console.log(`Plan: ${plan.planName} Participant: ${plan.participants[0].partName}`);
    } else {
      console.log(`${plan.planName} has no participants.`);
    }
    console.log(`Final. Plan ${plan}`);
  });
```
</details>

## 7. Mongoose Models and MongoDB Associations used

Plan to Participant is one to many relationship
To match with relational databases, implemented with referenced association
Fund to Price is also one to many implemented with embedded form of association

<details>
  <summary>Click to expand!</summary>

```JavaScript
// ****************************************
// *              PLAN                    *
// ****************************************

// PARTICIPANT WITH PLAN ASSOCIATION - REFERENCED

const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    planName: {
        type: String,
        required: true
    },       
    planIsInstitutional: {
        type: Boolean,
        default: false
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Plan', planSchema);

// ****************************************
// *           PARTICIPANT                *
// ****************************************

const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema(
  {
    partName: {
        type: String,
        required: true,
      },        
    partSsn: {
        type: String,
        default: '',
      },
    partIsHce: {
        type: Boolean,
        default: false,
      },      
    partIsActive: {
        type: Boolean,
        default: true,
      },      
  },
  { timestamps: true }
);

module.exports = mongoose.model('Participant', participantSchema);

// ****************************************
// *              FUND PRICE              *
// ****************************************

const mongoose = require('mongoose');

// FUND DAILY PRICE

const dailyPriceSchema = new mongoose.Schema({
  priceDate: {type: Date, default: Date.now},
  price: Number
});

// ****************************************
// *              FUND                    *
// ****************************************

// FUND WITH DAILY PRICE ASSOCIATION - EMBEDDED

const fundSchema = new mongoose.Schema({
  name: String,
  // embed prices in fund
  prices: [dailyPriceSchema],
});

// FUND PRICE GETTER

dailyPriceSchema.path('price').get(function(num) {
  return (num / 100).toFixed(2);
});

// FUND PRICE SETTER

dailyPriceSchema.path('price').set(function(num) {
  return num * 100;
});

module.exports = mongoose.model('Fund', fundSchema);

/* 
----------------------------------------------
Getter and Setter could also be setup thusly..
----------------------------------------------

const dailyPriceSchema = new mongoose.Schema({
  priceDate : {type: Date, default: Date.now},
  price     : {type: Number, get: getPrice, set: setPrice }
});

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}
*/
```

</details>


