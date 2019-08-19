

-- Development
use mmm;

truncate demoFB_binsCreated;
INSERT INTO `demoFB_binsCreated` VALUES (0,0,2591999),(1,2592000,5183999),(2,5184000,10367999),(3,10368000,15551999),(4,15552000,23327999),(5,23328000,31103999),(6,31104000,46655999),(7,46656000,62207999),(8,62208000,93311999),(9,93312000,124415999),(10,124416000,2147483646);
truncate `demoFB_binsLastActivity`;
INSERT INTO `demoFB_binsLastActivity` VALUES (0,0,3599),(1,3600,7199),(2,7200,14399),(3,14400,28799),(4,28800,53999),(5,54000,107999),(6,108000,215999),(7,216000,647999),(8,648000,1313999),(9,1314000,2147483646);


truncate demoFB192_binsCreated;    INSERT demoFB192_binsCreated SELECT * FROM demoFB_binsCreated;
truncate `demoFB192_binsLastActivity`;    INSERT demoFB192_binsLastActivity SELECT * FROM demoFB_binsLastActivity;

truncate demoIP_binsCreated;    INSERT demoIP_binsCreated SELECT * FROM demoFB_binsCreated;
truncate `demoIP_binsLastActivity`;    INSERT demoIP_binsLastActivity SELECT * FROM demoFB_binsLastActivity;

truncate demoGoogle_binsCreated;    INSERT demoGoogle_binsCreated SELECT * FROM demoFB_binsCreated;
truncate `demoGoogle_binsLastActivity`;    INSERT demoGoogle_binsLastActivity SELECT * FROM demoFB_binsLastActivity;

truncate demoOI_binsCreated;    INSERT demoOI_binsCreated SELECT * FROM demoFB_binsCreated;
truncate `demoOI_binsLastActivity`;    INSERT demoOI_binsLastActivity SELECT * FROM demoFB_binsLastActivity;


-- Production
use heroku_03cabc319498916;

truncate demofb_binsCreated;
INSERT INTO `demofb_binsCreated` VALUES (0,0,2591999),(1,2592000,5183999),(2,5184000,10367999),(3,10368000,15551999),(4,15552000,23327999),(5,23328000,31103999),(6,31104000,46655999),(7,46656000,62207999),(8,62208000,93311999),(9,93312000,124415999),(10,124416000,2147483646);
truncate `demofb_binsLastActivity`;
INSERT INTO `demofb_binsLastActivity` VALUES (0,0,3599),(1,3600,7199),(2,7200,14399),(3,14400,28799),(4,28800,53999),(5,54000,107999),(6,108000,215999),(7,216000,647999),(8,648000,1313999),(9,1314000,2147483646);

truncate demoip_binsCreated;    INSERT demoip_binsCreated SELECT * FROM demofb_binsCreated;
truncate `demoip_binsLastActivity`;    INSERT demoip_binsLastActivity SELECT * FROM demofb_binsLastActivity;

truncate wikifb_binsCreated;    INSERT wikifb_binsCreated SELECT * FROM demofb_binsCreated;
truncate `wikifb_binsLastActivity`;    INSERT wikifb_binsLastActivity SELECT * FROM demofb_binsLastActivity;

truncate wikiip_binsCreated;    INSERT wikiip_binsCreated SELECT * FROM demofb_binsCreated;
truncate `wikiip_binsLastActivity`;    INSERT wikiip_binsLastActivity SELECT * FROM demofb_binsLastActivity;


-- Set back development
use mmm;

truncate demoFB_binsCreated;
INSERT INTO `demoFB_binsCreated` VALUES (0,0,0),(1,1,1),(2,2,3),(3,4,5),(4,6,8),(5,9,11),(6,12,17),(7,18,23),(8,24,35),(9,36,47),(10,48,2147483646);
truncate `demoFB_binsLastActivity`;
INSERT INTO `demoFB_binsLastActivity` VALUES (0,0,0),(1,1,1),(2,2,3),(3,4,7),(4,8,14),(5,15,29),(6,30,59),(7,60,179),(8,180,364),(9,365,2147483646);


truncate demoFB192_binsCreated;    INSERT demoFB192_binsCreated SELECT * FROM demoFB_binsCreated;
truncate `demoFB192_binsLastActivity`;    INSERT demoFB192_binsLastActivity SELECT * FROM demoFB_binsLastActivity;

truncate demoIP_binsCreated;    INSERT demoIP_binsCreated SELECT * FROM demoFB_binsCreated;
truncate `demoIP_binsLastActivity`;    INSERT demoIP_binsLastActivity SELECT * FROM demoFB_binsLastActivity;

truncate demoGoogle_binsCreated;    INSERT demoGoogle_binsCreated SELECT * FROM demoFB_binsCreated;
truncate `demoGoogle_binsLastActivity`;    INSERT demoGoogle_binsLastActivity SELECT * FROM demoFB_binsLastActivity;

truncate demoOI_binsCreated;    INSERT demoOI_binsCreated SELECT * FROM demoFB_binsCreated;
truncate `demoOI_binsLastActivity`;    INSERT demoOI_binsLastActivity SELECT * FROM demoFB_binsLastActivity;


-- Set back production
use heroku_03cabc319498916;

truncate demofb_binsCreated;
INSERT INTO `demofb_binsCreated` VALUES (0,0,0),(1,1,1),(2,2,3),(3,4,5),(4,6,8),(5,9,11),(6,12,17),(7,18,23),(8,24,35),(9,36,47),(10,48,2147483646);
truncate `demofb_binsLastActivity`;
INSERT INTO `demoFB_binsLastActivity` VALUES (0,0,0),(1,1,1),(2,2,3),(3,4,7),(4,8,14),(5,15,29),(6,30,59),(7,60,179),(8,180,364),(9,365,2147483646);

truncate demoip_binsCreated;    INSERT demoip_binsCreated SELECT * FROM demofb_binsCreated;
truncate `demoip_binsLastActivity`;    INSERT demoip_binsLastActivity SELECT * FROM demofb_binsLastActivity;

truncate wikifb_binsCreated;    INSERT wikifb_binsCreated SELECT * FROM demofb_binsCreated;
truncate `wikifb_binsLastActivity`;    INSERT wikifb_binsLastActivity SELECT * FROM demofb_binsLastActivity;

truncate wikiip_binsCreated;    INSERT wikiip_binsCreated SELECT * FROM demofb_binsCreated;
truncate `wikiip_binsLastActivity`;    INSERT wikiip_binsLastActivity SELECT * FROM demofb_binsLastActivity;






