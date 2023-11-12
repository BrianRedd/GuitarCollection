const mongoose = require("mongoose");

const purchaseHistorySchema = new mongoose.Schema({
  id: {
    type: String
  },
  ownershipStatus: {
    type: String
  },
  where: {
    type: String
  },
  when: {
    type: String
  },
  who: {
    type: String
  },
  amount: {
    type: Number
  },
  notes: {
    type: String
  }
});

const specificationSchema = new mongoose.Schema({
  id: {
    type: String
  },
  specType: {
    type: String
  },
  specification: {
    type: String
  },
  notes: {
    type: String
  }
});

const maintenanceSchema = new mongoose.Schema({
  id: {
    type: String
  },
  type: {
    type: String
  },
  date: {
    type: String
  },
  whoBy: {
    type: String
  },
  cost: {
    type: Number
  },
  notes: {
    type: String
  }
});

const imageSchema = new mongoose.Schema({
  id: {
    type: String
  },
  title: {
    type: String
  },
  fileName: {
    type: String
  }
});

const todoListSchema = new mongoose.Schema({
  id: {
    type: String
  },
  todoItem: {
    type: String
  }
});

const guitarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brandId: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  serialNo: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  countyOfOrigin: {
    type: String
  },
  case: {
    type: String
  },
  instrumentType: {
    type: String,
    required: true
  },
  noOfStrings: {
    type: String,
    required: true
  },
  soundScape: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  appearanceNotes: {
    type: String
  },
  purchaseHistory: [purchaseHistorySchema],
  story: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  tuning: {
    type: String
  },
  lastPlayed: {
    type: String
  },
  specs: [specificationSchema],
  pictures: [imageSchema],
  maintenance: [maintenanceSchema],
  todoList: [todoListSchema],
  lastUpdated: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("Guitar", guitarSchema);
