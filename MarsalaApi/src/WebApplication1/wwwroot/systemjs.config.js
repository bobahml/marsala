(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'app': "app", // 'dist',
        'rxjs': "libs/rxjs",
        '@angular': "libs/@angular",
        'angular2-cookie': "libs/angular2-cookie",
        "signalR": "libs/signalr",
        "jquery": "libs/jquery/dist"
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: "main.js", defaultExtension: "js" },
        'rxjs': { defaultExtension: "js" },
        'angular2-cookie': { main: "core.js", defaultExtension: "js" },
        'jquery': { main: "jquery.js", defaultExtension: "js" },
        'signalR': { main: "jquery.signalR.js", defaultExtension: "js" },
    };

    var ngPackageNames = [
      "common",
      "compiler",
      "core",
      "forms",
      "http",
      "platform-browser",
      "platform-browser-dynamic",
      "router",
      "router-deprecated",
      "upgrade"
    ];


    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }

    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }

    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);
    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
    
})(this);