import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import responseHelper from '../services/responseHelper';
/**
* This class contains method (functions) required to handle
* paginateData function.
*/
class PaginateData {
  /**
     * Handle paginateData.
     * @param {object} req user request.
     * @param {object} res data response.
     * @returns {object} returned object of data.
     */
  static paginateData(req, res) {
    try {
      req.data.paginate.paginate = req.data.allDatata;
      if (req.data.start > 0) {
        req.data.paginate.Previous = {
          page: req.data.pages - 1,
          limit: req.data.skip,
        };
      } if (req.data.end < req.data.countAllData) {
        req.data.paginate.Next = {
          page: req.data.pages + 1,
          limit: req.data.skip,
        };
      }

      const data = req.data.paginate;
      responseHelper.handleSuccess(OK, `Page ${req.data.pages || null} viewed successfully`, data);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }
}
export default PaginateData;
