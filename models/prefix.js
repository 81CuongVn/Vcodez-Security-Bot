/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */

const { Schema, model } = require('mongoose');
const newModel = new Schema({
  Guild: String,
  Prefix: String,
})
module.exports = model('prefix', newModel)