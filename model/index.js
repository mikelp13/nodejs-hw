const Contact = require("./schemas/contact");

const listContacts = async () => {
  const data = await Contact.find();
  return data;
};

const getContactById = async (contactId) => {
  const contactById = await Contact.findOne({ _id: contactId });
  return contactById;
};

const removeContact = async (contactId) => {
  const contactToRemove = Contact.findByIdAndRemove({ _id: contactId });
  return contactToRemove;
};

const addContact = async (body) => {
  const newContact = await Contact.create(body);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    body,
    { new: true }
  );
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
