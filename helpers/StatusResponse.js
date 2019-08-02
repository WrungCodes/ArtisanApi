/**
 * @description - This class takes care of all issue of returning all server responses
 */

class StatusResponse{

    /**
     * @description - success response 200
     * @param {object} res - Response Object
     * @param {object} data - Returning Data
     * @returns {JSON}
     */

    static success(res, data){
        return res.status(200).json(data);
    }

    /**
     * @description - created response 201
     * @param {object} res - Response Object
     * @param {object} data - Returning Data
     * @returns {JSON}
     */

    static created(res, data){
        return res.status(201).json(data);
    }

    /**
     * @description - not found Response 404
     * @param {object} res - Response Object
     * @param {object} data - Returning Data
     * @returns {JSON}
     */
    static notfound(res, data){
        return res.status(404).json(data);
    }

    /**
     * @description - internal server error 500
     * @param {object} res - Response Object
     * @param {object} data - Returning Data
     * @returns {JSON}
     */
    static internalServerError(res, data){
        return res.status(500).json(data);
    }

    /**
     * @description - Unauthorized 401
     * @param {object} res - Response Object
     * @param {object} data - Returning Data
     * @returns {JSON}
     */
    static unauthorized(res, data){
        return res.status(401).json(data);
    }

    /**
     * @description - Bad Response 400
     * @param {object} res - Response Object
     * @param {object} data - Returning Data
     * @returns {JSON}
     */
    static badRequest(res, data){
        return res.status(400).json(data);
    }
}

export default StatusResponse;