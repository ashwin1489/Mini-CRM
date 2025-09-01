

// import Deal from "../models/Deal.js";

// export const getAnalytics = async (req, res) => {
//   try {
//     // Total deals count
//     const total = await Deal.countDocuments();

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
//       totalDeals: total,
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


// import Deal from "../models/Deal.js";

// export const getAnalytics = async (req, res) => {
//   try {
//     // Total deals count
//     const totalDeals = await Deal.countDocuments();

//     // Average deal value
//     const avgAgg = await Deal.aggregate([
//       { $group: { _id: null, avgAmount: { $avg: "$amount" } } }
//     ]);
//     const averageDealValue = avgAgg.length > 0 ? avgAgg[0].avgAmount : 0;

//     // Total revenue (only won deals)
//     const revenueAgg = await Deal.aggregate([
//       { $match: { stage: "won" } },
//       { $group: { _id: null, total: { $sum: "$amount" } } }
//     ]);
//     const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

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
//       totalDeals,
//       averageDealValue,
//       totalRevenue,
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
    const totalDeals = await Deal.countDocuments();

    // Average deal value
    const avgAgg = await Deal.aggregate([
      { $group: { _id: null, avgAmount: { $avg: "$amount" } } }
    ]);
    const averageDealValue = avgAgg.length > 0 ? avgAgg[0].avgAmount : 0;

    // Total revenue (only won deals)
    const revenueAgg = await Deal.aggregate([
      { $match: { stage: "won" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    // Group by stage
    const byStage = await Deal.aggregate([
      { $group: { _id: "$stage", count: { $sum: 1 } } }
    ]);

    // Group by month (count + revenue)
    const byMonth = await Deal.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          count: { $sum: 1 },
          revenue: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.month": 1 } }
    ]);

    res.json({
      totalDeals,
      averageDealValue,
      totalRevenue,
      dealsByStage: byStage.map((d) => ({
        stage: d._id,
        count: d.count
      })),
      dealsByMonth: byMonth.map((d) => ({
        month: new Date(0, d._id.month - 1).toLocaleString("default", { month: "short" }),
        count: d.count,
        revenue: d.revenue
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
