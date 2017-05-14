var $ = require('jquery');
var repoListManager = require('./repoListManager');

$(document).ready(function(){	
	pintarRepositorios();
});

$('#download').click(function(){	
	repoListManager.loadReposCSV();
});

var pintados=false;

function pintarRepositorios(){
	if (pintados==false) {
		repoListManager.loadRepos();
		pintados=true;
	};
}