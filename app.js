//Core Module
//File System

const {tulisPertanyaan, simpanContact} = require('./contact')

const main = async () => {
  const nama = await tulisPertanyaan('Tulis nama kamu : ');
  const umur = await tulisPertanyaan('Berapa umur mu : ');
  const alamat = await tulisPertanyaan('Masukan alamat mu : ');
  simpanContact(nama,umur,alamat)
};

main()

