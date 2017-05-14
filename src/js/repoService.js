var $ = require('jquery');

var API_URL = "https://api.github.com/orgs/symfony/repos";

module.exports = {

    // recuperar todas los repositorios
    list: function(successCallback, errorCallback) {
        $.ajax({
            url: API_URL,
            type: "get", // get -> recuperar datos en un API REST
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("RepoServiceError", error);
            }
        })
    }
};
