

-- Development
use mmm;


CREATE TABLE demoFB_userSnapShot SELECT * FROM demoFB_user LIMIT 0;
CREATE TABLE demoFB192_userSnapShot SELECT * FROM demoFB192_user LIMIT 0;
CREATE TABLE demoIP_userSnapShot SELECT * FROM demoIP_user LIMIT 0;
CREATE TABLE demoGoogle_userSnapShot SELECT * FROM demoGoogle_user LIMIT 0;
CREATE TABLE demoOI_userSnapShot SELECT * FROM demoOI_user LIMIT 0;


-- Production
use heroku_03cabc319498916;

CREATE TABLE demofb_userSnapShot SELECT * FROM demofb_user LIMIT 0;
CREATE TABLE demoip_userSnapShot SELECT * FROM demoip_user LIMIT 0;
CREATE TABLE wikifb_userSnapShot SELECT * FROM wikifb_user LIMIT 0;
CREATE TABLE wikiip_userSnapShot SELECT * FROM wikiip_user LIMIT 0;

-- Set back development
use mmm;

drop table if exists demoFB_userSnapShot,demoFB192_userSnapShot, demoIP_userSnapShot, demoGoogle_userSnapShot, demoOI_userSnapShot;


-- Set back production
use heroku_03cabc319498916;

drop table if exists demofb_userSnapShot, demoip_userSnapShot, wikifb_userSnapShot, wikiip_userSnapShot;




