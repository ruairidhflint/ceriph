export const validator = formData => {
  let submissionValues = {
    key: '',
    message: '',
    error: false
  };

  // key validation
  if (formData.key.length < 3 || formData.key.length > 12) {
    return false;
  } else if (/^[a-zA-Z]+$/.test(formData.key) === false) {
    return false;
  } else {
    submissionValues.key = formData.key;
  }
  // message validation
  if (formData.message.length < 5 || formData.message.length > 256) {
    return false;
  } else if (/^[a-zA-Z ]+$/.test(formData.message) === false) {
    return false;
  } else {
    submissionValues.message = formData.message;
  }
  return submissionValues;
};
