const mongoose = require('mongoose');

const Cat = require('./models/Cat.js');

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

    //wait saveCat("niki", 6, 'pgushko');//валидация на name
    //await saveCat('Mishi', 3, 'pgushko');
    // await readCats();

    let oneCat = await readCat('Nav');
    console.log(oneCat);

    //await updateNameCat ('Cucka','Mama Maca')
    await deleteCat('Mishi');
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

    return Cat;
};
async function readCat(name) {
    // const cat = await Cat.findOne();//първата котка от колекцията
    //const cat = await Cat.findOne({ name })//връща първата подред котка по критерия
    //const cat = await Cat.find({ name })//връща всички котки по критерия в обекти от масив
    // const cat = await Cat.findById("63d181c46720dab9948e2597")

    const cat = await Cat.findOne({ age: 3 })

    return cat;
};

async function updateNameCat(name, newName) {
    await Cat.updateOne({ name }, { name: newName })
}
async function deleteCat(name) {
    await Cat.deleteOne({ name: name })
}


main();

