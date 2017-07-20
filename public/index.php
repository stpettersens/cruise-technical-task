<?php

use Phalcon\Loader;
use Phalcon\Mvc\View;
use Phalcon\Mvc\Application;
use Phalcon\Di\FactoryDefault;
use Phalcon\Mvc\Url as UrlProvider;
use Phalcon\Mvc\Collection\Manager;

// Register an autoloader.
$loader = new Loader();
$loader->registerDirs(
    [
        "../app/controllers/",
        "../app/models/",
    ]
);

$loader->register();

// Create a dependency injector (DI).
$di = new FactoryDefault();

// Setup the database connection to localhost.
$di->set(
    "mongo",
    function () {
        $mongo = new MongoClient();
        return $mongo->selectDB("cruises");
    },
    true
);

// Setup the collection manager.
$di->set('collectionManager', function () {
        return new Manager();
    },
    true
);

// Setup the view component.
$di->set(
    "view",
    function () {
        $view = new View();
        $view->setViewsDir("../app/views");
        return $view;
    }
);

// Setup a base URI so that all generated URIs include the "cruises" folder.
$di->set(
    "url",
    function () {
        $url = new UrlProvider();
        $url->setBaseUri("/cruises");
        return $url;
    }
);

// Setup the application.
$application = new Application($di);

try {
    // Handle the request.
    $response = $application->handle();
    $response->send();
} 
catch (\Exception $e) {
    echo "Exception: ", $e->getMessage();
}
