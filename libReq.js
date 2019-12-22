

"use strict"





/******************************************************************************
 * reqIndex
 ******************************************************************************/
app.reqIndex=function*() {
  var req=this.req, res=this.res; this.site=req.site; //this.pool=DB[this.site.db].pool;
  var objQS=req.objQS;
  var siteName=req.siteName, site=req.site, uSite=req.uSite, wwwSite=req.wwwSite;

  var boVideo=0;


  var requesterCacheTime=getRequesterTime(req.headers);

  res.setHeader("Cache-Control", "must-revalidate");  res.setHeader('Last-Modified',tIndexMod.toUTCString());

  
  if(requesterCacheTime && requesterCacheTime>=tIndexMod && 0) { res.out304(); return false;   } 
  res.statusCode=200;   
  

  //boVideo=1;
  
  var Str=[];
  Str.push(`<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:og="http://ogp.me/ns#"
      xmlns:fb="http://www.facebook.com/2008/fbml">`);
  Str.push('<head>\n<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>');


  //<meta name="apple-mobile-web-app-capable" content="yes" /> 

  var ua=req.headers['user-agent']||''; ua=ua.toLowerCase();
  var boMSIE=RegExp('msie').test(ua), boAndroid=RegExp('android').test(ua), boFireFox=RegExp('firefox').test(ua), boIOS= RegExp('iPhone|iPad|iPod','i').test(ua);

  
  var tmpIcon=wwwIcon16; if('wwwIcon16' in site) tmpIcon=site.wwwIcon16;  var uIcon16=req.strSchemeLong+tmpIcon;
  var tmpIcon=wwwIcon114; if('wwwIcon114' in site) tmpIcon=site.wwwIcon114;  var uIcon114=req.strSchemeLong+tmpIcon;
  var tmpIcon=wwwIcon200; if('wwwIcon200' in site) tmpIcon=site.wwwIcon200;  var uIcon200=req.strSchemeLong+tmpIcon;
  Str.push('<link rel="icon" type="image/png" href="'+uIcon16+'" />');
  Str.push('<link rel="apple-touch-icon-precomposed" href="'+uIcon114+'"/>');



  var strTmp='';  //if(boAndroid && boFireFox) {  strTmp=", width=device-width'";}    
  var strTmpB=''; //if(boAndroid || boIOS) strTmpB=", user-scalable=no";

  Str.push("<meta name='viewport' id='viewportMy' content='initial-scale=1"+strTmp+strTmpB+"'/>");



  var metaKeywords=''; if('metaKeywords' in site) metaKeywords=site.metaKeywords;
  Str.push(`
<meta name="description" content="`+site.metaDescription+`"/>
<meta name="keywords" content="`+metaKeywords+`"/>
<link rel="canonical" href="`+uSite+`"/>`);

  
  var tmp=`
<meta property="og:title" content="`+site.strTitle+`"/>
<meta property="og:type" content="website" />
<meta property="og:url" content="`+uSite+`"/>
<meta property="og:image" content="`+uIcon200+`"/>
<meta property="og:site_name" content="`+wwwSite+`"/>
<meta property="fb:admins" content="100002646477985"/>
<meta property="fb:app_id" content="`+req.app_id+`"/>
<meta property="og:description" content="`+site.metaDescription+`"/>
<meta property="og:locale:alternate" content="sv_se" />
<meta property="og:locale:alternate" content="en_US" />`;
  if(!boDbg) Str.push(tmp);



  var uCommon=''; if(wwwCommon) uCommon=req.strSchemeLong+wwwCommon;
  var uJQuery='https://code.jquery.com/jquery-3.3.1.min.js';    if(boDbg) uJQuery=uCommon+'/'+flFoundOnTheInternetFolder+"/jquery-3.3.1.min.js";
  //Str.push('<script src="'+uJQuery+'" integrity="sha384-tsQFqpEReu7ZLhBV2VZlAu7zcOV+rXbYlF2cqB8txI/8aZajjp4Bqd+V6D5IgvKT" crossorigin="anonymous"></script>');
 
    // If boDbg then set vTmp=0 so that the url is the same, this way the debugger can reopen the file between changes
    
    // Use normal vTmp on iOS (since I don't have any method of disabling cache on iOS devices (nor any debugging interface))
  var boDbgT=boDbg; if(boIOS) boDbgT=0;
    // Include stylesheets
  var pathTmp='/stylesheets/style.css', vTmp=CacheUri[pathTmp].eTag; if(boDbgT) vTmp=0;    Str.push('<link rel="stylesheet" href="'+uCommon+pathTmp+'?v='+vTmp+'" type="text/css">');

    // Include site specific JS-files
  var uSite=req.strSchemeLong+wwwSite;
  var keyCache=siteName+'/'+leafSiteSpecific, vTmp=CacheUri[keyCache].eTag; if(boDbgT) vTmp=0;  Str.push('<script src="'+uSite+'/'+leafSiteSpecific+'?v='+vTmp+'"></script>');

    // Include JS-files
  var StrTmp=['filter.js', 'lib.js', 'libClient.js', 'client.js', 'lang/en.js'];
  for(var i=0;i<StrTmp.length;i++){
    var pathTmp='/'+StrTmp[i], vTmp=CacheUri[pathTmp].eTag; if(boDbgT) vTmp=0;    Str.push('<script src="'+uCommon+pathTmp+'?v='+vTmp+'"></script>');
  }

    // Include plugins
  Str.push(`<script>
var app=window;
var CreatorPlugin={};
</script>`);



  var strTracker, tmpID=site.googleAnalyticsTrackingID||null;
  if(boDbg||!tmpID){strTracker=`<script> ga=function(){};</script>`;}else{ 
  strTracker=`
<script type="text/javascript">
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', '`+tmpID+`', 'auto');
  ga('send', 'pageview');
</script>`;
  }
  Str.push(strTracker);

  Str.push("</head>");
  Str.push('<body style="visibility:hidden">');


  Str.push("<title>"+site.strTitle+"</title>\n<h1>"+site.strH1+"</h1>\n");

  Str.push(`\n<script type="text/javascript" language="JavaScript" charset="UTF-8">
boTLS=`+JSON.stringify(req.boTLS)+`;
siteName=`+JSON.stringify(req.siteName)+`;
</script>

<form id=OpenID>
<label name=OpenID>OpenID</label><input type=text name=OpenID>
<button type=submit name=submit>Go</button> 
</form>
</body>
</html>`);


  var str=Str.join('\n');   res.writeHead(200, "OK", {'Content-Type': MimeType.html});
  res.end(str);    
}


