const express = require("express");
const router = express.Router();
const ctrlContact = require("../../controllers/contactConrtoller");
const guard = require("../../helpers/guard");


router.get("/", guard, ctrlContact.getAllContacts);

router.get("/:contactId", guard, ctrlContact.getById);

router.post("/", guard, ctrlContact.createContact);

router.delete("/:contactId", guard, ctrlContact.deleteContact);

router.patch("/:contactId", guard, ctrlContact.update);

module.exports = router;
