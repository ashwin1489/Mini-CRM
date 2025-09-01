
// import Deal from "../models/Deal.js";

// export const getAnalytics = async (req, res) => {
//   try {
//     // Group by stage
//     const byStage = await Deal.aggregate([
//       { $group: { _id: "$stage", count: { $sum: 1 } } }
//     ]);

//     // Group by month
//     const byMonth = await Deal.aggregate([
//       { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
//       { $sort: { "_id": 1 } }
//     ]);

//     res.json({
//       dealsByStage: byStage.map((d) => ({
//         stage: d._id,
//         count: d.count
//       })),
//       dealsByMonth: byMonth.map((d) => ({
//         month: new Date(0, d._id - 1).toLocaleString("default", { month: "short" }),
//         count: d.count
//       }))
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Analytics error", error: err.message });
//   }
// };

// export const recalcAnalytics = async (req, res) => {
//   setTimeout(() => console.log("Analytics recalculated"), 2000);
//   res.json({ message: "Recalculation triggered" });
// };

import Deal from "../models/Deal.js";

export const getAnalytics = async (req, res) => {
  try {
    // Total deals count
    const total = await Deal.countDocuments();

    // Group by stage
    const byStage = await Deal.aggregate([
      { $group: { _id: "$stage", count: { $sum: 1 } } }
    ]);

    // Group by month
    const byMonth = await Deal.aggregate([
      { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
      { $sort: { "_id": 1 } }
    ]);

    res.json({
      totalDeals: total,
      dealsByStage: byStage.map((d) => ({
        stage: d._id,
        count: d.count
      })),
      dealsByMonth: byMonth.map((d) => ({
        month: new Date(0, d._id - 1).toLocaleString("default", { month: "short" }),
        count: d.count
      }))
    });
  } catch (err) {
    res.status(500).json({ message: "Analytics error", error: err.message });
  }
};

export const recalcAnalytics = async (req, res) => {
  setTimeout(() => console.log("Analytics recalculated"), 2000);
  res.json({ message: "Recalculation triggered" });
};
