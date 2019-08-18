"use strict"

/******************************************************************************
 * ReqBE
 ******************************************************************************/
//app.ReqBE=function(req, res){
  //this.req=req; this.res=res; this.site=req.site; this.pool=DB[this.site.db].pool; this.Str=[]; 
  //this.Out={GRet:{userInfoFrDBUpd:{}}, dataArr:[]}; this.GRet=this.Out.GRet; 
//}

app.ReqBE=function(objReqRes){
  Object.assign(this, objReqRes);
  this.site=this.req.site
  this.Str=[];  this.Out={GRet:{userInfoFrDBUpd:{}}, dataArr:[]};  this.GRet=this.Out.GRet; 
}

ReqBE.prototype.go=function*(){
  var req=this.req, flow=req.flow, res=this.res, site=req.site;

  var redisVar=req.sessionID+'_Cache';
  this.sessionCache=yield* getRedis(flow, redisVar,1);
  if(!this.sessionCache || typeof this.sessionCache!='object') { 
    //resetSessionMain.call(this);
    this.sessionCache={userInfoFrDB:extend({},specialistDefault),   userInfoFrIP:{}};
    yield *setRedis(flow, redisVar, this.sessionCache, maxUnactivity);
  }
  
  if(site.typeApp=='ip'){
    this.sessionCache.userInfoFrIP={'IP':'openid','idIP':req.ipClient,'nameIP':'','nickIP':''};
  } 
  
  yield* expireRedis(flow, redisVar, maxUnactivity);
 
 
  var jsonInput;
  if(req.method=='POST'){ 
    if('x-type' in req.headers ){ //&& req.headers['x-type']=='single'
      var form = new formidable.IncomingForm();
      form.multiples = true;  

      var err, fields, files;
      form.parse(req, function(errT, fieldsT, filesT) { err=errT; fields=fieldsT; files=filesT; flow.next();  });  yield;  if(err){ this.mesEO(err);  return; } 
      
      this.File=files['fileToUpload[]'];
      if('kind' in fields) this.kind=fields.kind; else this.kind='s';
      if(!(this.File instanceof Array)) this.File=[this.File];
      jsonInput=fields.vec;
      

    }else{
      var buf, myConcat=concat(function(bufT){ buf=bufT; flow.next();  });    req.pipe(myConcat);    yield;
      jsonInput=buf.toString();
    }
  }
  else{
    var tmp='send me a POST'; this.mesO(tmp);   return;
  }

  //res.setHeader("Content-type", MimeType.json);

  try{ var beArr=JSON.parse(jsonInput); }catch(e){ this.mesEO(e);  return; }
  
  if(!req.boCookieStrictOK) {this.mesEO(new Error('Strict cookie not set'));  return;   }

    // Remove 'CSRFCode' and 'caller' form beArr
  var CSRFIn, caller='index';
  for(var i=beArr.length-1;i>=0;i--){ 
    var row=beArr[i];
    if(row[0]=='CSRFCode') {CSRFIn=row[1]; array_removeInd(beArr,i);}
    else if(row[0]=='caller') {caller=row[1]; array_removeInd(beArr,i);}
  }

  var len=beArr.length;
  var StrInFunc=Array(len); for(var i=0;i<len;i++){StrInFunc[i]=beArr[i][0];}
  var arrCSRF, arrNoCSRF, allowed, boCheckCSRF, boSetNewCSRF;
  if(caller=='index'){
      // Arrays of functions
    //arrCSRF=['VUpdate','VShow','VHide','VDelete']; 
    arrCSRF=['setChoise','UInsert','UUpdate','UDelete'];  // Functions that changes something must check and refresh CSRF-code
    arrNoCSRF=['specSetup','setUpCond','setUp', 'getList','getHist','logout'];
    allowed=arrCSRF.concat(arrNoCSRF);


      // Assign boCheckCSRF and boSetNewCSRF
    boCheckCSRF=0; boSetNewCSRF=0;   for(var i=0; i<beArr.length; i++){ var row=beArr[i]; if(in_array(row[0],arrCSRF)) {  boCheckCSRF=1; boSetNewCSRF=1;}  }    
    if(StrComp(StrInFunc,['specSetup'])){ boCheckCSRF=0; boSetNewCSRF=1; }
    if(StrComp(StrInFunc,['specSetup']) || StrComp(StrInFunc,['specSetup', 'setUpCond','setUp', 'getList','getHist']))
        { boCheckCSRF=0; boSetNewCSRF=1; }

  }

    // cecking/set CSRF-code
  var redisVar=req.sessionID+'_CSRFCode'+ucfirst(caller), CSRFCode;
  if(boCheckCSRF){
    if(!CSRFIn){ this.mesO('CSRFCode not set (try reload page)'); return;}
    var tmp=yield* getRedis(flow, redisVar);
    if(CSRFIn!==tmp){ this.mesO('CSRFCode err (try reload page)'); return;}
  }
  if(boSetNewCSRF){
    var CSRFCode=randomHash();
    var tmp=yield* setRedis(flow, redisVar, CSRFCode, maxUnactivity);
    this.GRet.CSRFCode=CSRFCode;
  }

  var Func=[];
  for(var k=0; k<beArr.length; k++){
    var strFun=beArr[k][0];
    if(in_array(strFun,allowed)) {
      var inObj=beArr[k][1],     tmpf; if(strFun in this) tmpf=this[strFun]; else tmpf=global[strFun];
      if(typeof inObj=='undefined' || typeof inObj=='object') {} else {this.mesO('inObj should be of type object or undefined'); return;}
      var fT=[tmpf,inObj];   Func.push(fT);
    }
  }

  for(var k=0; k<Func.length; k++){
    var [func,inObj]=Func[k],   [err, result]=yield* func.call(this, inObj);
    if(res.finished) return;
    else if(err){
      if(typeof err=='object' && err.name=='ErrorClient') this.mesO(err); else this.mesEO(err);     return;
    }
    else this.Out.dataArr.push(result);
  }
  this.mesO();
}


