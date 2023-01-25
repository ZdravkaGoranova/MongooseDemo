const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nedd from NAME!'],//Може да си опишем съобщението за грешката
        minLength: 4,
        maxLength: 6,
        lowercase: false,
        uppercase: true
    },
    age: {
        type: Number,
        min: 1,
        max: 9,
    },
    breed: {
        type:String,
        enum:['Persian','Domestic','puhi'],
    },
});
//Method
catSchema.methods.sayHello = function () {
    console.log(`Hello, my name is ${this.name} and mew!`);
};

//Virtual property
catSchema.virtual('info').get(function () {
    return `${this.name} - age ${this.age}  - breed ${this.breed}`;
});

//Validation methods or Customs validation
catSchema.path('name').validate(function () {
    return this.name.startsWith('N');
}, 'Name should start with N')


const Cat = mongoose.model('Cat', catSchema);
module.exports = Cat;
//или
//module.exports = mongoose.model('Cat', catSchema);