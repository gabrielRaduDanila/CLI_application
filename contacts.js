const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      console.table(contacts);
    })
    .catch((error) => console.log(error.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.filter((cont) => cont.id === contactId);
      console.table(contact);
    })
    .catch((error) => console.log(error.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContacts = contacts.filter((c) => c.id !== contactId);
      return fs.writeFile(contactsPath, JSON.stringify(newContacts));
    })
    .then(() => {
      return fs.readFile(contactsPath);
    })
    .then((data) => {
      const contacts = JSON.parse(data);
      console.table(contacts);
    })
    .catch((error) => console.log(error.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
      };
      const newContacts = [...contacts, newContact];
      return fs.writeFile(contactsPath, JSON.stringify(newContacts));
    })
    .then(() => {
      return fs.readFile(contactsPath);
    })
    .then((data) => {
      const contacts = JSON.parse(data);
      console.table(contacts);
    })
    .catch((error) => console.log(error.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
