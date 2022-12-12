const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContact = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const result = allContacts.find((item) => item.id === contactId);

  return result || "Contact not found...";
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(2),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContact(contacts);

  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await updateContact(contacts);

  return result;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
