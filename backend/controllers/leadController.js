const Lead = require("../models/Lead");

exports.getLeads = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10, sort = "desc" } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    if (status && status !== "all") {
      query.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const leads = await Lead.find(query)
      .sort({ createdAt: sort === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(Number(limit));

    const totalLeads = await Lead.countDocuments(query);

    res.json({
      leads,
      totalLeads,
      totalPages: Math.ceil(totalLeads / Number(limit)),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const total = await Lead.countDocuments();
    const converted = await Lead.countDocuments({ status: "converted" });
    const newLeads = await Lead.countDocuments({ status: "new" });
    const contacted = await Lead.countDocuments({ status: "contacted" });
    const qualified = await Lead.countDocuments({ status: "qualified" });

    const conversionRate =
      total > 0 ? Math.round((converted / total) * 100) : 0;

    res.json({
      total,
      converted,
      newLeads,
      contacted,
      qualified,
      conversionRate,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
