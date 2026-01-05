const List = require("../models/listModel");

// Get all lists for logged-in user
const getLists = async (req, res) => {
  try {
    const lists = await List.find({ userId: req.user._id }).sort({ updatedAt: -1 });

    const formatted = lists.map(list => ({
      id: list._id,
      _id: list._id,
      name: list.name,
      totalItems: list.items.length,
      completedItems: list.items.filter(item => item.completed).length,
      lastUpdated: list.updatedAt,
      status: list.status,
      isShared: list.isShared,
      color: list.color,
      icon: list.icon,
      items: list.items,
    }));

    res.json({ success: true, lists: formatted });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Create a new list
const createList = async (req, res) => {
  try {
    const { name, items, status, isShared, familyId, color, icon } = req.body;

    const list = await List.create({
      userId: req.user._id,
      name,
      items: items || [],
      status: status || "Active",
      isShared: isShared || false,
      familyId: familyId || null,
      color: color || '#10B981',
      icon: icon || 'ShoppingCart',
    });

    res.status(201).json({
      success: true,
      list: {
        id: list._id,
        _id: list._id,
        name: list.name,
        totalItems: list.items.length,
        completedItems: list.items.filter(item => item.completed).length,
        lastUpdated: list.updatedAt,
        status: list.status,
        isShared: list.isShared,
        color: list.color,
        icon: list.icon,
        items: list.items,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get a single list
const getList = async (req, res) => {
  try {
    const list = await List.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (!list) {
      return res.status(404).json({ success: false, message: "List not found" });
    }

    res.json({
      success: true,
      list: {
        id: list._id,
        _id: list._id,
        name: list.name,
        totalItems: list.items.length,
        completedItems: list.items.filter(item => item.completed).length,
        lastUpdated: list.updatedAt,
        status: list.status,
        isShared: list.isShared,
        color: list.color,
        icon: list.icon,
        items: list.items,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a list
const updateList = async (req, res) => {
  try {
    const { name, items, status, isShared, color, icon } = req.body;

    const list = await List.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (!list) {
      return res.status(404).json({ success: false, message: "List not found" });
    }

    if (name !== undefined) list.name = name;
    if (items !== undefined) list.items = items;
    if (status !== undefined) list.status = status;
    if (isShared !== undefined) list.isShared = isShared;
    if (color !== undefined) list.color = color;
    if (icon !== undefined) list.icon = icon;

    await list.save();

    res.json({
      success: true,
      list: {
        id: list._id,
        _id: list._id,
        name: list.name,
        totalItems: list.items.length,
        completedItems: list.items.filter(item => item.completed).length,
        lastUpdated: list.updatedAt,
        status: list.status,
        isShared: list.isShared,
        color: list.color,
        icon: list.icon,
        items: list.items,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a list
const deleteList = async (req, res) => {
  try {
    const list = await List.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (!list) {
      return res.status(404).json({ success: false, message: "List not found" });
    }

    await list.deleteOne();

    res.json({ success: true, message: "List deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getLists,
  createList,
  getList,
  updateList,
  deleteList,
};
