const express = require("express");
const router = express.Router();
const ctrlContact = require("../../controllers/contactConrtoller");


router.get("/", ctrlContact.getAllContacts );

router.get("/:contactId", ctrlContact.getById);

router.post("/", ctrlContact.createContact);

router.delete("/:contactId", ctrlContact.deleteContact);

router.patch("/:contactId", ctrlContact.update);

module.exports = router;
