

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

-- Production
ALTER TABLE heroku_03cabc319498916.demofb_user
ADD COLUMN `choise` int(4) NOT NULL AFTER created;
ALTER TABLE heroku_03cabc319498916.demoip_user
ADD COLUMN `choise` int(4) NOT NULL AFTER created;
ALTER TABLE heroku_03cabc319498916.wikifb_user
ADD COLUMN `choise` int(4) NOT NULL AFTER created;
ALTER TABLE heroku_03cabc319498916.wikiip_user
ADD COLUMN `choise` int(4) NOT NULL AFTER created;


-- Set back development
ALTER TABLE mmm.demoFB192_user
DROP COLUMN `choise`;
ALTER TABLE mmm.demoIP_user
DROP COLUMN `choise`;
ALTER TABLE mmm.demoGoogle_user
DROP COLUMN `choise`;
ALTER TABLE mmm.demoIP_user
DROP COLUMN `choise`;
ALTER TABLE mmm.demoOI_user
DROP COLUMN `choise`;

CREATE TABLE `demoFB192_choise` (
  `idUser` int(4) NOT NULL,
  `choise` tinyint(3) unsigned NOT NULL,
  UNIQUE KEY `idUser` (`idUser`,`choise`),
  CONSTRAINT `demoFB192_choise_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `demoFB192_user` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `demoIP_choise` (
  `idUser` int(4) NOT NULL,
  `choise` tinyint(3) unsigned NOT NULL,
  UNIQUE KEY `idUser` (`idUser`,`choise`),
  CONSTRAINT `demoIP_choise_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `demoIP_user` (`idUser`) ON DELETE CASCADE
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



INSERT INTO demoFB192_choise FROM SELECT u.idUser, u.choise FROM demoFB192_user u;

-- Set back production
ALTER TABLE heroku_03cabc319498916.demofb_user
DROP COLUMN `choise`;
ALTER TABLE heroku_03cabc319498916.demoip_user
DROP COLUMN `choise`;
ALTER TABLE heroku_03cabc319498916.wikifb_user
DROP COLUMN `choise`;
ALTER TABLE heroku_03cabc319498916.wikiip_user
DROP COLUMN `choise`;

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

