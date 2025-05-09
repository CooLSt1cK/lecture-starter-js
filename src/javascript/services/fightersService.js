import callApi from '../helpers/apiHelper';

class FighterService {
    #endpoint = 'fighters.json';

    static getFighterDetailsEndpoint(id) {
        return `details/fighter/${id}.json`;
    }

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(id) {
        try {
            const apiResult = await callApi(this.getFighterDetailsEndpoint(id)); // Use static method
            return apiResult;
        } catch (error) {
            throw error;
        }
    }
}

const fighterService = new FighterService();

export default fighterService;
