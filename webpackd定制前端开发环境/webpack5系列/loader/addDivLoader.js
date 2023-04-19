module.exports = function (obj) {
  console.log("%c Line:2 🍤 obj", "color:#33a5ff", obj);
  let str = '<div class="hsSty">' + obj + "</div>";
  return `module.exports = '${JSON.stringify(str)}' `;
};
