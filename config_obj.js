// Copyright 2016 Ben Trask
// MIT licensed (see LICENSE for details)

var fs = require("fs");

var has = require("./has");


var json;
try { json = fs.readFileSync("./config.json", "utf8"); }
catch(e) { json = "{}"; }
var config = config = JSON.parse(json);


// We expect these by default in order to "fail safe" if the config
// file is missing. Copy config.json to the run directory to fix.
if(!has(config, "key_path")) config["key_path"] = "./server.key";
if(!has(config, "crt_path")) config["crt_path"] = "./server.crt";

if(!has(config, "port_tls")) config["port_tls"] = 443;
if(!has(config, "port_raw")) config["port_raw"] = 80;

if(!has(config, "db_path")) config["db_path"] = "./archive.db";
if(!has(config, "db_snapshot_path")) config["db_snapshot_path"] = "./database.sql.gz";
if(!has(config, "tmp_dir")) config["tmp_dir"] = "./tmp";

if(!has(config, "user_agent")) config["user_agent"] = "Hash Archive (https://github.com/btrask/hash-archive)";

// Note: This option is misleading/not very useful.
// The effective delay is divided by the number of workers (and CPUs in cluster mode).
// It would be better to enforce per-domain timeouts of some kind.
if(!has(config, "crawl_delay")) config["crawl_delay"] = 1000*16;

module.exports = config;

