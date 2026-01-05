const Family = require("../models/familyModel");
const { nanoid } = require("nanoid");

// Generate unique code like ABC-123-XYZ
const generateFamilyCode = () => {
  return nanoid(10).toUpperCase().match(/.{1,3}/g).join("-");
};

// --- Create a new family ---
const createFamily = async (req, res) => {
  try {
    const { familyName, description, budget, selectedEmoji, visibility, members } = req.body;

    let code = generateFamilyCode();

    // Extra safety: ensure code is unique
    while (await Family.findOne({ familyCode: code })) {
      code = generateFamilyCode();
    }

    const family = await Family.create({
      familyName,
      description,
      budget,
      selectedEmoji,
      visibility,
      members: members.map(email => ({ email })),  // store email list
      createdBy: req.user._id,
      familyCode: code
    });

    res.status(201).json({
      success: true,
      message: "Family created successfully",
      familyCode: code,
      family
    });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// --- Fetch all families created by the logged-in user ---
const getMyFamilies = async (req, res) => {
  try {
    const families = await Family.find({ createdBy: req.user._id });

const formatted = families.map(fam => ({
  _id: fam._id,
  name: fam.familyName,
  members: fam.members.length,
  avatars: [fam.selectedEmoji, "👤", "👥"], // temporary — can update later
}));

return res.json({ success: true, families: formatted });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// --- Join family using invite code ---
const joinFamily = async (req, res) => {
  try {
    const { code } = req.body;

    const family = await Family.findOne({ familyCode: code });
    if (!family)
      return res.status(404).json({ success: false, message: "Invalid family code" });

    // Check if already joined
    const existing = family.members.find(m => m.userId?.toString() === req.user._id.toString());
    if (existing)
      return res.json({ success: true, message: "Already joined", family });

    // Attach to a matching email (if invited)
    const invitedSlot = family.members.find(m => m.email === req.user.email);
    if (invitedSlot) {
      invitedSlot.joined = true;
      invitedSlot.userId = req.user._id;
    } else {
      // Add user as a member
      family.members.push({
        email: req.user.email,
        joined: true,
        userId: req.user._id
      });
    }

    await family.save();

    res.json({ success: true, message: "Family joined", family });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// --- Get details of one family ---
const getFamilyDetails = async (req, res) => {
  try {
    const family = await Family.findById(req.params.id).populate('members.userId', 'name email avatar').populate('createdBy', 'name email avatar');
    if (!family) return res.status(404).json({ success: false, message: "Family not found" });

    // Handle case where createdBy might not be populated
    const creatorId = family.createdBy && family.createdBy._id 
      ? family.createdBy._id.toString() 
      : (family.createdBy ? family.createdBy.toString() : null);

    // Format members with user data - handle cases where userId might not be populated
    const members = family.members
      .filter(m => m.joined && m.userId && m.userId._id)
      .map(m => ({
        id: m.userId._id.toString(),
        name: m.userId.name || 'Unknown',
        email: m.userId.email || '',
        avatar: m.userId.avatar || '🧑',
        role: m.userId._id.toString() === creatorId ? 'Admin' : 'Member',
        monthlySpending: 0, // Can be calculated from expenses if needed
      }));

    // Calculate summary data (can be enhanced with actual expense calculations)
    const summary = {
      totalSpending: family.budget || 0, // This should be calculated from expenses
      budget: family.budget || 0,
      activeLists: 0, // Can be calculated from lists if lists are linked to families
    };

    // Generate pie chart data (placeholder - should be calculated from expenses by category)
    const pieChartData = [];

    // Format response to match frontend expectations
    const formattedFamily = {
      _id: family._id,
      name: family.familyName,
      code: family.familyCode,
      members: members,
      summary: summary,
      pieChartData: pieChartData,
      description: family.description,
      selectedEmoji: family.selectedEmoji,
      visibility: family.visibility,
      createdAt: family.createdAt,
    };

    res.json({ success: true, family: formattedFamily });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createFamily,
  getMyFamilies,
  joinFamily,
  getFamilyDetails,
};
