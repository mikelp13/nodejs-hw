const Contact = require("./schemas/contact");

const listContacts = async ({ limit = 5, page = 1, sortBy, sortByDesc }) => {
  const { docs: contacts, totalDocs: total } = await Contact.paginate(
    {},
    {
      limit,
      page,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
      populate: {
        path: "owner",
        select: "email subscription -_id"
      }
    }
  );
  return { contacts, total, page: Number(page), limit: Number(limit) };
};

const getContactById = async (contactId) => {
  const contactById = await Contact.findOne({ _id: contactId }).populate({
    path: "owner",
    select: "email subscription -_id"
  });
  return contactById;
};

const removeContact = async (contactId) => {
  const contactToRemove = Contact.findByIdAndRemove({ _id: contactId });
  return contactToRemove;
};

const addContact = async (body, userId) => {
  const newContact = await Contact.create({ ...body, owner: userId });
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
