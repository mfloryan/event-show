var mongodb = require('mongodb');

function SwapHexDigitsForCSharpGuids(hex) {
  var a = hex.substr(6, 2) + hex.substr(4, 2) + hex.substr(2, 2) + hex.substr(0, 2);
  var b = hex.substr(10, 2) + hex.substr(8, 2);
  var c = hex.substr(14, 2) + hex.substr(12, 2);
  var d = hex.substr(16, 16);
  return a + b + c + d;
}

function HexToBase64(hex) {
  var base64Digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var base64 = "";
  var group;
  for (var i = 0; i < 30; i += 6) {
    group = parseInt(hex.substr(i, 6), 16);
    base64 += base64Digits[(group >> 18) & 0x3f];
    base64 += base64Digits[(group >> 12) & 0x3f];
    base64 += base64Digits[(group >> 6) & 0x3f];
    base64 += base64Digits[group & 0x3f];
  }
  group = parseInt(hex.substr(30, 2), 16);
  base64 += base64Digits[(group >> 2) & 0x3f];
  base64 += base64Digits[(group << 4) & 0x3f];
  base64 += "==";
  return base64;
}

function Base64ToHex(base64) {
  var base64Digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var hexDigits = "0123456789abcdef";
  var hex = "";
  for (var i = 0; i < 24; ) {
    var e1 = base64Digits.indexOf(base64[i++]);
    var e2 = base64Digits.indexOf(base64[i++]);
    var e3 = base64Digits.indexOf(base64[i++]);
    var e4 = base64Digits.indexOf(base64[i++]);
    var c1 = (e1 << 2) | (e2 >> 4);
    var c2 = ((e2 & 15) << 4) | (e3 >> 2);
    var c3 = ((e3 & 3) << 6) | e4;
    hex += hexDigits[c1 >> 4];
    hex += hexDigits[c1 & 15];
    if (e3 != 64) {
      hex += hexDigits[c2 >> 4];
      hex += hexDigits[c2 & 15];
    }
    if (e4 != 64) {
      hex += hexDigits[c3 >> 4];
      hex += hexDigits[c3 & 15];
    }
  }
  return hex;
}

exports.fromBinary = function(binary) {
  var hex = Base64ToHex(binary.buffer.toString('base64'));
  hex = SwapHexDigitsForCSharpGuids(hex);
  return hex.substr(0, 8) + '-' + hex.substr(8, 4) + '-' + hex.substr(12, 4) + '-' + hex.substr(16, 4) + '-' + hex.substr(20, 12);
};

exports.toMongoBinary = function(guid) {
  return new mongodb.Binary(new Buffer(HexToBase64(SwapHexDigitsForCSharpGuids(guid.replace(/[{}-]/g, ""))),'base64'), 3);
};