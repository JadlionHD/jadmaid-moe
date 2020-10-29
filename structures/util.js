const axios = require('axios');

/**
 * Utilities module
 */
module.exports = class Util {
       
    /**
     * Do a random number between min and max
     *
     * @param {Number} min  the minimum number
     * @param {Number} max  the maximum number
     * @returns {Number}    the random number between the min and max number
     */
   static randomNumber(min, max) {
        if (!(max instanceof Number) || !(min instanceof Number)) {
            return null;
        }

        let random = Math.floor(Math.random() * (max - min + 1) + min);
        if (random === max) {
            random--;
        }

        return random;
    };

    /**
     * Creates a random string
     *
     * @param {Number} length       the string length
     * @param {Boolean} useCapital  true if you want to use capital
     * @param {Boolean} useNumber   true if you want to use number
     */
   static randomString(length, useCapital, useNumber) {
        if (
            !(length instanceof Number) ||
            !(useCapital instanceof Boolean) ||
            !(useNumber instanceof Boolean)
        ) {
            return null;
        }

        const normalChars = "abcdefghijklmnopqrstuvwxyz".split("");
        const capsChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        let strings = "";
        while (strings.length < length) {
            const random = this.randomNumber(26, 0);

            if (useCapital && this.randomBoolean()) {
                strings += capsChars[random];
                continue;
            }
            if (useNumber && this.randomBoolean()) {
                strings += this.randomNumber(10, 0);
                continue;
            }

            strings += normalChars[random];
        }

        return strings;
    };

    /**
     * Creates a UUID
     *
     * @returns {String} the uuid
     */
    static createUUID() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;

            return v.toString(16);
        });
    };
  
    static async haste(text) {
      
      const req = await axios.post("https://haste.shrf.xyz/documents", { text });
      return `https://haste.shrf.xyz/${req.data.key}`
      
    };
  
    static timeParser(ms){
      
    let seconds = ms / 1000;
    let days = parseInt(seconds / 86400);
    seconds = seconds % 86400;
    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);
    
    if (days) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    else if (hours) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    else if (minutes) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
      
    };
  
    static codeBlock(string, code) {
        if(code) return `\`\`\`${code}\n${string}\`\`\``;
        return `\`\`\`${string}\`\`\``;
    };

    static timeStamp(ms) {
        var time = new Date(ms).toLocaleDateString("en-US")
        return time;
    }

    static secondParser(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600*24));
        var h = Math.floor(seconds % (3600*24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);

        var dDisplay = d > 0 ? d + (d == 1 ? "d " : "d ") : "";
        var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? "m " : "m ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;     
    }

    static numberComa(ms) {
        return ms.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    static getCurrentTime() {
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      let hours = date_ob.getHours();
      let minutes = date_ob.getMinutes();
      let seconds = date_ob.getSeconds();

      return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
    }

    static splitter(str, l) {
      var strs = [];
      while(str.length > l){
          var pos = str.substring(0, l).lastIndexOf(' ');
          pos = pos <= 0 ? l : pos;
          strs.push(str.substring(0, pos));
          var i = str.indexOf(' ', pos)+1;
          if(i < pos || i > pos+l)
              i = pos;
          str = str.substring(i);
      }
      strs.push(str);
      return strs;
    }

    static isAlphaNumeric(str) {
    var code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
          !(code > 64 && code < 91) && // upper alpha (A-Z)
          !(code > 96 && code < 123) && // lower alpha (a-z)
          !(code === 32)) { // including spacebar
        return false;
      }
    }
    return true;
  };
  
   static clean (text) {
    if (typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    
     else
    
      return text;
}
  
   
};