ReqBE.prototype.mes=function(str){ this.Str.push(str); }
ReqBE.prototype.mesO=function(str){
  if(str) this.Str.push(str);
  this.GRet.strMessageText=this.Str.join(', ');
  this.GRet.userInfoFrIP=this.sessionCache.userInfoFrIP;  this.res.end(serialize(this.Out));
}
ReqBE.prototype.mesEO=function(errIn){
  var GRet=this.GRet;
  var boString=typeof errIn=='string';
  var err=errIn; 
  if(boString) { this.Str.push('E: '+errIn); err=new MyError(errIn); } 
  else{  var tmp=err.syscal||''; this.Str.push('E: '+tmp+' '+err.code);  }
  console.log(err.stack);
  GRet.strMessageText=this.Str.join(', ');
  GRet.userInfoFrIP=this.sessionCache.userInfoFrIP; 

  //this.res.writeHead(500, {"Content-Type": MimeType.txt}); 
  this.res.end(serialize(this.Out));
}


ReqBE.prototype.specSetup=function*(inObj){
  var req=this.req, flow=req.flow, site=req.site, Ou={};
  var Role=null; if(typeof inObj=='object' && 'Role' in inObj) Role=inObj.Role;
  if(site.typeApp=='ip'){
    this.sessionCache.userInfoFrIP={'IP':'openid','idIP':req.ipClient,'nameIP':'','nickIP':''};
  }
  var boOK=yield* checkIfUserInfoFrIP.call(this);
  if(!boOK) { return [null, [Ou]];} 
  var {IP,idIP}=this.sessionCache.userInfoFrIP;
  var [err, result]=yield* runIdIP.call(this, flow, IP, idIP);
  extend(this.GRet.userInfoFrDBUpd,result);    extend(this.sessionCache.userInfoFrDB,result);


  yield *setRedis(flow, req.sessionID+'_Cache', this.sessionCache, maxUnactivity);
  if(!checkIfAnySpecialist.call(this)){ // If the user once clicked login, but never saved anything then logout
    //clearSession.call(this);
    this.sessionCache={userInfoFrDB:extend({},specialistDefault),   userInfoFrIP:{}};
    yield *setRedis(flow, req.sessionID+'_Cache', this.sessionCache, maxUnactivity);
    this.GRet.userInfoFrDBUpd=extend({},specialistDefault);
  } 
  return [null, [Ou]];
}

ReqBE.prototype.logout=function*(inObj){
  var req=this.req, flow=req.flow;
  //resetSessionMain.call(this);  
  this.sessionCache={userInfoFrDB:extend({},specialistDefault),   userInfoFrIP:{}};
  yield *setRedis(flow, req.sessionID+'_Cache', this.sessionCache, maxUnactivity);
  this.GRet.userInfoFrDBUpd=extend({},specialistDefault);
  this.mes('Logged out'); return [null, [0]];;
}


