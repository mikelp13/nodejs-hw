const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../model");


const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);

    contact
      ? res.json({
          status: "success",
          code: 200,
          data: contact,
        })
      : res.status(404).json({
          status: "error",
          code: 404,
          message: "Not found",
        });
  } catch (err) {
    next(err);
  }
}

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const userId = req.user.id
  try {
    if (!name || !email || !phone) {

      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required name field",
      });
    } else {

      const newContact = await addContact(req.body, userId);

      return res.json({
        status: "success",
        code: 201,
        data: newContact,
      });
    }
  } catch (err) {
    next(err);
  }
}

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await removeContact(contactId);

    contact
      ? res.json({
          status: "success",
          code: 200,
          message: "contact deleted",
        })
      : res.status(404).json({
          status: "error",
          code: 404,
          message: "Not found",
        });
  } catch (err) {
    next(err);
  }
}

const update = async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;
  try {
    if (Object.keys(body).length === 0) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing fields",
      });
    }

    const updatedContact = await updateContact(contactId, body);

    updatedContact
      ? res.json({
          status: "success",
          code: 200,
          data: updatedContact,
        })
      : res.status(404).json({
          status: "error",
          code: 404,
          message: "Not found",
        });
  } catch (error) {
    next(err);
  }
}

module.exports = {
  getAllContacts,
  getById,
  createContact,
  deleteContact,
  update,
};
