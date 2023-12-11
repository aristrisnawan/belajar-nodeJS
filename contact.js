const fs = require("node:fs");
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contact.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (nama) => {
      resolve(nama);
    });
  });
};

const simpanContact = (nama,umur,alamat) => {
  const contact = { nama, umur, alamat };
  const flieBuffer = fs.readFileSync("data/contact.json", "utf-8");
  const contacts = JSON.parse(flieBuffer);
  contacts.push(contact);
  console.log("Input data berhasil!!");
  fs.writeFileSync("data/contact.json", JSON.stringify(contacts));
  rl.close();
};


module.exports = {tulisPertanyaan, simpanContact}