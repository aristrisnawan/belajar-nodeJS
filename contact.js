const fs = require("node:fs");
const chalk = require("chalk");
var validator = require("validator");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contact.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const flieBuffer = fs.readFileSync("data/contact.json", "utf-8");
  const contacts = JSON.parse(flieBuffer);
  return contacts;
};

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  const contacts = loadContact();
  //cek duplicate
  const duplicate = contacts.find((contact) => contact.nama === nama);
  if (duplicate) {
    console.log(
      chalk.red.inverse.bold`contact sudah terdaftar, gunakan nama lain!`
    );
    return false;
  }
  //cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold`Email tidak valid`);
      return false;
    }
  }

  //cek nomor hp
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log(chalk.red.inverse.bold`Nomor HP tidak valid`);
    return false;
  }
  contacts.push(contact);
  console.log(chalk.green.inverse.bold`Terimakasih sudah mengisi`);
  fs.writeFileSync("data/contact.json", JSON.stringify(contacts));
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold`Daftar contact :`);
  contacts.forEach((contact, idx) => {
    console.log(`${idx + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  if (!contact) {
    console.log(chalk.red.inverse.bold`${nama} tidak ditemukan!`);
    return false;
  }
  console.log(
    chalk.blue.inverse.bold`${contact.nama} - ${
      contact.email ? contact.email : "no email"
    } - ${contact.noHP}`
  );
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContact = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );
  if (contacts.length === newContact.length) {
    console.log(chalk.red.inverse.bold`${nama} tidak ditemukan!`);
    return false;
  }
  console.log(chalk.green.inverse.bold`${nama} Berhasil di hapus`);
  fs.writeFileSync("data/contact.json", JSON.stringify(newContact));
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
