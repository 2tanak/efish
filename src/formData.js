export const buildFormData = (formData, data, parentKey) => {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach((key) => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    if (data !== undefined && data !== null) formData.append(parentKey, data);
  }
};

export const convertObjectToFormData = (data, parentKey) => {
  const formData = new FormData();
  buildFormData(formData, data, parentKey);
  return formData;
};
