const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// POST /api/leads
router.post("/", async (req, res) => {
  const { phone, email } = req.body;

  // validation
  if (!/^[0-9]{10}$/.test(phone)) {
    return res.status(400).json({ error: "Phone must be 10 digits" });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json({ message: "Lead created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// GET /api/leads
router.get("/", async (req, res) => {
  try {
    const filter = req.query.platform
      ? { platform: req.query.platform }
      : {};

    const leads = await Lead.find(filter);
    res.json(leads);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});


// PATCH /api/leads/:id/status
router.patch("/:id/status", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    res.json(lead);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});


// DELETE /api/leads/:id
router.delete("/:id", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    res.json({ message: "Lead deleted" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;