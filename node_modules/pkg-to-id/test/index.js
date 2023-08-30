require('should')

var pkgToId = require('../');
var pkg = require('../package.json');


describe(pkg.name, function(){
  it('can use pkgData.repository.url url', function(){
    pkgToId(pkg).user.should.eql('maboiteaspam');
    pkgToId(pkg).name.should.eql('pkg-to-id');
  });
  it('can use pkgData.repository.url gh shortcut', function(){
    var p = {
      name: 'pkg-to-id',
      repository:{
        url:'maboiteaspam/pkg-to-id'
      }
    };
    pkgToId(p).user.should.eql('maboiteaspam');
    pkgToId(p).name.should.eql('pkg-to-id');
  });
  it('can use pkgData.repository.url bbt shortcut', function(){
    var p = {
      name: 'pkg-to-id',
      repository:{
        url:'bitbucket:maboiteaspam/pkg-to-id'
      }
    };
    pkgToId(p).user.should.eql('maboiteaspam');
    pkgToId(p).name.should.eql('pkg-to-id');
  });
  it('can use pkgData.author field', function(){
    var p = {
      name: 'pkg-to-id',
      author: 'maboiteaspam'
    };
    pkgToId(p).user.should.eql('maboiteaspam');
    pkgToId(p).name.should.eql('pkg-to-id');
  });
  it('can use pkgData.bugs.url', function(){
    var p = {
      name: 'pkg-to-id',
      bugs:{
        url:'https://github.com/maboiteaspam/pkg-to-id/issues'
      }
    };
    pkgToId(p).user.should.eql('maboiteaspam');
    pkgToId(p).name.should.eql('pkg-to-id');
  });
  it('can use pkgData.homepage field', function(){
    var p = {
      name: 'pkg-to-id',
      homepage: 'https://github.com/maboiteaspam/pkg-to-id#readme'
    };
    pkgToId(p).user.should.eql('maboiteaspam');
    pkgToId(p).name.should.eql('pkg-to-id');
  });
  it('can use pkgData.homepage field', function(){
    var p = {
      name: 'pkg-to-id',
      homepage: 'http://maboiteaspam.github.io/pkg-to-id/'
    };
    pkgToId(p).user.should.eql('maboiteaspam');
    pkgToId(p).name.should.eql('pkg-to-id');
  });
});