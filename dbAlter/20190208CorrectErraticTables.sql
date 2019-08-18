

-- Development
ALTER TABLE mmm.demoIP_user
ADD COLUMN `gender` enum('male','female') NOT NULL AFTER created,
ADD COLUMN `timezone` varchar(16) NOT NULL DEFAULT '0000' AFTER created,
ADD COLUMN `locale` varchar(5) NOT NULL AFTER created,
ADD COLUMN `state` varchar(20) NOT NULL AFTER created,
ADD COLUMN `homeTown` varchar(20) NOT NULL AFTER created,
ADD COLUMN `nickIP` varchar(64) NOT NULL AFTER created,
ADD COLUMN `nameIP` varchar(64) NOT NULL AFTER created;

ALTER TABLE mmm.demoGoogle_user
ADD COLUMN `gender` enum('male','female') NOT NULL AFTER nickIP,
ADD COLUMN `timezone` varchar(16) NOT NULL DEFAULT '0000' AFTER nickIP,
ADD COLUMN `locale` varchar(5) NOT NULL AFTER nickIP,
ADD COLUMN `state` varchar(20) NOT NULL AFTER nickIP,
ADD COLUMN `homeTown` varchar(20) NOT NULL AFTER nickIP;

ALTER TABLE mmm.demoOI_user
ADD COLUMN `gender` enum('male','female') NOT NULL AFTER nickIP,
ADD COLUMN `timezone` varchar(16) NOT NULL DEFAULT '0000' AFTER nickIP,
ADD COLUMN `locale` varchar(5) NOT NULL AFTER nickIP,
ADD COLUMN `state` varchar(20) NOT NULL AFTER nickIP,
ADD COLUMN `homeTown` varchar(20) NOT NULL AFTER nickIP;





-- Production
ALTER TABLE heroku_03cabc319498916.demoip_user
ADD COLUMN `gender` enum('male','female') NOT NULL AFTER created,
ADD COLUMN `timezone` varchar(16) NOT NULL DEFAULT '0000' AFTER created,
ADD COLUMN `locale` varchar(5) NOT NULL AFTER created,
ADD COLUMN `state` varchar(20) NOT NULL AFTER created,
ADD COLUMN `homeTown` varchar(20) NOT NULL AFTER created,
ADD COLUMN `nickIP` varchar(64) NOT NULL AFTER created,
ADD COLUMN `nameIP` varchar(64) NOT NULL AFTER created;

ALTER TABLE heroku_03cabc319498916.wikiip_user
ADD COLUMN `gender` enum('male','female') NOT NULL AFTER created,
ADD COLUMN `timezone` varchar(16) NOT NULL DEFAULT '0000' AFTER created,
ADD COLUMN `locale` varchar(5) NOT NULL AFTER created,
ADD COLUMN `state` varchar(20) NOT NULL AFTER created,
ADD COLUMN `homeTown` varchar(20) NOT NULL AFTER created,
ADD COLUMN `nickIP` varchar(64) NOT NULL AFTER created,
ADD COLUMN `nameIP` varchar(64) NOT NULL AFTER created;




-- Set back development
ALTER TABLE mmm.demoIP_user
DROP COLUMN `gender`,
DROP COLUMN `timezone`,
DROP COLUMN `locale`
DROP COLUMN `state`,
DROP COLUMN `homeTown`,
DROP COLUMN `nickIP`,
DROP COLUMN `nameIP`;

ALTER TABLE mmm.demoGoogle_user
DROP COLUMN `gender`,
DROP COLUMN `timezone`,
DROP COLUMN `locale`,
DROP COLUMN `state`,
DROP COLUMN `homeTown`;

ALTER TABLE mmm.demoOI_user
DROP COLUMN `gender`,
DROP COLUMN `timezone`,
DROP COLUMN `locale`,
DROP COLUMN `state`,
DROP COLUMN `homeTown`;


-- Set back production
ALTER TABLE heroku_03cabc319498916.demoip_user
DROP COLUMN `gender`,
DROP COLUMN `timezone`,
DROP COLUMN `locale`
DROP COLUMN `state`,
DROP COLUMN `homeTown`,
DROP COLUMN `nickIP`,
DROP COLUMN `nameIP`;
ALTER TABLE heroku_03cabc319498916.wikiip_user
DROP COLUMN `gender`,
DROP COLUMN `timezone`,
DROP COLUMN `locale`
DROP COLUMN `state`,
DROP COLUMN `homeTown`,
DROP COLUMN `nickIP`,
DROP COLUMN `nameIP`;






