type FormInput = {
  key: string;
  message: string;
};

export const validator = (
  formData: FormInput
): { key: string; message: string } | false => {
  if (formData.key.length < 3 || formData.key.length > 12) return false;
  if (!/^[a-zA-Z]+$/.test(formData.key)) return false;
  if (formData.message.length < 5 || formData.message.length > 256) return false;
  if (!/^[a-zA-Z ]+$/.test(formData.message)) return false;

  return { key: formData.key, message: formData.message };
};
