import userMod from './../../models/userModel.js';
import fs from  "fs";
const saltRounds = 10;

mongoose.connect(process.env.DATABASE.replace('<db_password>',process.env.DATABASE_PASSWORD), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  
}).then(() => console.log('MongoDB Connected...'));
const users = JSON.parse(fs.readFileSync(`${__durbane}/users.json`,'utf-8'));

const importData = async () => {
    try{
        await userMod.create(users);
        console.log('Data imported successfully');
        process.exit();
    }
    catch(error){
        console.error('Error importing data', error);
    }
}
const deleteData = async () => {
try{
    await userMod.deleteMany();
    console.log('Data deleted successfully');
    process.exit();
}
catch{
  console.error('Error deleting data', error);
}
}
if(process.env.argv[2] === '--import'){
    importData();
}
else if(process.argv[2] === '--delete'){
    deleteData();
}

console.log(process.argv)