// A function for returning A Proper Case string 
exports.run = (myString) => {
    return myString.replace(/([^\W_]+[^\s-]*) */g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};