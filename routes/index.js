var express = require('express');
var ledis= require("ledis"),
    client = ledis.createClient();
var path = require('path');
client.on("error", function (err) {
    console.log("Error " + err);

});

var router = express.Router();

router.post('/command', function(req, res, next) {
    var command= req.body.command
    keyword = command.split(" ")[0]
    result={}
    switch (keyword.toUpperCase()){
        case "SET":
            client.set(command.split(" ")[1], command.split(" ")[2],function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });
            break;

        case "GET":
            client.get(command.split(" ")[1],function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });
            break;

        case "RPUSH":
            arr = command.split(" ")
            values=arr.slice(2, arr.length)
            for (i = 0; i < values.length-1; i++){
                client.lpush(command.split(" ")[1],values[i])
            }
            client.rpush(command.split(" ")[1],values[values.length-1],function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });
            break;


        case "LLEN":
            client.llen(command.split(" ")[1],function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });
            break;

        case "LPOP":
            client.lpop(command.split(" ")[1],function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });
            break;

        case "RPOP":
            client.rpop(command.split(" ")[1],function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });
            break;

        case "TTL":
            client.ttl(command.split(" ")[1],function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });
            break;

        case "RRANGE": //TODO
            client.rrange(command.split(" ")[1],command.split(" ")[2],command.split(" ")[3],function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });
            break;

        case "SADD":
            arr = command.split(" ")
            values=arr.slice(2, arr.length)
            for (i = 0; i < values.length-1; i++){
                client.sadd(command.split(" ")[1],values[i])
            }
            client.sadd(command.split(" ")[1],values[values.length-1],function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });
            break;

        case "SCARD":
            client.scard(command.split(" ")[1],function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });
            break;

        case "SMEMBERS":
            client.smember(command.split(" ")[1],function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });

        case "SREM":
            arr = command.split(" ")
            values=arr.slice(1, arr.length)
            client.srem(values,function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });
            break;

        case "SINTER":
            arr = command.split(" ")
            values=arr.slice(1, arr.length)
            client.sinter(values,function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });
            break;


        case "KEYS":
            client.keys(command.split(" ")[0],function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });
            break;

        case "DEL":
            client.del(command.split(" ")[1],function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });
            break;

        case "FLUSHDB":
            client.flushdb(command.split(" ")[1],function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });
            break;


        case "EXPIRE":
            client.expire(command.split(" ")[1],command.split(" ")[2],function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });
            break;

        case "SAVE":
            client.fullsync(function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });
            break;


        case "RESTORE":
            client.restore(command.split(" ")[1],command.split(" ")[2],command.split(" ")[3],function (err, replies) {
                result = {
                    replies: replies};
                res.json(result)
            });
            break;

        default:
            result = {
                replies: "unknown command!"
            }
            res.json(result);
    }

});

module.exports = router;
