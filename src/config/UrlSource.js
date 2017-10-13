class UrlSource {
    static get ()
    {
        this.key = 'dev';

        const source =
        {
            dev:
                {
                    SGPA_API_URL : 'https://development-api.saas-solinftec.com',
                    SGPA_MAP_API_URL : 'https://development-map-api.saas-solinftec.com',
                    SGPA_JOURNEY_SERVICE_URL : 'https://development-sgpa-journey-service.saas-solinftec.com',
                    SGPA_INTEGRATION_SERVICE_URL : 'https://development-integration-server.saas-solinftec.com'
                },
            prod:
                {
                    SGPA_API_URL : 'https://development-api.saas-solinftec.com',
                    SGPA_MAP_API_URL : 'https://development-map-api.saas-solinftec.com',
                    SGPA_JOURNEY_SERVICE_URL : 'https://development-sgpa-journey-service.saas-solinftec.com',
                    SGPA_INTEGRATION_SERVICE_URL : 'https://development-integration-server.saas-solinftec.com'
                },

        };
        return source[this.key];
    }
}
export default UrlSource;


