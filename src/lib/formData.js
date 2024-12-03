/**
 * @param {FormData} formData
 */
export function formDataToJSON(formData) {
    /** @type {Object<string, any>} */
    var formDataObject = {};
    formData.forEach((value, key) => formDataObject[key] = value);
    return JSON.stringify(formDataObject);
}
