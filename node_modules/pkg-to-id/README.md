# pkg-to-id
Extract project identity from a package json file.
Use name as project name, then goes though 
```pkg.repository.url```, ```pkg.author```, 
```pkg.bugs.url```, ```pkg.homepage```

Until it find a value for project author.

## Installation
Run the following commands to download and install the application:

```sh
$ npm i pkg-to-id --save
```

## Usage

```js
    
    var pgkToId = require('pkg-to-id ');
    
    var identity = pkgToId(require('package.json'));
    
    console.log(identity);
    // would print
    // {
    //     user: 'maboiteaspam',
    //     name: 'pkg-to-id'
    // }
    
```


## How to contribute

1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

