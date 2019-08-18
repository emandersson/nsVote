
-- Development
ALTER TABLE mmm.demoGoogle_user CHANGE COLUMN timezone timezone VARCHAR(16) NOT NULL DEFAULT "0000";
ALTER TABLE mmm.demoFB192_user CHANGE COLUMN timezone timezone VARCHAR(16) NOT NULL DEFAULT "0000";
ALTER TABLE mmm.demoFB_user CHANGE COLUMN timezone timezone VARCHAR(16) NOT NULL DEFAULT "0000";
ALTER TABLE mmm.demoIP_user CHANGE COLUMN timezone timezone VARCHAR(16) NOT NULL DEFAULT "0000";
ALTER TABLE mmm.demoOI_user CHANGE COLUMN timezone timezone VARCHAR(16) NOT NULL DEFAULT "0000";

-- Production
ALTER TABLE heroku_03cabc319498916.demofb_user CHANGE COLUMN timezone timezone VARCHAR(16) NOT NULL DEFAULT "0000";
ALTER TABLE heroku_03cabc319498916.demoip_user CHANGE COLUMN timezone timezone VARCHAR(16) NOT NULL DEFAULT "0000";
ALTER TABLE heroku_03cabc319498916.wikifb_user CHANGE COLUMN timezone timezone VARCHAR(16) NOT NULL DEFAULT "0000";
ALTER TABLE heroku_03cabc319498916.wikiip_user CHANGE COLUMN timezone timezone VARCHAR(16) NOT NULL DEFAULT "0000";



-- Set back development
ALTER TABLE mmm.demoGoogle_user CHANGE COLUMN timezone timezone FLOAT NOT NULL;
ALTER TABLE mmm.demoFB192_user CHANGE COLUMN timezone timezone FLOAT NOT NULL;
ALTER TABLE mmm.demoFB_user CHANGE COLUMN timezone timezone FLOAT NOT NULL;
ALTER TABLE mmm.demoIP_user CHANGE COLUMN timezone timezone FLOAT NOT NULL;
ALTER TABLE mmm.demoOI_user CHANGE COLUMN timezone timezone FLOAT NOT NULL;

-- Set back production
ALTER TABLE heroku_03cabc319498916.demofb_user CHANGE COLUMN timezone timezone FLOAT NOT NULL;
ALTER TABLE heroku_03cabc319498916.demoip_user CHANGE COLUMN timezone timezone FLOAT NOT NULL;
ALTER TABLE heroku_03cabc319498916.wikifb_user CHANGE COLUMN timezone timezone FLOAT NOT NULL;
ALTER TABLE heroku_03cabc319498916.wikiip_user CHANGE COLUMN timezone timezone FLOAT NOT NULL;





