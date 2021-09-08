var mongoose = require('mongoose');
var db=mongoose.connection;
var TeamSchema = new mongoose.Schema({​
    name: {​
        type: String,​
        required: true​
    }​
    
});
    
var Team = mongoose.model('Team', TeamSchema);​

mongoose.connect("mongodb://localhost:27017/cui").then(()=>{
    console.log("connected")
   
        var team = new Team({​

            name: 'Product Development'​
            
            });​
            
            team.save(function (error, data) {​
            
            if (error) {​
            
            console.log(error);​
            
            } else {​
            
            console.dir(data);​
            
            }​
        })
}).catch((err)=>{
    console.log(err);
})
