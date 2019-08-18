
//
// For variable naming convention see https://emagnusandersson.com/prefixes_to_variables
//




googleSiteVerification='googleXXXXXXXXXXXXXXXX.html'; // If you use google.com/webmasters
intDDOSMax=100; // intDDOSMax: How many request before DDOSBlocking occurs. 
tDDOSBan=5; // tDDOSBan: How long in seconds til the blocking is lifted


  //
  // These variables are not realy configuration variables they are just variables in the examples below: 
  //

var strWhichBrowser="Which browser is best? (OpenID-voting)";
var arrOptionBrowser=['Chrome', 'Firefox', 'Opera', 'Safari', 'IE' ];
var strWhichStarWars="Which Star Wars episode is best? (Facebook-voting)";
var arrOptionStarWars=['I (1999)', 'II (2002)', 'III (2005)', 'IV (1977)', 'V (1980)', 'VI (1983)'];
var strWhichDrink="Which drink taste best? (Google-voting)";
var arrOptionDrink=['Tea', 'Coffee', 'Water', 'Beer', 'Orange Juice', 'Milk', 'Milk Chocolate', 'Wine', 'Vodka', 'Whisky'];
var strWhichSmartphone="Which Smartphone is best? (IP-voting)";
var arrOptionSmartphone=['Android', 'iOS', 'Blackberry', 'Windows mobile', 'Symbian', 'Palm OS', 'Bada', 'Linux (other than Android)'];





  //
  // This "if"-statement allows you to keep the same config-file for multiple infrastructure
  //
  // If you are running on:
  //   * heroku.com, then create a environment variable strInfrastructure='heroku' 
  //   * appfog.com, then create a environment variable strInfrastructure='af' 
  //   * digitalocean.com, then create a environment variable strInfrastructure='do' 
  //   * localhost, then you can enter your settings in the "else"-statement below
  //

