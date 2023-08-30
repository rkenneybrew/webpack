
var extractGhIdFromPackage = function(pkgData){
  var ghId = {
    user: null,
    name: pkgData.name
  };
  if(pkgData.repository && pkgData.repository.url){
    if(pkgData.repository.url.match(/(bitbucket:|gitlab:)?[^/]+[/][^/]+$/)){
      ghId.user = pkgData.repository.url.match(/(bitbucket:|gitlab:)?([^/]+)[/][^/]+$/)[2];
    }else if(pkgData.repository.url.match(/^https?:\/\/github[.]com\/[^/]+\/[^/]+/)){
      ghId.user = pkgData.repository.url.match(/^https?:\/\/github[.]com\/([^/]+)\/[^/]+/)[1];
    }

  }else if(pkgData.author && pkgData.author.substr){
    ghId.user = pkgData.author;

  }else if(pkgData.bugs && pkgData.bugs.url){
    if(pkgData.bugs.url.match(/\/[^/]+\/[^/]+\/issues$/)){
      ghId.user = pkgData.bugs.url.match(/\/([^/]+)\/[^/]+\/issues$/)[1];
    }

  }else if(pkgData.homepage){
    if(pkgData.homepage.match(/^https?:\/\/github[.]com\/[^/]+\/[^/]+/)){
      ghId.user = pkgData.homepage.match(/^https?:\/\/github[.]com\/([^/]+)\/[^/]+/)[1];
    }else if(pkgData.homepage.match(/^https?:\/\/[^.]+[.]github[.]io/)){
      ghId.user = pkgData.homepage.match(/^https?:\/\/([^.]+)[.]github[.]io/)[1];
    }
  }

  if(ghId.user){
    return ghId;
  }
  return false;

};

module.exports = extractGhIdFromPackage;