ReqBE.prototype.setUpCond=function*(inObj){
  var site=this.req.site, Prop=site.Prop;
  var Ou={};
  if(typeof inObj.Filt!='object') return [new ErrorClient('typeof inObj.Filt!="object"')]; 
  this.Filt=inObj.Filt;
  var arg={KeySel:site.KeySel, Prop:Prop, Filt:inObj.Filt};  //, StrOrderFilt:StrOrderFilt
  var tmp=setUpCond(arg);
  copySome(this,tmp,['strCol', 'Where']);
  return [null, [Ou]];
}




ReqBE.prototype.setUp=function*(inObj){  // Set up some properties etc.  (curTime).
  var req=this.req, flow=req.flow, siteName=req.siteName, site=req.site;
  var userTab=site.TableName.userTab;
  
  var Ou={},  Sql=[];
  Sql.push("SELECT UNIX_TIMESTAMP(now()) AS now;");

  var sql=Sql.join('\n'), Val=[];
  var [err, results]=yield* this.myMySql.query(flow, sql, Val); if(err) return [err];
  this.GRet.curTime=results[0].now; 
  return [null, [Ou]];
}  


ReqBE.prototype.getList=function*(inObj){
  var req=this.req, flow=req.flow, siteName=req.siteName, site=req.site;
  var TableName=site.TableName;
  var strCol=this.strCol;
  var Ou={};
  Ou.tab=[];this.NVoter=[0,0];

  var {userTab}=site.TableName;

  var offset=Number(inObj.offset), rowCount=Number(inObj.rowCount);
  var Sql=[];
  var strCond=array_filter(this.Where).join(' AND '); if(strCond.length) strCond=' WHERE '+strCond;
  Sql.push("SELECT SQL_CALC_FOUND_ROWS "+strCol+" FROM "+userTab+" u "+strCond+" GROUP BY u.idUser ORDER BY lastActivity DESC LIMIT "+offset+","+rowCount+";"); 
  Sql.push("SELECT FOUND_ROWS() AS n;"); // nFound

  Sql.push("SELECT count(*) AS n FROM "+userTab+";"); // nUnFiltered

  var sql=Sql.join('\n'), Val=[];
  //console.log(sql); 
  var [err, results]=yield* this.myMySql.query(flow, sql, Val); if(err) return [err];
  var nFound=results[1][0].n;

  for(var i=0;i<results[0].length;i++) {
    var row=results[0][i], len=site.KeySel.length;
    var rowN=Array(len); //for(var j=0;j<len;j++) { rowN[j]=row[j];}
    for(var j=0;j<len;j++){ var key=site.KeySel[j]; rowN[j]=row[key]; }
    //rowN[jMyVote]=[];
    Ou.tab.push(rowN);        
  }  
  this.Str.push("Found: "+nFound);  
  Ou.NVoter=[nFound, results[2][0].n];

  

  return [null, [Ou]];
}


ReqBE.prototype.getHist=function*(inObj){
  var req=this.req, flow=req.flow, siteName=req.siteName, site=req.site;
  var TableName=site.TableName;

  var Ou={};
  var {userTab}=TableName;

  //var strTableRef=userTab+" u JOIN "+choiseTab+" c ON u.idUser=c.idUser "; 
  var strTableRef=userTab+" u "; 
  
  var arg={strTableRef:strTableRef, WhereExtra:[]};  
  copySome(arg, site, ['Prop']);
  copySome(arg, this, ['myMySql', 'Filt', 'Where']);
  arg.strDBPrefix=req.siteName;
  var [err, Hist]=yield* getHist(flow, arg); if(err) return [err];
  Ou.Hist=Hist;
  return [null, [Ou]];
}


