import Deal from "../models/Deal.js";

export const getDeals = async (req, res) => {
  try {
    const { stage, page = 1, pageSize = 10 } = req.query;
    const query = stage ? { stage } : {};

    const total = await Deal.countDocuments(query);

    const deals = await Deal.find(query)
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize))
      .populate("contact");

    res.json({
      items: deals,
      total,
      page: Number(page),
      pageSize: Number(pageSize)
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching deals", error: err.message });
  }
};


export const createDeal = async (req, res) => {
  const deal = await Deal.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(deal);
};

export const updateDeal = async (req, res) => {
  const updated = await Deal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteDeal = async (req, res) => {
  await Deal.findByIdAndDelete(req.params.id);
  res.json({ message: "Deal deleted" });
};
