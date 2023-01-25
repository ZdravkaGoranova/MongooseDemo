const mongoose = require('mongoose');
const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String,
});
//Method
catSchema.methods.sayHello = function () {
    console.log(`Hello, my name is ${this.name} and mew!`);
};

//Virtual property
catSchema.virtual('info').get(function () {
    return `${this.name} - age ${this.age}  - breed ${this.breed}`;
});



const Cat = mongoose.model('Cat', catSchema);

async function main() {
    mongoose.set('strictQuery', false);

    await mongoose.connect('mongodb://127.0.0.1:27017/catShelter')
    console.log(`DataBase Connected`);

    const cats = await readCats();
    cats.forEach(cat => {
        cat.sayHello();
        console.log(cat.info);

        // cat.info; към Virtual property
        //e property и не се извиква като метод ()
    });

    //await saveCat('Mishi', 3, 'pgushko');
    //await readCats();

}
async function readCats() {
    const cats = await Cat.find();
    console.log(cats);
    return cats;
}

async function saveCat(name, age, breed) {

    await Cat.create({
        name,
        age,
        breed,
    });
    //втори вариянт
    // const cat = new Cat({//инстанция на модела 
    //     name,
    //     age,
    //     breed,
    // })
    // await cat.save();//запазва в базата данни
}

main();

