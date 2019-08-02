
/**
 * @description - generate UUID
 * @param {string} mask 
 * @return {string} - UUID
 */
const generateUuid = (mask) => {
    return mask.replace(/[x]/gi, () => { 
        return Math.random().toString(26)[5]; 
    });
}

export default generateUuid;