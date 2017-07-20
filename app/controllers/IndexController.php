<?php

use Phalcon\Mvc\Controller;

class IndexController extends Controller {

    public function indexAction() { 

        // Set timezone as UTC.
        date_default_timezone_set('Europe/London');
        
        // Pass in filters for froms and destinations for cruises.
        $ids = []; $froms = []; $dests = []; $dates = [];
        foreach (Cruises::find() as $cruise) {
            array_push($ids, $cruise->cid);
            array_push($froms, $cruise->from);
            array_push($dests, $cruise->dest);
            array_push($dates, $cruise->date->sec);
        }
        $host = [];
        foreach (Apihosts::find() as $apihost) {
            array_push($host, $apihost->host);
            array_push($host, $apihost->port);
        }
        sort($ids); sort($froms); sort($dests);
        $this->view->setVar("ids", $ids);
        $this->view->setVar("froms", $froms);
        $this->view->setVar("dests", $dests);
        $this->view->setVar("dates", $dates);

        // Pass the first six (6) cruises to the view.
        $this->view->setVar("cruises", Cruises::find([ "limit" => 6 ]));
        $this->view->setVar("apihost", $host);
    }
}