ReqBE.prototype.UUpdate=function*(inObj){ // writing needSession
  var req=this.req, flow=req.flow, siteName=req.siteName, site=req.site, Prop=site.Prop, {userTab}=site.TableName;
  var Ou={};
  var boOK=yield* checkIfUserInfoFrIP.call(this);
  if(!boOK) { return [new ErrorClient('No session')]; }

  //var tmp=this.sessionCache.userInfoFrIP, IP=tmp.IP, idIP=tmp.idIP, nameIP=tmp.nameIP, nickIP=tmp.nickIP;
  //var arrPersonal=[tmp.nameIP, tmp.nickIP, tmp.homeTown, tmp.state, tmp.gender, tmp.locale, tmp.timezone];
  //var userInfoFrIP=tmp;
  var userInfoFrIP=this.sessionCache.userInfoFrIP;
  var {IP, idIP, nameIP, nickIP, homeTown, state, gender, locale, timezone}=userInfoFrIP;
  var arrPersonal=[nameIP, nickIP, homeTown, state, gender, locale, timezone];


  var objVar=extend({},inObj);
  
  for(var name in objVar){
    var value=objVar[name];
    if(typeof value=='string') objVar[name]=myJSEscape(value);
  }
 

  var boChoiseSet=0; if('choise' in objVar)  boChoiseSet=1;


    // If "choise" is empty
  if(boChoiseSet && objVar.choise===null){
    var Sql=[];
    Sql.push("DELETE FROM "+userTab+" WHERE IP=? AND idIP=?;");
    var Val=[IP, idIP];
    var sql=Sql.join('\n');
    var [err, results]=yield* this.myMySql.query(flow, sql, Val); if(err) return [err];
    var n=results.affectedRows, pluralS=n==1?'':'s';
    this.mes(n+' user'+pluralS+' deleted');
    return [null,[Ou]];
  }

  for(var name in objVar){    if(site.arrAllowed.indexOf(name)==-1) return [new ErrorClient ('Forbidden input')];    }

  //var arrK=[], arrVal=[];
  //var arrUpdQM=[], arrInsQM=[]; 
  //var StrTmp=Object.keys(objVar).concat(site.arrIPData);
  //for(var i=0;i<StrTmp.length;i++){
    //var name=StrTmp[i], value;
    //if(site.arrIPData.indexOf(name)!=-1) {value=userInfoFrIP[name];}
    //else if(site.arrAllowed.indexOf(name)!=-1) {
      //value=objVar[name];
    //}
    //else return [new ErrorClient ('Forbidden input')];
    //arrK.push(name);
    //if(typeof value!='number') {value=this.myMySql.pool.escape(value);  value=value.slice(1, -1); }
    //var QMark='?';
    //if('voterUpdF' in Prop[name]) { var tmp=Prop[name].voterUpdF.call(Prop,name,value);  QMark=tmp[0]; value=tmp[1]; }

    //arrVal.push(value);
    //arrUpdQM.push("`"+name+"`="+QMark);
    //arrInsQM.push(QMark);
  //}

  //var strCol=arrK.join(', '); if(strCol.length) strCol=', '+strCol;
  //var strInsQ=arrInsQM.join(', '); if(strInsQ.length) strInsQ=', '+strInsQ;
  //var strUpdQ=arrUpdQM.join(', '); if(strUpdQ.length) strUpdQ=', '+strUpdQ;

  //var strAuthCol="IP,idIP", strAuthInsQ="?,?";

  //var sql=`INSERT INTO `+userTab+` (`+strAuthCol+` `+strCol+`, lastActivity, created) VALUES (`+strAuthInsQ+` `+strInsQ+`, now(), now())
    //ON DUPLICATE KEY UPDATE idUser=LAST_INSERT_ID(idUser)  `+strUpdQ+`, lastActivity=now()`;  
  //var Val=[].concat([IP, idIP], arrVal, arrVal);
  

  var arrUpdQM=[], arrVal=[];
  var StrKey=Object.keys(objVar).concat(site.arrIPData);
  for(var i=0;i<StrKey.length;i++){
    var name=StrKey[i], value;
    if(site.arrIPData.indexOf(name)!=-1) {value=userInfoFrIP[name];}
    else{ value=objVar[name];}
    var QMark='?';
    if('voterUpdF' in Prop[name]) { var [QMark, value]=Prop[name].voterUpdF.call(Prop,name,value); }

    arrUpdQM.push("`"+name+"`="+QMark);  arrVal.push(value);
  }

  var strUpdQ=arrUpdQM.join(', '); if(strUpdQ.length) strUpdQ=', '+strUpdQ;

  var sql=`INSERT INTO `+userTab+` SET IP=?, idIP=?`+strUpdQ+`, lastActivity=now(), created=now()
    ON DUPLICATE KEY UPDATE idUser=LAST_INSERT_ID(idUser)`+strUpdQ+`, lastActivity=now()`;  
  var Val=[].concat([IP, idIP], arrVal, arrVal);
  
  
  
  
  //console.log(sql); 
  var boUInsert;
  var [err, results]=yield* this.myMySql.query(flow, sql, Val); if(err) return [err];
  var c=results.affectedRows; boUInsert=c==1; 
  console.log('affectedRows: '+results.affectedRows);


    // How to detect whether there was an insert or update: Check affected rows (the result depends on whether auto_increment was set):    
    //                    insert   |   update
    // no auto_increment    1      |      2    (like "replace":  1 deleted + 1 inserted)
    //    auto_increment    1      |      0


  this.mes('Data updated'); return [null,[Ou]];
}


