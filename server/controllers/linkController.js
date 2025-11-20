const Link = require("../models/Link");

exports.createLink = async (req, res) => {
  try {
    const { url, code } = req.body;

    if (!/^[A-Za-z0-9]{6,8}$/.test(code))
      return res.status(400).json({ msg: "Invalid code format" });

    try {
      new URL(url);
    }
    catch {
      return res.status(400).json({ msg: "Invalid URL" });
    }

    const exists = await Link.findOne({ code });
    if (exists) return res.status(409).json({ msg: "Code already exists" });

    const link = await Link.create({ url, code });
    res.json({ msg: "Link created", link });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllLinks = async (req, res) => {
  const links = await Link.find().sort({ createdAt: -1 });
  res.json(links);
};

exports.getStats = async (req, res) => {
  const link = await Link.findOne({ code: req.params.code });
  if (!link) return res.status(404).json({ msg: "Not found" });
  res.json(link);
};

exports.deleteLink = async (req, res) => {
  const link = await Link.findOneAndDelete({ code: req.params.code });
  if (!link) return res.status(404).json({ msg: "Not found" });
  res.json({ msg: "Deleted" });
};

exports.redirect = async (req, res) => {
  const code = req.params.code;
  const link = await Link.findOne({ code });

  if (!link) return res.status(404).send("Not found");

  link.clicks++;
  link.lastClicked = new Date();
  await link.save();
  // res.json({link})
  return res.status(200).redirect(link.url);
};

exports.healthCheck = (req, res) => {

  res.json({ message: "request done", ok: true, version: "1.0" });
};
