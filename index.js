const mongoose = require('mongoose');
const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String,
});

const Cat = mongoose.model('Cat', catSchema);

async function main() {
    mongoose.set('strictQuery', false);

    await mongoose.connect('mongodb://127.0.0.1:27017/catShelter')
    console.log(`DataBase Connected`);

    await saveCat('Mishi', 3, 'pgushko');
    await readCats();

}
async function readCats() {
    const cats = await Cat.find();
    console.log(cats);
}

async function saveCat(name, age, breed) {

    await Cat.create({
        name,
        age,
        breed,
    });

    // const cat = new Cat({//инстанция на модела 
    //     name,
    //     age,
    //     breed,
    // })
    // await cat.save();//запазва в базата данни
}

main();