/******************************************************************************
 * ReqLoginBack
 ******************************************************************************/
//app.ReqLoginBack=function(req, res){
  //this.req=req; this.res=res; //this.site=req.site; this.pool=DB[this.site.db].pool;
  //this.mess=[];  this.Str=[];
//}
app.ReqLoginBack=function(objReqRes){
  Object.assign(this, objReqRes);
  this.mess=[];  this.Str=[];
}
ReqLoginBack.prototype.go=function*(){
  var self=this, req=this.req, flow=req.flow, res=this.res, sessionID=req.sessionID, objQS=req.objQS;

  var redisVar=this.req.sessionID+'_Login'; // strTmp=wrapRedisSendCommand('get',[redisVar]);
  //this.sessionLogin=JSON.parse(strTmp);
  this.sessionLogin=yield* getRedis(flow, redisVar,1);
  if(!this.sessionLogin) { res.out500('!sessionLogin');  return; }
  var strFun=this.sessionLogin.fun;
  var siteNameLoc=this.sessionLogin.siteName;
  this.site=Site[siteNameLoc];
  //this.pool=DB[this.site.db].pool;
  

  //getSessionMain.call(this);
  this.sessionCache=yield* getRedis(flow, req.sessionID+'_Cache',1);
  if(!this.sessionCache) { res.out500('!sessionCache');  return; } 
  var redisVar=this.req.sessionID+'_Cache'; // tmp=wrapRedisSendCommand('expire',[redisVar,maxUnactivity]);
  var tmp=yield* expireRedis(flow, redisVar, maxUnactivity);

  if(!this.sessionCache.userInfoFrDB){
    this.sessionCache.userInfoFrDB=extend({},specialistDefault);
    //setSessionMain.call(this);
    yield *setRedis(flow, req.sessionID+'_Cache', this.sessionCache, maxUnactivity);
  }
  

  if('error' in objQS && objQS.error=='access_denied') {this.finF(objQS.error); return}

  //var fiber = Fiber.current

    // getToken
  var code=objQS.code;
  var uLoginBack=req.uSite+"/"+leafLoginBack; // This should use the site of the actual request

  if(objQS.state==this.sessionLogin.state) {
    var uToGetToken = "https://graph.facebook.com/v3.2/oauth/access_token?"+"client_id="+req.app_id+"&redirect_uri="+encodeURIComponent(uLoginBack)+"&client_secret="+req.app_secret+"&code="+code;
    var reqStream=requestMod.get(uToGetToken); 
    //var semCB=0, semY=0, buf; 
    //var myConcat=concat(function(bufT){
      //buf=bufT;
      //if(semY) fiber.run(); semCB=1;
    //});
    //reqStream.pipe(myConcat);
    //if(!semCB){semY=1; Fiber.yield();}
    var semCB=0, semY=0,  buf, myConcat=concat(function(bufT){ buf=bufT; if(semY) flow.next(); semCB=1;  });    reqStream.pipe(myConcat);    if(!semCB){semY=1; yield}
    //var params=JSON.parse(buf.toString());
    try{ var params=JSON.parse(buf.toString()); }catch(e){ console.log(e); res.out500('Error in JSON.parse, '+e); return; }
    self.access_token=params.access_token;
    if('error' in params) { var tmp='Error when getting access token: '+params.error.message; console.log(tmp); res.out500(tmp); return; }

  } else {
    var tmp="The state does not match. You may be a victim of CSRF.";    res.out500(tmp); return
  }


  //var  semCB=0, semY=0, boDoExit=0; 
  //this.getGraph(function(err,res){
    //if(err){  boDoExit=1; res.out500(err);  }
    //if(semY) fiber.run(); semCB=1;
  //});
  //if(!semCB){semY=1; Fiber.yield();}  if(boDoExit==1) return;

  //var semCB=0, semY=0; 
  //var err, res; this.getGraph(function(errT,resT){ err=errT; res=resT; if(semY) flow.next(); semCB=1; }); if(!semCB){semY=1; yield;}  if(err){ res.out500(err); return; }
  var [err, res]=yield* this.getGraph();  if(err){ res.out500(err); return; }

    // interpretGraph
  //this.interpretGraph(function(err,res){ });
  var objGraph=this.objGraph;  
  if('error' in objGraph) {  var tmp='Error accessing data from facebook'; console.log(tmp+': '+objGraph.error.type+' '+objGraph.error.message+'<br>'); res.out500(tmp);  return; }
  var IP='fb', idIP=objGraph.id, nameIP=objGraph.name, nickIP=objGraph.username||nameIP;
  //var gender=objGraph.gender, locale=objGraph.locale, timezone=objGraph.timezone;
  
  //console.log('objGraph: '+Object.keys(objGraph).join());
  var homeTown='', state='';
  if('hometown' in objGraph){
    var regTmp=/^([^,]*),(.*)$/, tmp=regTmp.exec(objGraph.hometown.name);
    if(tmp===null) {var tmp='Could not parse hometown from facebook'; res.out500(tmp); return;}
    homeTown=tmp[1].trim(); state=tmp[2].trim();
  }

  //if(!objGraph.verified) { var tmp="Your Facebook account is not verified. Try search internet for  \"How to verify Facebook account\".";  res.out500(tmp);   return; }

  if(typeof idIP=='undefined') {console.log("Error idIP is empty");}  else if(typeof nameIP=='undefined' ) {nameIP=idIP;}
  
  if('userInfoFrIP' in this.sessionCache){
    if(this.sessionCache.userInfoFrIP.IP!==IP || this.sessionCache.userInfoFrIP.idIP!==idIP){
      this.sessionCache.userInfoFrDB=extend({},specialistDefault);    
    }
  }
  this.sessionCache.userInfoFrIP={IP:IP, idIP:idIP, nameIP:nameIP, nickIP:nickIP, homeTown:homeTown, state:state};
  //copySome(this.sessionCache.userInfoFrIP, objGraph, ['gender', 'locale', 'timezone']);
  extend(this.sessionCache.userInfoFrIP, {gender:'male', locale:'', timezone:'0000'});
  //setSessionMain.call(this);
  yield *setRedis(flow, req.sessionID+'_Cache', this.sessionCache, maxUnactivity);
  this.IP=IP;this.idIP=idIP;


  if(['adminFun'].indexOf(strFun)!=-1){
    var [err, res]=yield* this[strFun]();  if(err){ res.out500(err); return; }
  }
  
  var [err, res]=yield* runIdIP.call(this, flow, this.IP, this.idIP);
  if(err){ res.out500(err); return; }
  
  extend(this.sessionCache.userInfoFrDB,res); 
  
  //setSessionMain.call(this);
  yield *setRedis(flow, req.sessionID+'_Cache', this.sessionCache, maxUnactivity);

    // setCSRFCode
  var CSRFCode=randomHash();
  var redisVar=this.req.sessionID+'_CSRFCode'+ucfirst(this.sessionLogin.caller);
  //wrapRedisSendCommand('set',[redisVar, CSRFCode]);    var tmp=wrapRedisSendCommand('expire',[redisVar,maxUnactivity]);
  yield *setRedis(req.flow, redisVar, CSRFCode, maxUnactivity);
  this.CSRFCode=CSRFCode;

  this.finF(null);

}

