const fs = require("node:fs");
const chalk = require('chalk')
var validator = require('validator');


const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contact.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const simpanContact = (nama,email,noHP) => {
  const contact = { nama, email, noHP };
  const flieBuffer = fs.readFileSync("data/contact.json", "utf-8");
  const contacts = JSON.parse(flieBuffer);
  //cek duplicate
  const duplicate = contacts.find((contact) => contact.nama === nama)
  if (duplicate) {
    console.log(chalk.red.inverse.bold`contact sudah terdaftar, gunakan nama lain!`);
    return false
  }
  //cek email
  if (email) {
    if(!validator.isEmail(email)){
      console.log(chalk.red.inverse.bold`Email tidak valid`);
      return false;
    }
  }

  //cek nomor hp
  if(!validator.isMobilePhone(noHP, 'id-ID')){
    console.log(chalk.red.inverse.bold`Nomor HP tidak valid`);
    return false;
  }
  contacts.push(contact);
  console.log(chalk.green.inverse.bold`Terimakasih sudah mengisi`);
  fs.writeFileSync("data/contact.json", JSON.stringify(contacts));
};


module.exports = { simpanContact}