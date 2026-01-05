import Faq from "../models/Faq.js";

// ADD FAQ (Admin)
export const addFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const faq = new Faq({ question, answer });
    await faq.save();

    res.json({ message: "FAQ added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL FAQS (Public)
export const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE FAQ (Admin)
export const deleteFaq = async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.json({ message: "FAQ deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
