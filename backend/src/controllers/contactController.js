import Contact from "../models/Contact.js";

// export const getContacts = async (req, res) => {
//   const { search, page = 1, pageSize = 10 } = req.query;
//   const query = search ? { name: { $regex: search, $options: "i" } } : {};
//   const contacts = await Contact.find(query)
//     .skip((page - 1) * pageSize)
//     .limit(Number(pageSize));
//   res.json(contacts);
// };

export const getContacts = async (req, res) => {
  try {
    const { search, page = 1, pageSize = 10 } = req.query;
    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const total = await Contact.countDocuments(query);

    const contacts = await Contact.find(query)
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));

    res.json({
      items: contacts,
      total,
      page: Number(page),
      pageSize: Number(pageSize)
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching contacts", error: err.message });
  }
};


export const createContact = async (req, res) => {
  const contact = await Contact.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Contact deleted" });
};