ReqBE.prototype.UDelete=function*(inObj){ // writing needSession
  var req=this.req, flow=req.flow, siteName=req.siteName, site=req.site, Prop=site.Prop, {userTab}=site.TableName;
  var Ou={};
  var boOK=yield* checkIfUserInfoFrIP.call(this);
  if(!boOK) { return [new ErrorClient('No session')]; }

  //var tmp=this.sessionCache.userInfoFrIP, IP=tmp.IP, idIP=tmp.idIP, nameIP=tmp.nameIP;
  var {IP, idIP, nameIP}=this.sessionCache.userInfoFrIP;

  var idUser=this.sessionCache.userInfoFrDB.voter.idUser; 

  var Sql=[];
  Sql.push("DELETE FROM "+userTab+" WHERE idUser=?;");
  var Val=[idUser,idUser];
  var sql=Sql.join('\n');
  var [err, results]=yield* this.myMySql.query(flow, sql, Val); if(err) return [err];

  this.mes('deleted');      

  //resetSessionMain.call(this);
  this.sessionCache={userInfoFrDB:extend({},specialistDefault),   userInfoFrIP:{}};
  yield *setRedis(flow, req.sessionID+'_Cache', this.sessionCache, maxUnactivity);
  this.GRet.userInfoFrDBUpd=extend({},specialistDefault);
  return [null, [Ou]];
}

ReqBE.prototype.getSetting=function*(inObj){ 
  var req=this.req, site=req.site;
  var settingTab=site.TableName.settingTab;
  var Ou={};
  var Str=['boShowTeam'];
  if(!isAWithinB(inObj,Str)) {return [new ErrorClient('Illegal invariable')];}
  for(var i=0;i<inObj.length;i++){ var name=inObj[i]; Ou[name]=app[name]; }
  return [null, [Ou]];
}
ReqBE.prototype.setSetting=function*(inObj){ 
  var req=this.req, site=req.site; 
  var settingTab=site.TableName.settingTab;
  var Ou={};
  var StrApp=[],  StrServ=[];
  if(this.sessionCache.userInfoFrDB.admin) StrApp=['boShowTeam'];  
  var Str=StrApp.concat(StrServ);
  var Key=Object.keys(inObj);
  if(!isAWithinB(Key, Str)) { return [new ErrorClient('Illegal invariable')];}
  for(var i=0;i<Key.length;i++){ var name=Key[i], tmp=Ou[name]=inObj[name]; if(StrApp.indexOf(name)!=-1) app[name]=tmp; else serv[name]=tmp; }
  return [null, [Ou]];
}

ReqBE.prototype.getDBSetting=function*(inObj){ 
  var req=this.req, flow=req.flow, site=req.site;
  var settingTab=site.TableName.settingTab;
  var Ou={};
  if(!isAWithinB(inObj,['boShowTeam'])) { return [new ErrorClient('Illegal invariable')];}
  var strV=inObj.join("', '");
  var sql="SELECT * FROM "+settingTab+" WHERE name IN('"+strV+"')";
  var Val=[];
  var [err, results]=yield* this.myMySql.query(flow, sql, Val); if(err) return [err];
  for(var i=0; i<results.length;i++){ var tmp=results[i]; Ou[tmp.name]=tmp.value;  }
  return [null,[Ou]];
}

ReqBE.prototype.setDBSetting=function*(inObj){ 
  var req=this.req, flow=req.flow, site=req.site;
  var settingTab=site.TableName.settingTab;
  var Ou={};
  var Str=[];
  if(this.sessionCache.userInfoFrDB.admin) Str=['boGotNewUsers','nUser'];  
  var Key=Object.keys(inObj);
  if(!isAWithinB(Key, Str)) { return [new ErrorClient('Illegal invariable')];}

  var Sql=[], sqlA="INSERT INTO "+settingTab+" (name,value) VALUES (?,?) ON DUPLICATE KEY UPDATE value=?;";
  for(var name in inObj){
    var value=inObj[name]
    if(typeof value=='string') value=myJSEscape(value);
    Sql.push(sqlA); Val.push(name,value,value);
    Ou[name]=value;
  }
  var sql=Sql.join("\n ");
  var [err, results]=yield* this.myMySql.query(flow, sql, Val); if(err) return [err];
  for(var name in inObj){
    var value=inObj[name];        Ou[name]=value;
  }
  return [null,[Ou]];
}