ReqLoginBack.prototype.finF=function(err){
  var self=this, req=this.req, res=this.res;
  
  var boOK=!Boolean(err);
  var strMess=this.mess.join(', ');
  //if(err){res.out500(err);  return; }
  if(err){
    console.log('err: '+err); //console.log('results: '+results); console.log('mess: '+strMess);  console.log(req.objQS); 
  }
  //var uSite=req.strSchemeLong+req.wwwSite;
  //<link rel='canonical' href='"+uSite+"'/>
  
  var Str=this.Str;
  Str.push(`
<html><head><meta name='robots' content='noindex'>
</head>
<body>
<script>
var boOK=`+JSON.stringify(boOK)+`;
var strMess=`+serialize(strMess)+`;

if(boOK){
  var userInfoFrIPTT=`+JSON.stringify(this.sessionCache.userInfoFrIP)+`;
  var userInfoFrDBTT=`+JSON.stringify(this.sessionCache.userInfoFrDB)+`;
  var CSRFCodeTT=`+JSON.stringify(this.CSRFCode)+`;
  var fun=`+serialize(this.sessionLogin.fun)+`;
  window.opener.loginReturn(userInfoFrIPTT,userInfoFrDBTT,fun,strMess,CSRFCodeTT);
  window.close();
}
else {
//debugger
  //alert('Login canceled: '+strMess);
  window.close();
}
</script>
</body>
</html>
`);
  var str=Str.join('\n');
  //res.setHeader('Content-Type', MimeType.html); 
  res.end(str);
}

ReqLoginBack.prototype.adminFun=function*(){
  var req=this.req, flow=req.flow, res=this.res, {userTab, adminTab}=this.site.TableName;
  var IP=this.IP, idIP=this.idIP;
   
  var Sql=[], Val=[IP, idIP];
  Sql.push("INSERT INTO "+userTab+" (IP,idIP) VALUES (?,?) ON DUPLICATE KEY UPDATE idUser=LAST_INSERT_ID(idUser);");
  Sql.push("INSERT INTO "+adminTab+" VALUES (LAST_INSERT_ID(),0,now()) ON DUPLICATE KEY UPDATE created=VALUES(created);");
  var sql=Sql.join('\n');
  var [err, results]=yield* this.myMySql.query(flow, sql, Val); if(err) return [err]; 
  
  //yield* setRedis(flow, strAppName+'TLastWrite', unixNow());
  return [null,0];
  //var [err, results]=yield* this.myMySql.query(flow, sql, Val); if(err) { res.out500(err); callback('exited'); return; }
  //callback(null,0);
  
  
  //myQueryF(sql, Val, this.pool, function(err, results) {
    //if(err){ res.out500(err); callback('exited'); return; }
    //callback(null,0);
  //});
}

ReqLoginBack.prototype.getGraph=function*(){
  var req=this.req, flow=req.flow, res=this.res;
    // With the access_token you can get the data about the user
  var uGraph = "https://graph.facebook.com/v3.2/me?access_token="+this.access_token+'&fields=id,name,picture,locale,timezone,gender'; //,verified
  var reqStream=requestMod.get(uGraph);
  //var myConcat=concat(function(buf){
    //var objGraph=JSON.parse(buf.toString());
    //self.objGraph=objGraph;
  //});
  //reqStream.pipe(myConcat);
  var buf, myConcat=concat(function(bufT){ buf=bufT; flow.next();  });    reqStream.pipe(myConcat);    yield;
  var objGraph=JSON.parse(buf.toString());
  this.objGraph=objGraph;
  return [null,''];
}





/******************************************************************************
 * reqStatic
 ******************************************************************************/
