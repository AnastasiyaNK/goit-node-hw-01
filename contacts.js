const fs = require("fs/promises");
const path = require("path");
const { log } = require("console");
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const stringifiedContacts = await fs.readFile(contactsPath, "utf-8");
    const contactsParsed = JSON.parse(stringifiedContacts);
    console.log(contactsParsed);

    return contactsParsed;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById =
      contacts.find((contact) => contact.id === contactId) ?? null;
    console.log(contactById);

    return contactById;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = await getContactById(contactId);
    const updatedContacts = contacts.filter(
      (contact) => contactId !== contact.id
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log(contactById);

    return contactById;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: Math.random().toString(),
      name,
      email,
      phone,
    };
    const updatedContacts = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log(newContact);
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
