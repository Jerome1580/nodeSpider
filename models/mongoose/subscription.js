const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const SubSchema = new Schema({
  userId: { type: ObjectId, required: true, index: 1 },
  url: { type: String, required: true }
});

const SubModel = mongoose.model("Sub", SubSchema);

async function insert(sub, url) {
  try {
    const created = await SubModel.create({ userId: sub, url });
    return created;
  } catch (error) {
    throw new Error(error);
  }
}

async function list(params) {
  const match = {};
  let flow = SubModel.find(match);

  const subs = await flow.exec();
  return subs;
}

async function findOneByUserId(userId) {
  const subs = await SubModel.find({ userId });
  return subs;
}
module.exports = {
  insert,
  findOneByUserId,
  list
};