app.reqStatic=function*() {
  var req=this.req, res=this.res;
  var site=req.site; this.Str=[];
  var siteName=req.siteName;
  var pathName=req.pathName;
  
  //var RegAllowedOriginOfStaticFile=[RegExp("^https\:\/\/(closeby\.market|gavott\.com)")];
  //var RegAllowedOriginOfStaticFile=[RegExp("^http\:\/\/(localhost|192\.168\.0)")];
  var RegAllowedOriginOfStaticFile=[];
  setAccessControlAllowOrigin(req, res, RegAllowedOriginOfStaticFile);
  if(req.method=='OPTIONS'){ res.end(); return ;}

  //if('origin' in req.headers){ //if cross site
    //var http_origin=req.headers.origin, objUrl=url.parse(http_origin);
    //var boOK=0, keys=Object.keys(Site); for(var i=0;i<keys.length;i++){if(objUrl.host==Site[keys[i]].wwwSite) {boOK=1; break;} }; 
    //if(boOK) res.setHeader("Access-Control-Allow-Origin", http_origin);
    //if(req.method=='OPTIONS'){  res.end(); return;}
  //}

  var eTagIn=getETag(req.headers);
  var keyCache=pathName; if(pathName==='/'+leafSiteSpecific) keyCache=siteName+keyCache; 
  if(!(keyCache in CacheUri)){
    var filename=pathName.substr(1);
    var [err]=yield* readFileToCache(req.flow, filename);
    if(err) {
      if(err.code=='ENOENT') {res.out404(); return;}
      if('host' in req.headers) console.error('Faulty request from'+req.headers.host);
      if('Referer' in req.headers) console.error('Referer:'+req.headers.Referer);
      res.out500(err); return;
    }
  }
  var {buf, type, eTag, boZip, boUglify}=CacheUri[keyCache];
  if(eTag===eTagIn){ res.out304(); return; }
  var mimeType=MimeType[type];
  if(typeof mimeType!='string') console.log('type: '+type+', mimeType: ', mimeType);
  if(typeof buf!='object' || !('length' in buf)) console.log('typeof buf: '+typeof buf);
  if(typeof eTag!='string') console.log('typeof eTag: '+eTag);
  var objHead={"Content-Type": mimeType, "Content-Length":buf.length, ETag: eTag, "Cache-Control":"public, max-age=31536000"};
  if(boZip) objHead["Content-Encoding"]='gzip';
  res.writeHead(200, objHead); // "Last-Modified": maxModTime.toUTCString(),
  res.write(buf); //, this.encWrite
  res.end();
}


/******************************************************************************
 * reqMonitor
 ******************************************************************************/
app.reqMonitor=function*(){
  var req=this.req, flow=req.flow, res=this.res,  site=req.site; this.Str=[]; // this.pool=DB[this.site.db].pool;
  var timeCur=unixNow(); boRefresh=0;   if(site.timerNUserLast<timeCur-5*60) {boRefresh=1; site.timerNUserLast=timeCur;}
  
  var siteName=req.siteName, site=req.site, objQS=req.objQS;
  var userTab=site.TableName.userTab;
  //var fiber = Fiber.current; 

  
  if(boRefresh){ 
    var Sql=[];
    Sql.push("SELECT count(*) AS n FROM "+userTab+";");

    var sql=Sql.join('\n'), Val=[];
    var [err, results]=yield* this.myMySql.query(flow, sql, Val); if(err) { res.out500(err); return; }
    site.nUser=results[0].n;
  }
  var nUser=site.nUser;
  var Str=this.Str;
  Str.push(`<!DOCTYPE html>
<html><head><meta name="robots" content="noindex"></head>`);
  var strColor='';
  if('admin' in objQS && objQS.admin){
    if(boRefresh) strColor='lightgreen';
    if(site.boGotNewVendors) strColor='red';
  }
  var strUser=nUser;  if(strColor) strUser="<span style=\"background-color:"+strColor+"\">"+nUser+"</span>";
  Str.push("<body style=\"margin: 0px\">"+strUser+"</body>");
  Str.push("</html>");

  var str=Str.join('\n');  res.end(str);
}









/******************************************************************************
 * SetupSql
 ******************************************************************************/
app.SetupSql=function(){
}
app.SetupSql.prototype.createTable=function*(flow, siteName, boDropOnly){
  var site=Site[siteName]; 
  
  var SqlTabDrop=[], SqlTab=[];
  var {Prop, TableName, ViewName}=site;
  var {settingTab, adminTab, userTab, userSnapShotTab}=TableName; // , choiseTab, choiseSnapShotTab
  //eval(extractLoc(ViewName,'ViewName'));

  var StrTabName=object_values(TableName);
  var tmp=StrTabName.join(', ');
  SqlTabDrop.push("DROP TABLE IF EXISTS "+tmp);     
  SqlTabDrop.push('DROP TABLE IF EXISTS '+userTab);     
  //var tmp=object_values(ViewName).join(', ');   if(tmp.length) SqlTabDrop.push("DROP VIEW IF EXISTS "+tmp+"");


  var collate="utf8_general_ci";
  var engine='INNODB';  //engine='MyISAM';
  var auto_increment=1;

  var strIPEnum="ENUM('"+Prop.IP.Enum.join("', '")+"')";


    // Create userTab
  var arrCols=[]; 
  for(var i=0;i<site.StrOrderDB.length;i++){
    var name=site.StrOrderDB[i];
    var arr=Prop[name];
    var b=arr.b;
    if(Number(b[bFlip.userTab])){
      var strType=arr.type||'';
      if(strType=='ENUM'){
        //$tmpName='enum'.ucfirst($name);
        //$arra=$$tmpName;$str=implode("','",$arra); if(count($arra)>0) $str="'$str'";
        var arra=Prop[name].Enum, str=arra.join("','"); if(arra.length) str="'"+str+"'";
        strType="ENUM("+str+")";
      }
      var strNull=Number(b[bFlip.notNull])?'NOT NULL':'';
      var strDefault=arr.default?"DEFAULT "+arr.default:'';
      var strOther=arr.other||'';
      arrCols.push("`"+name+"` "+strType+" "+strNull+" "+strDefault+" "+strOther);
    }//``
  }
  var strSql=arrCols.join(",\n");
  
  
    // Create userTab and userSnapShotTab
  var arrTmp=[userTab, userSnapShotTab];
  for(var i=0;i<arrTmp.length;i++ ){
    var userTabT=arrTmp[i];
    SqlTab.push(`CREATE TABLE `+userTabT+` (
    `+strSql+`,
    PRIMARY KEY (idUser),
    UNIQUE KEY (IP,idIP)
    ) ENGINE=`+engine+` COLLATE `+collate); 

      // Create indexes
    for(var name in Prop){
      var arr=Prop[name];
      var b=arr.b;
      if(Number(b[bFlip.userTabIndex])){
        if(0) SqlTab.push("CREATE INDEX "+name+"Index ON "+userTabT+"("+name+")");
      }
    }
  }


  SqlTab.push(`CREATE TABLE `+settingTab+` (
  name varchar(65) CHARSET utf8 NOT NULL,
  value varchar(65) CHARSET utf8 NOT NULL,
  UNIQUE KEY (name)
  ) ENGINE=`+engine+` COLLATE `+collate); 


    // Create admin
  SqlTab.push(`CREATE TABLE `+adminTab+` (
  idUser int(4) NOT NULL,
  boApproved tinyint(1) NOT NULL,
  created TIMESTAMP default CURRENT_TIMESTAMP,
  FOREIGN KEY (idUser) REFERENCES `+userTab+`(idUser) ON DELETE CASCADE,
  UNIQUE KEY (idUser)
  ) ENGINE=`+engine+` COLLATE `+collate); 



  addBinTableSql(SqlTabDrop,SqlTab,siteName,Prop,engine,collate);

  
  if(boDropOnly) var Sql=SqlTabDrop;
  else var Sql=array_merge(SqlTabDrop, SqlTab);
  
  var strDelim=';', sql=Sql.join(strDelim+'\n')+strDelim, Val=[];
  var [err, results]=yield* this.myMySql.query(flow, sql, Val);
  writeMessTextOfMultQuery(Sql, err, results);
  if(err) {  return [err]; }
  return [null];
}


