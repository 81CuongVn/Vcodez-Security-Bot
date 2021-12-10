/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */

const mongoose = require('mongoose');
let Schema = new mongoose.Schema({
  Guild: String,
  Member: String,
  Content: String,
  TimeAgo: String
})
module.exports = mongoose.model('afk', Schema)