/**
 * utility functions for different validations in input fields
 * @returns function isRequired and function isEmailFormat
 */
const validationService = () => {
  function isRequired(value:string, key:string) {
    const res = (value.trim() !== "");
    if (!res) {
      const errorElement = document.getElementById(`${key}-error`);
      if (errorElement) errorElement.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
    }
    return res;
  };

  function isEmailFormat(value:string, key:string) {
    const res = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!res) {
        const errorElement = document.getElementById(`${key}-error`);
        if (errorElement) errorElement.textContent = `Invalid email format`;
        }
        return res;
    };

    return {
        isEmailFormat,
        isRequired
    }
};

export { validationService };

