//Mengambil argument dari command line
// const command = process.argv[2]
const yargs = require("yargs");
const {simpanContact} = require('./contact')

yargs.command({
  command: 'add',
  describe: 'Menambahkan contact baru',
  builder: {
    nama:{
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'Email',
      demandOption: false,
      type: 'string'
    },
    noHP: {
      describe: 'Nomor Handphone',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv){
    simpanContact(argv.nama,argv.email,argv.noHP)
  }
});

yargs.parse()
// const {tulisPertanyaan, simpanContact} = require('./contact')

// const main = async () => {
//   const nama = await tulisPertanyaan('Tulis nama kamu : ');
//   const umur = await tulisPertanyaan('Berapa umur mu : ');
//   const alamat = await tulisPertanyaan('Masukan alamat mu : ');
//   simpanContact(nama,umur,alamat)
// };

// main()
