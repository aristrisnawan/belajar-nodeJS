//Mengambil argument dari command line
// const command = process.argv[2]
const yargs = require("yargs");
const {simpanContact,listContact,detailContact,deleteContact} = require('./contact')

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
}).demandCommand();

//menampilkan daftar semua nama & no contact
yargs.command({
  command: 'list',
  describe: 'Menampilkan semua nama dan nomor hp',
  handler() {
    listContact()
  }
})

//menampilkan detail contact
yargs.command({
  command: 'detail',
  describe: 'Menampilkan detail sebuah contact',
  builder:{
    nama:{
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    detailContact(argv.nama)
  }
})

//Hapus data berdasarkan nama
yargs.command({
  command: 'delete',
  describe: 'Menghapus sebuah contact',
  builder:{
    nama:{
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    deleteContact(argv.nama)
  }
})
yargs.parse()