app.SetupSql.prototype.createFunction=function*(flow, siteName, boDropOnly){
  var site=Site[siteName]; 
  
  var SqlFunctionDrop=[], SqlFunction=[];
  
  var {Prop, TableName, ViewName}=site;
  var {settingTab, adminTab, userTab, userSnapShotTab}=TableName; // , choiseTab, choiseSnapShotTab
  //eval(extractLoc(ViewName,'ViewName'));



  SqlFunctionDrop.push("DROP PROCEDURE IF EXISTS "+siteName+"condMakeSnapShot");


  SqlFunctionDrop.push("DROP PROCEDURE IF EXISTS "+siteName+"dupMake");
  SqlFunction.push(`CREATE PROCEDURE `+siteName+`dupMake()
      BEGIN
        CALL copyTable('`+userTab+`_dup','`+userTab+`');
        CALL copyTable('`+adminTab+`_dup','`+adminTab+`');
      END`);



  SqlFunctionDrop.push("DROP PROCEDURE IF EXISTS "+siteName+"dupTrunkOrgNCopyBack");
  SqlFunction.push(`CREATE PROCEDURE `+siteName+`dupTrunkOrgNCopyBack()
      BEGIN
        DELETE FROM `+adminTab+` WHERE 1;
        DELETE FROM `+userTab+` WHERE 1;

        INSERT INTO `+userTab+` SELECT * FROM `+userTab+`_dup;
        INSERT INTO `+adminTab+` SELECT * FROM `+adminTab+`_dup;
      END`);

  SqlFunctionDrop.push("DROP PROCEDURE IF EXISTS "+siteName+"dupDrop");
  SqlFunction.push(`CREATE PROCEDURE `+siteName+`dupDrop()
      BEGIN
        DROP TABLE IF EXISTS `+adminTab+`_dup;
        DROP TABLE IF EXISTS `+userTab+`_dup;
      END`);

  
  if(boDropOnly) var Sql=SqlFunctionDrop;
  else var Sql=array_merge(SqlFunctionDrop, SqlFunction);
  
  
  var strDelim=';', sql=Sql.join(strDelim+'\n')+strDelim, Val=[];
  var [err, results]=yield* this.myMySql.query(flow, sql, Val);
  writeMessTextOfMultQuery(Sql, err, results);
  if(err) {  return [err]; }
  return [null];
}


app.SetupSql.prototype.funcGen=function*(flow, boDropOnly){
  var SqlFunction=[], SqlFunctionDrop=[];
  SqlFunctionDrop.push("DROP PROCEDURE IF EXISTS copyTable");
  SqlFunction.push(`CREATE PROCEDURE copyTable(INameN varchar(128),IName varchar(128))
    BEGIN
      SET @q=CONCAT('DROP TABLE IF EXISTS ', INameN,';');     PREPARE stmt1 FROM @q;  EXECUTE stmt1;  DEALLOCATE PREPARE stmt1;
      SET @q=CONCAT('CREATE TABLE ',INameN,' LIKE ',IName,';');   PREPARE stmt1 FROM @q;  EXECUTE stmt1; DEALLOCATE PREPARE stmt1;
      SET @q=CONCAT('INSERT INTO ',INameN, ' SELECT * FROM ',IName,';');    PREPARE stmt1 FROM @q;  EXECUTE stmt1;  DEALLOCATE PREPARE stmt1;
    END`);

  if(boDropOnly) var Sql=SqlFunctionDrop;
  else var Sql=array_merge(SqlFunctionDrop, SqlFunction);
  
  var strDelim=';', sql=Sql.join(strDelim+'\n')+strDelim, Val=[];
  var [err, results]=yield* this.myMySql.query(flow, sql, Val);
  writeMessTextOfMultQuery(Sql, err, results);
  if(err) {  return [err]; }
  return [null];
}




