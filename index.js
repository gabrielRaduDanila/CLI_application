const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts();
      break;

    case 'get':
      if (!id) {
        throw new Error('You must provide an id');
      }
      getContactById(id);
      break;

    case 'add':
      if (!name || !email || !phone) {
        throw new Error('You must provide a name, email and phone number');
      }
      addContact(name, email, phone);
      break;

    case 'remove':
      if (!id) {
        throw new Error('You must provide an id');
      }
      removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
// const id = 'AeHIrLTr6JkxGE6SN-0Rw';
// const probe = {
//   id: '12',
//   name: 'un nume',
//   email: 'email',
//   phone: '32434-34234-34234',
// };

// getContactById(id);
// addContact(probe.name, probe.email, probe.phone);
// removeContact(probe.id);
