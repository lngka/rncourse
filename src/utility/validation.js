const validate = (val, rules, connectedValue) => {
    let isValid = true;
    for (let rule in rules) {
        switch(rule) {
            case "isEmail":
                isValid = isValid && emailValidator(val);
                break;
            case "minLength":
                isValid = isValid && minLengthValidator(val, rules[rule]);
                break;
            case "equalTo":
                isValid = isValid && equalToValidator(val, connectedValue.equalTo);
                break;
            case "notEmpty":
                isValid = isValid && notEmptyValidator(val);
                break;
            default:
                isValid = false;
        }
    }
    return isValid;
};

const emailValidator = (val) => {
    let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return emailRegex.test(val);
};

const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;
};

const equalToValidator = (val, checkValue) => {
    return val === checkValue;
};

const notEmptyValidator= (val) => {
    return val.trim() !== "";
}

export default validate;