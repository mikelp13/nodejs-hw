const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    console.table(JSON.parse(data));
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contact = JSON.parse(data).find(
      (contact) => contact.id === contactId
    );
    console.table(contact);
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(data);
    const filteredList = contactsList.filter(
      (contact) => contact.id !== contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(filteredList));

    console.table(filteredList);
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const data = await fs.readFile(contactsPath);
    const newContactsList = [...JSON.parse(data), newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newContactsList));

    console.table(newContactsList);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
