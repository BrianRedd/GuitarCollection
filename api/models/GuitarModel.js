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

const guitarSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
  },
  make: {
    type: String,
    // required: true
  },
  makeParent: {
    type: String
  },
  makerLogo: {
    type: String
  },
  model: {
    type: String,
    // required: true
  },
  year: {
    type: String,
    // required: true
  },
  serialNo: {
    type: String,
    // required: true
  },
  countyOfOrigin: {
    type: String,
    // required: true
  },
  purchaseHistory: [purchaseHistorySchema],
  case: {
    type: String
  },
  story: {
    type: String
    // required: true
  },
  specs: {},
  tuning: {
    type: String
  },
  status: {
    type: String
    // required: true
  },
  lastPlayed: {
    type: String
  },
  pictures: [
    {
      title: {
        type: String
      },
      fileName: {
        type: String
      }
    }
  ],
  maintenance: [
    {
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
        type: String
      },
      notes: {
        type: String
      }
    }
  ]
});

module.exports = mongoose.model("Guitar", guitarSchema);
