const Utils = {
  validateRequest(body) {
    let isValid = false;

    for (let key in body) {
      if (body[key]) isValid = true
    }

    if (isValid) return isValid;

    throw new Error('Request is not valid');
  }
}

module.exports = Utils
