import Contact from "../models/Contact.js";

/* ADD CONTACT MESSAGE (PUBLIC) */
export const addContactMessage = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    res.status(201).json({
      message: "Message sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to send message",
    });
  }
};

/* GET ALL CONTACT MESSAGES (ADMIN) */
export const getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({
      message: "Failed to load messages",
    });
  }
};

/* DELETE CONTACT MESSAGE (ADMIN – optional) */
export const deleteContactMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete message",
    });
  }
};