app.SetupSql.prototype.createDummies=function*(flow, siteName){
  var site=Site[siteName]; 
  
  var Sql=[];
  var arrAddress=[];
  //arrAddress.push({country:'Sweden', homeTown:'Uppsala', currency:'SEK', x:140.51976455111, y:74.570362445619, n:5, std:0.1, locale:'sv', state:'Sweden', timezone:1});
  //arrAddress.push({country:'Sweden', homeTown:'Stockholm', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});

  if(1){
  /*
  arrAddress.push({country:'Sweden', homeTown:'Solna', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Upplands Väsby', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Sollentuna', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Nortälje', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Södertälje', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Sigtuna', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Värmdö', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Haninge', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Nynäshamn', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Nykvarn', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Ekerö', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  */
  /*arrAddress.push({country:'Sweden', homeTown:'Salem', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Botkyrka', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Huddinge', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Tyresö', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Nacka', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Lindingö', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Sundbyberg', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Järfälla', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Danderyd', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Vaxholm', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Täby', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Vallentuna', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Sweden', homeTown:'Österåker', currency:'SEK', x:140.84200964814016, y:75.28506309708814, n:5, std:0.01, locale:'sv', state:'Sweden', timezone:1});
  */
  /*
  arrAddress.push({country:'Sweden', homeTown:'Göteborg', currency:'SEK', x:136.51532755738089, y:77.49346382340636, n:7, std:0.3, locale:'sv', state:'Sweden', timezone:1});
  arrAddress.push({country:'Denmark', homeTown:'København', currency:'DKK', x:136.93473555466124, y:80.13125508448312, n:7, std:0.3, locale:'dk', state:'Denmark', timezone:1});
  arrAddress.push({country:'Norway', homeTown:'Oslo', currency:'NOK', x:135.64994551559874, y:74.46792500635812, n:7, std:0.3, locale:'no', state:'Norway', timezone:1});
  arrAddress.push({country:'Finland', homeTown:'Helsinki', currency:'EUR', x:145.73099340101697, y:74.05775005653538, n:7, std:0.3, locale:'fi', state:'Finland', timezone:2});
  */

  arrAddress.push({country:'UK', homeTown:'London', currency:'GBP', x:127.92629919892141, y:85.11312706193192, n:10, std:0.5, locale:'en', state:'UK', timezone:0});
  //arrAddress.push({country:'France', homeTown:'Paris', currency:'EUR', x:129.6294241989214, y:88.07406456193192, n:10, std:0.5, locale:'fr', state:'France', timezone:1});
  //arrAddress.push({country:'Italy', homeTown:'Rom', currency:'EUR', x:136.8811346138079, y:95.13470489701334, n:10, std:0.5, locale:'it', state:'Italy', timezone:1});
  //arrAddress.push({country:'Spain', homeTown:'Madrid', currency:'EUR', x:125.37955748049507, y:96.54275866022407, n:10, std:0.5, locale:'es', state:'Spain', timezone:1});
  arrAddress.push({country:'USA', homeTown:'NY', currency:'USD', x:75.39355286293579, y:96.21422827476029, n:10, std:0.5, locale:'en', state:'NY', timezone:-5});
  //arrAddress.push({country:'USA', homeTown:'Chicago', currency:'USD', x:65.67872790747845, y:95.16096079575951, n:10, std:0.5, locale:'en', state:'Illinois', timezone:-6});
  arrAddress.push({country:'USA', homeTown:'LA', currency:'USD', x:43.95576759128889, y:102.2555423122189, n:10, std:0.5, locale:'en', state:'California', timezone:-8});
  arrAddress.push({country:'Japan', homeTown:'Tokyo', currency:'JPY', x:227.3887757633159, y:100.80702770236107, n:10, std:0.5, locale:'jp', state:'Japan', timezone:9});
  arrAddress.push({country:'China', homeTown:'Beijing', currency:'CNY', x:210.7708451431501, y:96.99141526807438, n:10, std:0.5, locale:'cn', state:'China', timezone:8});
  arrAddress.push({country:'India', homeTown:'Mumbai', currency:'INR', x:179.7837377942387, y:114.25584433021675, n:10, std:0.5, locale:'en', state:'India', timezone:5});

  }

  var arrSelection=[];
  for(var i=0;i<arrAddress.length;i++){
    var objT=arrAddress[i];
    arrSelection=array_mergeM(arrSelection,array_fill(objT.n,i.toString()));
  }

  var getRandomPostAddress=function(){
    var key=arrSelection[randomInt(0, arrSelection.length-1)];
    return arrAddress[key];
  }


  var {Prop, TableName, ViewName}=site;
  var Enum={};   for(var name in Prop) {if('Enum' in Prop[name]) Enum[name]=Prop[name].Enum.concat([]); }   //extend(Enum,site.Enum);
  var {settingTab, adminTab, userTab, userSnapShotTab}=TableName; // , choiseTab, choiseSnapShotTab
  //eval(extractLoc(ViewName,'ViewName'));

  
  var getRandEnum=function(name){  var enumT=Enum[name]; return enumT[randomInt(0, enumT.length-1)];  };
  var getRandomDate=function(diff){ var now=unixNow(), t0, t1; if(diff>0){t0=now; t1=now+diff;} else{t0=now+diff; t1=now;} return randomInt(t0, t1);}; // diff<0 => history, diff>0 => future
  var getRandomDateW=function(name){ var dateSpan=DateSpan[name]; return getRandomDate(dateSpan);};
  var getRandSpan=function(name){ var tmp=RandSpanData[name]; return randomInt(tmp[0],tmp[1]);};

  var MakeRandF={}, DateSpan={}, RandSpanData={}, FixedData={};
  
   
  DateSpan.created=-2*8760*3600;   
  DateSpan.lastActivity=-7*24*3600;   

  
  RandSpanData.choise=[0, Prop.choise.Enum.length-1];


  var sql="SELECT MAX(idUser) AS nLast FROM "+userTab, Val=[];
  var [err, results]=yield* this.myMySql.query(flow, sql, Val);  if(err) {  return [err]; }
  var nLast=results[0].nLast;
  var nFirst=nLast===null?1:nLast+1;
  
  var nData=10;
  //var nData=1000;
  //var nData=10000;

  //if(siteName=='demo') nData=500;
  if(site.wwwSite.substr(0,5)=='demo.') nData=50;
  if(boLocal) nData=100;

  var StringData=['IP', 'idIP', 'nameIP', 'nickIP', 'homeTown', 'state', 'locale', 'gender'];  // Features whose value should be surronded by "'"

  var StrPlugIn=site.StrPlugIn;
  var arrAssign=[];
  if(in_array("general", StrPlugIn)){ arrAssign=['idUser', 'IP', 'idIP', 'lastActivity', 'created', 'choise']; }

  if(in_array("appFB", StrPlugIn)){
    arrAssign=arrAssign.concat(['homeTown','state','locale','timezone','gender', 'nameIP', 'nickIP']);
    //Enum.timezone=range(-12,12,1);      Enum.locale=['en','sv','no'];   Enum.homeTown=['NY','LA','Rio']; Enum.state=['USA','Sweden','no'];
    Enum.gender=Prop.gender.Enum;  //['male', 'female'];
    //var tmp=['gender'];      
  }

  if(in_array("appOI", StrPlugIn)){
    arrAssign=arrAssign.concat([ 'nameIP', 'nickIP']);
  }
  if(in_array("appGoogle", StrPlugIn)){
    arrAssign=arrAssign.concat([ 'nameIP', 'nickIP']);
  }
  var StrName=[];     for(var j=0;j<arrAssign.length;j++){  var name=arrAssign[j];  StrName[j]="`"+name+"`";    }       var strName=StrName.join(', ')

  var SqlAllU=[];  var SqlAllC=[];
  var AddressT={};
  //for(var i=1;i<nData+1;i++){
  for(var i=nFirst;i<nFirst+nData;i++){ 
    //var idTmp=i+1;  
    var tmp="Dummy"+i, person={idUser:i, IP:'openid', idIP:tmp, nameIP:tmp, nickIP:tmp, tel:"07000000"+i};

    var AddressT=extend(AddressT,getRandomPostAddress());
    AddressT.x+=gauss_ms(0,AddressT.std); AddressT.y+=gauss_ms(0,AddressT.std);   

    var StrIns=[];
    for(var j=0;j<arrAssign.length;j++){
      var name=arrAssign[j], QMark="?", value=0;
      if(name in person) value=person[name];
      else if(name in person) value=person[name]; 
      else if(name in AddressT) value=AddressT[name];
      else if(name in FixedData){ value=FixedData[name];  }
      else if(name in RandSpanData){ value=getRandSpan(name);  }
      else if(name in Enum){ value=getRandEnum(name);  }
      else if(name in DateSpan){ value=getRandomDateW(name);  }
      //if(name in UserUpdF){ var tmp=UserUpdF[name].call(site.Enum,name,value); QMark=tmp[0]; var trash=tmp[1];  }
      if(!(name in Prop)) debugger
      if('voterUpdF' in Prop[name]){ var [QMark,trash]=Prop[name].voterUpdF.call(Prop,name,value);  }
      var valT=QMark.replace(/\?/,value);     
      if(in_array(name,StringData) && value!==null){ valT="'"+valT+"'";}

      StrIns.push(valT);
    }
    //var c0=getRandSpan('choise'); StrIns.push(c0);
    var strIns=StrIns.join(', ');  
    var sqlCurU="("+strIns+")"; 
    SqlAllU.push(sqlCurU);  

     //, c1;     while(1) {c1=getRandSpan('choise'); if(c1!=c0) break;}
    //var sqlCurC="("+person.idUser+', '+getRandSpan('choise')+")";     SqlAllC.push(sqlCurC);  
    //var sqlCurC="("+person.idUser+', '+c0+")";     SqlAllC.push(sqlCurC);  
    //if(Math.random()>0.5) {var sqlCurC="("+person.idUser+', '+c1+")";     SqlAllC.push(sqlCurC);  }
  }

  var tmp=SqlAllU.join(",");
  Sql.push("INSERT INTO "+userTab+" ( "+strName+") VALUES "+tmp);


  //var tmp=SqlAllC.join(",");
  //Sql.push("INSERT INTO "+choiseTab+" (idUser,choise) VALUES "+tmp);

  var strDelim=';', sql=Sql.join(strDelim+'\n')+strDelim, Val=[];
  var [err, results]=yield* this.myMySql.query(flow, sql, Val);  if(err) {  return [err]; }
  return [null];
}


