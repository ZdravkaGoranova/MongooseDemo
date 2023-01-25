const mongoose = require('mongoose');

async function main() {
    mongoose.set('strictQuery', false);

    await mongoose.connect('mongodb://127.0.0.1:27017/CatShelter')

    console.log(`DataBase Connected`)
}
main();