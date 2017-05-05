const Client = require('ssh2').Client;
const conn = new Client();
const Datastore = require('nedb');

const db = {};

db.servers = new Datastore(__dirname + '/nedb/servers.db');
db.processInfos = new Datastore(__dirname + '/nedb/processInfos.db');

db.servers.loadDatabase();
db.processInfos.loadDatabase();

db.servers.findOne({ _id: 'local' }, function (err, s) {
  
  conn.on('ready', function () {
    console.log('Client :: ready');
    
    conn.shell(function (err, stream) {
      if (err) throw err;
  
      let cmd = "ps -ef | grep 'webstorm'\n";
      var outputTxt = '';
      
      stream.on('close', function () {
        console.log('Stream :: close');
        
        let errorFilePath = outputTxt.match(/(-XX:ErrorFile=)(\S+)/)[2];
        db.processInfos.insert({'ip':s.host, 'errorFilePath':errorFilePath}, function (err) {
          if (err) throw err;
        });
        
        conn.end();
        
      }).on('data', function (data) {
        outputTxt += data;
      }).stderr.on('data', function (data) {
        console.log('STDERR: ' + data);
      });
      
      stream.end(`${cmd}exit\n`);
    });
    
  }).connect(s);
});