app.SetupSql.prototype.createDummy=function*(flow, siteName){
  var site=Site[siteName]; 
  return [null];
}

app.SetupSql.prototype.truncate=function*(flow, siteName){
  var site=Site[siteName]; 
  var Sql=[]; 

  //var StrTabName=object_values(site.TableName);
  var StrTabName=["setting","admin","user"]; //,"choise"
  var StrTabName=["admin","user"]; //,"choise"
  for(var i=0;i<StrTabName.length;i++){    StrTabName[i]=siteName+'_'+StrTabName[i];  }

  var SqlTmp=[];
  for(var i=0;i<StrTabName.length;i++){
    SqlTmp.push(StrTabName[i]+" WRITE");
  }
  Sql.push('SET FOREIGN_KEY_CHECKS=0');
  var tmp="LOCK TABLES "+SqlTmp.join(', ');
  Sql.push(tmp);
  for(var i=0;i<StrTabName.length;i++){
    Sql.push("DELETE FROM "+StrTabName[i]);
    Sql.push("ALTER TABLE "+StrTabName[i]+" AUTO_INCREMENT = 1");
  }
  Sql.push('UNLOCK TABLES');
  Sql.push('SET FOREIGN_KEY_CHECKS=1');
  
  var strDelim=';', sql=Sql.join(strDelim+'\n')+strDelim, Val=[];
  var [err, results]=yield* this.myMySql.query(flow, sql, Val);
  writeMessTextOfMultQuery(Sql, err, results);
  if(err) {  return [err]; }
  return [null];
}


app.SetupSql.prototype.populateSetting=function*(flow, siteName){
  var site=Site[siteName]; 
  var Sql=[]; 
  var {TableName}=site, {settingTab}=TableName;

  //var strDelim=';', sql=Sql.join(strDelim+'\n')+strDelim, Val=[];
  //var [err, results]=yield* this.myMySql.query(flow, sql, Val);  if(err) {  return [err]; }
  return [null];
}


  // Called when --sql command line option is used
app.SetupSql.prototype.doQuery=function*(flow, strCreateSql){
  if(StrValidSqlCalls.indexOf(strCreateSql)==-1){var tmp=strCreateSql+' is not valid input, try any of these: '+StrValidSqlCalls.join(', '); return [new Error(tmp)]; }
  var Match=RegExp("^(drop|create)?(.*?)$").exec(strCreateSql);
  if(!Match) { debugger;  return [new Error("!Match")]; }
  
  var boDropOnly=false, strMeth=Match[2];
  if(Match[1]=='drop') { boDropOnly=true; strMeth='create'+strMeth;}
  else if(Match[1]=='create')  { strMeth='create'+strMeth; }
  
  if(strMeth=='createFunction'){ 
    var [err]=yield* this.funcGen(flow, boDropOnly); if(err){  return [err]; }  // Create common functions
  }
  for(var iSite=0;iSite<SiteName.length;iSite++){
    var siteName=SiteName[iSite];
    console.log(siteName);
    var [err]=yield* this[strMeth](flow, siteName, boDropOnly);  if(err){  return [err]; }
  }
  return [null];
}

