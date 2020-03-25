exports.run = (lower) => {
    if(lower != null){
    return lower.charAt(0).toUpperCase() + lower.substr(1);
    }
    else{
        return null;
    }
};