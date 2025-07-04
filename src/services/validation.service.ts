/**
 * utility functions for different validations in input fields
 * @returns function isRequired and function isEmailFormat
 */
const validationService = () => {
  function isRequired(value:string) {
    const res = (value.trim() !== "");
    return res;
  };

  function isEmailFormat(value:string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    };

    return {
        isEmailFormat,
        isRequired
    }
};

export { validationService };