var writeMessTextOfMultQuery=function(Sql, err, results){
  var nSql=Sql.length, nResults='(single query)'; if(results instanceof Array) nResults=results.length;
  console.log('nSql='+nSql+', nResults='+nResults);
  var StrMess=[];
  if(err){
    StrMess.push('err.index: '+err.index+', err: '+err);
    if(nSql==nResults){
      var tmp=Sql.slice(bound(err.index-1,0,nSql), bound(err.index+2,0,nSql)),  sql=tmp.join('\n');
      StrMess.push('Since "Sql" and "results" seem correctly aligned (has the same size), then 3 queries are printed (the preceding, the indexed, and following query (to get a context)):\n'+sql); 
    }
    console.log(StrMess.join('\n'));
  }
}


/******************************************************************************
 * ReqSql
 ******************************************************************************/
app.ReqSql=function(req, res){
  this.req=req; this.res=res;
  this.StrType=['table', 'fun', 'dropTable', 'dropFun', 'truncate', 'dummy', 'dummies']; 
}
app.ReqSql.prototype.createZip=function(objSetupSql){
  var res=this.res, StrType=this.StrType;

  var zipfile = new NodeZip();
  for(var i=0;i<StrType.length;i++) {
    var strType=StrType[i], SqlA;
    var Match=RegExp("^(drop)?(.*)$").exec(strType), boDropOnly=Match[1]=='drop';
    var SqlA=objSetupSql[Match[2].toLowerCase()](SiteName, boDropOnly);
    var strDelim=';;', sql='-- DELIMITER '+strDelim+'\n'      +SqlA.join(strDelim+'\n')+strDelim      +'\n-- DELIMITER ;\n';
    zipfile.file(strType+".sql", sql, {date:new Date(), compression:'DEFLATE'});
  }

  //var objArg={base64:false}; if(boCompress) objArg.compression='DEFLATE';
  var objArg={type:'string'}; //if(boCompress) objArg.compression='DEFLATE';
  var outdata = zipfile.generate(objArg);


  var outFileName=strAppName+'Setup.zip';
  var objHead={"Content-Length":outdata.length, 'Content-Disposition':'attachment; filename='+outFileName};  //"Content-Type": MimeType.zip, 
  res.writeHead(200,objHead);
  res.end(outdata,'binary');
}
ReqSql.prototype.toBrowser=function(objSetupSql){
  var req=this.req, res=this.res, StrType=this.StrType;
  var Match=RegExp("^(drop)?(.*?)(All)?$").exec(req.pathNameWOPrefix), boDropOnly=Match[1]=='drop', strMeth=Match[2].toLowerCase(), boAll=Match[3]=='All', SiteNameT=boAll?SiteName:[req.siteName];
  var StrValidMeth=['table', 'fun', 'truncate',  'dummy', 'dummies'];
  //var objTmp=Object.getPrototypeOf(objSetupSql);
  if(StrValidMeth.indexOf(strMeth)!=-1){
    var SqlA=objSetupSql[strMeth](SiteNameT, boDropOnly); 
    var strDelim=';;', sql='-- DELIMITER '+strDelim+'\n'      +SqlA.join(strDelim+'\n')+strDelim      +'\n-- DELIMITER ;\n';
    res.out200(sql);
  }else{ var tmp=req.pathNameWOPrefix+' is not valid input, try: '+this.StrType+' (suffixed with "All" if you want to)'; console.log(tmp); res.out404(tmp); }
}  





app.createDumpCommand=function(){ 
  var strCommand='', StrTabType=['user','admin','setting']; //,'choise'
  for(var i=0;i<StrTabType.length;i++){
    var strTabType=StrTabType[i], StrTab=[];
    for(var j=0;j<SiteName.length;j++){
      var siteName=SiteName[j];
      StrTab.push(siteName+'_'+strTabType);
    }
    strCommand+='          '+StrTab.join(' ');
  }
  strCommand="mysqldump mmm --user=root -p --no-create-info --hex-blob"+strCommand+'          >tracker.sql';

  return strCommand;
}




/*
CREATE DATABASE ip2location;
USE ip2location;

CREATE TABLE `ip2location_db1`(
  `ip_from` INT(10) UNSIGNED,
  `ip_to` INT(10) UNSIGNED,
  `country_code` CHAR(2),
  `country_name` VARCHAR(64),
  INDEX `idx_ip_from` (`ip_from`),
  INDEX `idx_ip_to` (`ip_to`),
  INDEX `idx_ip_from_to` (`ip_from`, `ip_to`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

LOAD DATA LOCAL
  INFILE '/home/magnus/Downloads/IP2LOCATION-LITE-DB1.CSV/IP2LOCATION-LITE-DB1.CSV'
INTO TABLE
  `ip2location_db1`
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 0 LINES;



CREATE TABLE `countries`(
  `country_code` CHAR(2),
  `longitude` float,
  `latitude` float,
  `name` VARCHAR(128),
   
  INDEX `idx_country_code` (`country_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin


LOAD DATA LOCAL
  INFILE '/home/magnus/Downloads/IP2LOCATION-LITE-DB1.CSV/countries.txt'
INTO TABLE
  `countries`
FIELDS TERMINATED BY '\t'
ENCLOSED BY ''
LINES TERMINATED BY '\n'
IGNORE 0 LINES;


SELECT * FROM ip2location_db1 WHERE country_code='-'

SELECT * FROM ip2location_db1 ip LEFT JOIN countries c ON ip.country_code=c.country_code WHERE c.country_code IS NULL
SELECT * FROM ip2location_db1 ip LEFT JOIN countries c ON ip.country_code=c.country_code WHERE c.country_code IS NULL AND ip.country_code!='-'
SELECT * FROM ip2location_db1 ip LEFT JOIN countries c ON ip.country_code=c.country_code WHERE c.country_code IS NULL AND ip.country_code!='-' GROUP BY ip.country_code


SET @a=79, @b=136, @c=116, @d=124;
SET @ip=(((@a*256+@b)*256)+@c)*256+@d;
SELECT @a, @b, @c, @d, @ip;
SELECT * FROM ip2location_db1 ip LEFT JOIN countries c ON ip.country_code=c.country_code WHERE @ip>=ip.ip_from AND @ip<=ip.ip_to;

*/




