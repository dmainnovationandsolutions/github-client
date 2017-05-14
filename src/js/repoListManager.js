var $ = require('jquery');
var repoService = require('./repoService');

module.exports = {

    setUiIdeal: function() {
        $('.repositorios').removeClass().addClass('repositorios');
    },

    setUiBlank: function() {
        $('.repositorios').removeClass().addClass('repositorios no-hay');
    },

    setUiError: function() {
        $('.repositorios').removeClass().addClass('repositorios error');
    },

    setUiLoading: function() {
        $('.repositorios').removeClass().addClass('repositorios cargando');
    },

    loadRepos: function() {
        var self = this;

        // mostrar el mensaje de cargando
        self.setUiLoading();

        // cargamos los repositorios
        repoService.list(function(Repos){ // si nos devuelve repositorios
            if (Repos.length == 0) {
                self.setUiBlank(); // si no hay repositorios -> estado en blanco
            } else {
                // pintar los repositorios en el listado
                self.renderRepos(Repos);
                self.setUiIdeal(); // ponemos el estado ideal
            }
        }, function(error){ // si se produce algún error
            self.setUiError(); // ponemos el estado error
        });
    },

    renderRepos: function(Repos) {
        var html = '';
        html+='<div class="loader"></div><div class="norepos">No hay repositorios</div><div class="errorrepositorios">Ocurrió un error al obtener los repositorios</div>';
        for (var i in Repos) {
            var Repo = Repos[i];            
            html+='<div class="col-lg-3 col-md-4 col-sm-6 ">';
                        html+='<div class="panel articulo">';
                            html+='<div class="panel-image">';
                                    html+='<img class="img-responsive imagen-articulo" src="'+ Repo.owner.avatar_url+'" />';
                            html+='</div>';
                            html+='<div class="panel-autor">';
                                html+='<img class="img-responsive" src="'+ Repo.owner.avatar_url+'">';
                                html+='<div style="line-height:40px;vertical-align:middle">';
                                    html+=Repo.owner.login;
                                html+='</div>';
                            html+='</div>';
                            html+='<div class="panel-header">';
                                html+='<span><a href="#">'+ Repo.name+'</a></span>';
                            html+='</div>';
                            html+='<div class="panel-body">';
                                html+='<div class="pb25">'+Repo.full_name+'</div>';
                                html+='<div class="pb25">Incidencias abiertas: '+Repo.open_issues_count+'</div>';
                                html+='<div class="repos-like-box pb45">';
                                    html+='<span class="pull-left repos-like"><i class="fa fa-star" aria-hidden="true"></i> ('+ Repo.stargazers_count+') </span>';
                                    html+='<span class="pull-right repos-like"> ('+ Repo.forks+') <i class="fa fa-code-fork" aria-hidden="true"></i></span>';
                                html+='</div>';
                            html+='</div>';
                        html+='</div>';
                    html+='</div>';
        }
        $("#repositorios-cont").html(html);
    },

    loadReposCSV: function() {
        var self = this;
        var Datos = Array();
        // cargamos los repositorios
        repoService.list(function(Repos){ // si nos devuelve repositorios
            if (Repos.length == 0) {
                console.log('nada que exportar');
            } else {

                for (var i = Repos.length - 1; i >= 0; i--) {
                    var Repo = Repos[i];
                    var aux = {
                        name : Repo.name,
                        full_name: Repo.full_name,
                        avatar_url: Repo.owner.avatar_url,
                        open_issues_count: Repo.open_issues_count,
                        stargazers_count:Repo.stargazers_count,
                        forks:Repo.forks
                    }
                    Datos.push(aux);
                }

                // exportar los repositorios 
                self.csvRepos(Datos, 'repos_symfony.csv', 1);
            }
        }, function(error){ // si se produce algún error
            console.log('Ocurrió un error al recuerar los repositorios');
        });
    },

    csvRepos: function(JSONData, ReportTitle, ShowLabel){

        //Copy & Paste de StackOverflow

        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = '';    
        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";

            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {
                //Now convert each value to string and comma-seprated
                row += index + ',';
            }
            row = row.slice(0, -1);
            //append Label row with line break
            CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }
            row.slice(0, row.length - 1);
            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {        
            alert("Invalid data");
            return;
        }   

        //this trick will generate a temp "a" tag
        var link = document.createElement("a");    
        link.id="lnkDwnldLnk";

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);

        var csv = CSV;  
        blob = new Blob([csv], { type: 'text/csv' }); 
        var csvUrl = window.URL.createObjectURL(blob);
        var filename = ReportTitle;
        $("#lnkDwnldLnk")
        .attr({
            'download': filename,
            'href': csvUrl,
            'target': '_blank'
        }); 

        $('#lnkDwnldLnk')[0].click();    
        document.body.removeChild(link);
    } 
}
