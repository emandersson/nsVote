

-- Development
ALTER TABLE mmm.demoFB192_user
ADD COLUMN `choise` int(4) NOT NULL AFTER created;
ALTER TABLE mmm.demoIP_user
ADD COLUMN `choise` int(4) NOT NULL AFTER created;
ALTER TABLE mmm.demoGoogle_user
ADD COLUMN `choise` int(4) NOT NULL AFTER created;
ALTER TABLE mmm.demoIP_user
ADD COLUMN `choise` int(4) NOT NULL AFTER created;
ALTER TABLE mmm.demoOI_user
ADD COLUMN `choise` int(4) NOT NULL AFTER created;

UPDATE demoFB192_user u JOIN demoFB192_choise c on u.idUser=c.idUser SET u.choise=c.choise;
UPDATE demoIP_user u JOIN demoIP_choise c on u.idUser=c.idUser SET u.choise=c.choise;
UPDATE demoGoogle_user u JOIN demoGoogle_choise c on u.idUser=c.idUser SET u.choise=c.choise;
UPDATE demoIP_user u JOIN demoIP_choise c on u.idUser=c.idUser SET u.choise=c.choise;
UPDATE demoOI_user u JOIN demoOI_choise c on u.idUser=c.idUser SET u.choise=c.choise;

-- Production
ALTER TABLE heroku_03cabc319498916.demofb_user
ADD COLUMN `choise` int(4) NOT NULL AFTER created;
ALTER TABLE heroku_03cabc319498916.demoip_user
ADD COLUMN `choise` int(4) NOT NULL AFTER created;
ALTER TABLE heroku_03cabc319498916.wikifb_user
ADD COLUMN `choise` int(4) NOT NULL AFTER created;
ALTER TABLE heroku_03cabc319498916.wikiip_user
ADD COLUMN `choise` int(4) NOT NULL AFTER created;

UPDATE heroku_03cabc319498916.demofb_user u JOIN heroku_03cabc319498916.demofb_choise c on u.idUser=c.idUser SET u.choise=c.choise;
UPDATE heroku_03cabc319498916.demoip_user u JOIN heroku_03cabc319498916.demoip_choise c on u.idUser=c.idUser SET u.choise=c.choise;
UPDATE heroku_03cabc319498916.wikifb_user u JOIN heroku_03cabc319498916.wikifb_choise c on u.idUser=c.idUser SET u.choise=c.choise;
UPDATE heroku_03cabc319498916.wikiip_user u JOIN heroku_03cabc319498916.wikiip_choise c on u.idUser=c.idUser SET u.choise=c.choise;

-- Set back development

CREATE TABLE `demoFB192_choise` (
  `idUser` int(4) NOT NULL,
  `choise` tinyint(3) unsigned NOT NULL,
  UNIQUE KEY `idUser` (`idUser`,`choise`),
  CONSTRAINT `demoFB192_choise_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `demoFB192_user` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `demoFB_choise` (
  `idUser` int(4) NOT NULL,
  `choise` tinyint(3) unsigned NOT NULL,
  UNIQUE KEY `idUser` (`idUser`,`choise`),
  CONSTRAINT `demoFB_choise_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `demoFB_user` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `demoGoogle_choise` (
  `idUser` int(4) NOT NULL,
  `choise` tinyint(3) unsigned NOT NULL,
  UNIQUE KEY `idUser` (`idUser`,`choise`),
  CONSTRAINT `demoGoogle_choise_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `demoGoogle_user` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `demoIP_choise` (
  `idUser` int(4) NOT NULL,
  `choise` tinyint(3) unsigned NOT NULL,
  UNIQUE KEY `idUser` (`idUser`,`choise`),
  CONSTRAINT `demoIP_choise_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `demoIP_user` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `demoOI_choise` (
  `idUser` int(4) NOT NULL,
  `choise` tinyint(3) unsigned NOT NULL,
  UNIQUE KEY `idUser` (`idUser`,`choise`),
  CONSTRAINT `demoOI_choise_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `demoOI_user` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO demoFB192_choise SELECT u.idUser, u.choise FROM demoFB192_user u;
INSERT INTO demoFB_choise SELECT u.idUser, u.choise FROM demoFB_user u;
INSERT INTO demoGoogle_choise SELECT u.idUser, u.choise FROM demoGoogle_user u;
INSERT INTO demoIP_choise SELECT u.idUser, u.choise FROM demoIP_user u;
INSERT INTO demoOI_choise SELECT u.idUser, u.choise FROM demoOI_user u;

ALTER TABLE mmm.demoFB192_user
DROP COLUMN `choise`;
ALTER TABLE mmm.demoFB_user
DROP COLUMN `choise`;
ALTER TABLE mmm.demoGoogle_user
DROP COLUMN `choise`;
ALTER TABLE mmm.demoIP_user
DROP COLUMN `choise`;
ALTER TABLE mmm.demoOI_user
DROP COLUMN `choise`;



-- Set back production

CREATE TABLE `demofb_choise` (
  `idUser` int(4) NOT NULL,
  `choise` tinyint(3) unsigned NOT NULL,
  UNIQUE KEY `idUser` (`idUser`,`choise`),
  CONSTRAINT `demofb_choise_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `demofb_user` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `demoip_choise` (
  `idUser` int(4) NOT NULL,
  `choise` tinyint(3) unsigned NOT NULL,
  UNIQUE KEY `idUser` (`idUser`,`choise`),
  CONSTRAINT `demoip_choise_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `demoip_user` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `wikifb_choise` (
  `idUser` int(4) NOT NULL,
  `choise` tinyint(3) unsigned NOT NULL,
  UNIQUE KEY `idUser` (`idUser`,`choise`),
  CONSTRAINT `wikifb_choise_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `wikifb_user` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `wikiip_choise` (
  `idUser` int(4) NOT NULL,
  `choise` tinyint(3) unsigned NOT NULL,
  UNIQUE KEY `idUser` (`idUser`,`choise`),
  CONSTRAINT `wikiip_choise_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `wikiip_user` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO demofb_choise SELECT u.idUser, u.choise FROM demofb_user u;
INSERT INTO demoip_choise SELECT u.idUser, u.choise FROM demoip_user u;
INSERT INTO wikifb_choise SELECT u.idUser, u.choise FROM wikifb_user u;
INSERT INTO wikiip_choise SELECT u.idUser, u.choise FROM wikiip_user u;

ALTER TABLE heroku_03cabc319498916.demofb_user
DROP COLUMN `choise`;
ALTER TABLE heroku_03cabc319498916.demoip_user
DROP COLUMN `choise`;
ALTER TABLE heroku_03cabc319498916.wikifb_user
DROP COLUMN `choise`;
ALTER TABLE heroku_03cabc319498916.wikiip_user
DROP COLUMN `choise`;