if(process.env.strInfrastructure=='heroku'){

    // UriDB: an object storing database urls
  UriDB={ 
    //exampleDB:"mysql://user:password@host/database?reconnect=true" 
  }
    // If you added the ClearDB-database on the heroku.com-interface then that one is added as "default".
  if('CLEARDB_DATABASE_URL' in process.env) UriDB.default=process.env.CLEARDB_DATABASE_URL;


    // Heroku uses the environment variable "PORT" to store the port used:
  port = parseInt(process.env.PORT, 10); 


    // RootDomain: an object to store app credetials from IPs (identity providers) and other data to the root domain (I'm using the term "root domain" for Second level domains (xxx.xxx))
 
    // Each "key" is the name of the root domain (which will for example be used to reference
    // it (like in the "Site"-variable below.))
    // fb: Facebook variables (See more on developer.facebook.com)
    // google: Google variables (See more on googles pages)
  RootDomain={
    exampleDomain:{
      //idplace:{id: "XXXXX", secret:"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}, 
      //google:{id: "X", secret:"XXXXXXXXXXXXXXXXXXXXXXXX"},
      fb:{id:"XXXXXXXXXXXXXXX", secret:"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}
    },
    yourDomain:{fb:{id:"000000000000000", secret:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}},
    herokuappCom:{fb:{id:"000000000000000", secret:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}}
  }


    // Site: An assoc-array of (object) "site" (instances) (each representing a voting (a referendum)) (written in
    // JSON syntax) Each "key" (like "demoFB" below) is the name of the site (which will for example be used in
    // database-table-names etc.)
    // db: key into "UriDB" (above)
    // wwwSite: A string to determine which site each incomming request belongs to.
    //   (Note: if the request-url matches multiple entries then the first one is used
    //   Ex: if you have one referendum at "example.com" and an other at "example.com/abc" then "example.com/abc" 
    //   should come first.)
    //     Note! "www" is my special notation see more https://emagnusandersson.com/myNodeApps_notation 
    // strRootDomain: a key into RootDomain (above)
    // googleAnalyticsTrackingID: Needed if you use Google Analytics  
    // typeApp: either "fb", "oi", "google" or "ip". How to identify users (Facebook, OpenID, Google or IP-address)
    // boOpenVote: (true or false). If voters should be listable.
    // strTitle: Text in title-tag.
    // strH1: Text in h1-tag.
    // metaDescription: Text in meta description.
    // maxVotes: Maximum number of votes per user.
    // Option: An array of options.
    // boUseSnapShot: If boUseSnapShot is true then the userTab and the choiseTab are copied once a day and queries
    // to make the histograms are made from them. (This is all to make those queries faster (as they will become
    // cached).) So if the system becomes slow you can try setting boUseSnapShot=1;
  

  var wwwTmp="YOURDOMAIN.COM"; // just a temprary variable
  Site={
    demoOI:{
      wwwSite:"demoOI."+wwwTmp, strRootDomain:"yourDomain", googleAnalyticsTrackingID:"", db:"default", typeApp:'oi',boOpenVote:1, boTLS:0,
      strTitle:strWhichBrowser, strH1:strWhichBrowser, metaDescription:strWhichBrowser,
      maxVotes:2,
      Option:arrOptionBrowser
    },
    demoFB:{
      wwwSite:"demoFB."+wwwTmp, strRootDomain:"yourDomain", googleAnalyticsTrackingID:"", db:"default", typeApp:'fb',boOpenVote:1, boTLS:0,
      strTitle:strWhichStarWars, strH1:strWhichStarWars, metaDescription:strWhichStarWars,
      maxVotes:2,
      Option:arrOptionStarWars
      //,strFirstSort:'nVote',     boAscFirstSort:0
    },
    demoGoogle:{
      wwwSite:"demoGoogle."+wwwTmp, strRootDomain:"yourDomain", googleAnalyticsTrackingID:"", db:"default", typeApp:'google',boOpenVote:1, boTLS:0,
      strTitle:strWhichDrink, strH1:strWhichDrink, metaDescription:strWhichDrink,
      maxVotes:2,
      Option:arrOptionDrink
    },
    demoIP:{
      wwwSite:"demoIP."+wwwTmp, strRootDomain:"yourDomain", googleAnalyticsTrackingID:"", db:"default", typeApp:'ip',boOpenVote:0, boTLS:0,
      strTitle:strWhichSmartphone, strH1:strWhichSmartphone, metaDescription:strWhichSmartphone,
      maxVotes:3,
      Option:arrOptionSmartphone
    }
  }


    // If levelMaintenance=1 then site visitors gets a "Down for maintenance"-message
  //LevelMaintenance={ demoOI:0, demoFB:0, demoGoogle:0, demoIP:0};
  levelMaintenance=0;

}
else if(process.env.strInfrastructure=='af'){

     // If you added the MySql-database on the appfog.com-interface then an entry "default" is added to   "UriDB".
  if('VCAP_SERVICES' in process.env) {
      var tmp=process.env.VCAP_SERVICES, services_json = JSON.parse(tmp);
      var mysql_config = services_json["mysql-5.1"][0]["credentials"];
      var sqlUserName = mysql_config["username"];
      var sqlPassword = mysql_config["password"];
      var sqlHost = mysql_config["hostname"];
      var portTmp = mysql_config["port"];
      var sqlDBName = mysql_config["name"];
      UriDB.default="mysql://"+sqlUserName+':'+sqlPassword+'@'+sqlHost+'/'+sqlDBName+"?reconnect=true";
  }
  port = parseInt(process.env.VCAP_APP_PORT, 10);

  RootDomain={
    afGavottCm:{
      fb:{id:"000000000000000", secret:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
      google:{id:"X",secret:"X",redir:'http://YOURAPP.eu01.aws.af.cm/loginReturn'}
    }
  }
  Site={
    nsvTest:{
      wwwSite:"YOURAPP.eu01.aws.af.cm", strRootDomain:"afGavottCm", googleAnalyticsTrackingID:"UA-00000000-00", db:"default", typeApp:"fb", boOpenVote:1, boTLS:0,
      strTitle:"Is this software any good?", strH1:"Is this software any good?", metaDescription:"Is this software any good?",
      maxVotes:5,
      Option:["yes", "no"]
    }
  }


  //LevelMaintenance={ nsvTest:0};
  levelMaintenance=0;

}else if(process.env.strInfrastructure=='do'){
  UriDB={default:'mysql://user:password@localhost/database'};
  port = 8083;  

  RootDomain={
    exampleDomain:   {
      fb:{id:"XXXXXXXXXXXXXXX", secret:"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"},
      google:{id: "", secret:"",redir:'c'}
    }
  }

  Site={
    demoOI:{
      wwwSite:www192+"/demoOI", strRootDomain:"exampleDomain", googleAnalyticsTrackingID:"", db:"default", typeApp:'oi',boOpenVote:1, boTLS:0,
      strTitle:strWhichBrowser, strH1:strWhichBrowser, metaDescription:strWhichBrowser,
      maxVotes:2,
      Option:arrOptionBrowser
    }
  }

  //LevelMaintenance={demoOI:0};
  levelMaintenance=0;
}
else {
  UriDB={myDB:'mysql://user:password@localhost/database'};

  RootDomain={
    "192Loc":{
      fb:{id:"000000000000000", secret:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
      google:{id:"a",secret:"b",redir:'c'} 
    },
    localhost:{
      fb:{id:"000000000000000", secret:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
      google:{id:"X",secret:"X",redir:'http://localhost:5000/loginReturn'}
    }
  }



  var wwwLocalhost="localhost:"+port, www192="192.168.0.3:"+port;  // just some temprary variables

  Site={
    demoOI:{
      wwwSite:www192+"/demoOI", strRootDomain:"192Loc", googleAnalyticsTrackingID:"", db:"myDB", typeApp:'oi',boOpenVote:1, boTLS:0,
      strTitle:strWhichBrowser, strH1:strWhichBrowser, metaDescription:strWhichBrowser,
      maxVotes:2,
      Option:arrOptionBrowser
    },
    demoFB:{
      wwwSite:wwwLocalhost+"/demoFB", strRootDomain:"localhost", googleAnalyticsTrackingID:"", db:"myDB", typeApp:'fb',boOpenVote:1, boTLS:0,
      strTitle:strWhichStarWars, strH1:strWhichStarWars, metaDescription:strWhichStarWars,
      maxVotes:2,
      Option:arrOptionStarWars,
      strFirstSort:'nVote',
      boAscFirstSort:0   //,boUseSnapShot:1
    },
    demoGoogle:{
      wwwSite:wwwLocalhost, strRootDomain:"localhost", googleAnalyticsTrackingID:"", db:"myDB", typeApp:'google',boOpenVote:1, boTLS:0,
      strTitle:strWhichDrink, strH1:strWhichDrink, metaDescription:strWhichDrink,
      maxVotes:2,
      Option:arrOptionDrink
    },
    demoIP:{
      wwwSite:www192, strRootDomain:"192Loc", googleAnalyticsTrackingID:"", db:"myDB", typeApp:'ip',boOpenVote:0, boTLS:0,
      strTitle:strWhichSmartphone, strH1:strWhichSmartphone, metaDescription:strWhichSmartphone,
      maxVotes:3,
      Option:arrOptionSmartphone
    }
  }


  //LevelMaintenance={demoOI:0, demoFB:0, demoGoogle:0, demoIP:0};
  levelMaintenance=0;

} 

  // If wwwCommon is not set then set it to the first "wwwSite" in "Site"
if(!wwwCommon) {var keys=Object.keys(Site); wwwCommon=Site[keys[0]].wwwSite; } 
wwwIcon16=wwwCommon+'/Site/Icon/iconRed16.png';   wwwIcon114=wwwCommon+'/Site/Icon/iconRed114.png';   wwwIcon200=wwwCommon+'/Site/Icon/iconRed200.png';


  //
  // See also under the "Default config variables" in the script.js-file for more variables that can be configured.
  //


