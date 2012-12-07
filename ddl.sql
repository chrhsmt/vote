SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `test` ;
CREATE SCHEMA IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8 ;
DROP SCHEMA IF EXISTS `vote` ;
CREATE SCHEMA IF NOT EXISTS `vote` DEFAULT CHARACTER SET utf8 ;
USE `test` ;

-- -----------------------------------------------------
-- Table `test`.`m_test`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test`.`m_test` ;

CREATE  TABLE IF NOT EXISTS `test`.`m_test` (
  `id` INT(11) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `test`.`tbl_test`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test`.`tbl_test` ;

CREATE  TABLE IF NOT EXISTS `test`.`tbl_test` (
  `id` INT NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;

USE `vote` ;

-- -----------------------------------------------------
-- Table `vote`.`m_election`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vote`.`m_election` ;

CREATE  TABLE IF NOT EXISTS `vote`.`m_election` (
  `election_id` INT(11) NOT NULL ,
  `title` VARCHAR(45) NULL DEFAULT NULL ,
  `description` TEXT NULL DEFAULT NULL ,
  `voting_date` DATETIME NULL DEFAULT NULL ,
  `regist_date` DATETIME NOT NULL ,
  `update_date` TIMESTAMP NOT NULL ,
  PRIMARY KEY (`election_id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '選挙マスター';


-- -----------------------------------------------------
-- Table `vote`.`m_party`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vote`.`m_party` ;

CREATE  TABLE IF NOT EXISTS `vote`.`m_party` (
  `party_id` INT NOT NULL ,
  `party_name` VARCHAR(45) NULL ,
  `regist_date` DATETIME NULL ,
  `update_date` TIMESTAMP NULL ,
  PRIMARY KEY (`party_id`) )
ENGINE = InnoDB
COMMENT = '党派マスター';


-- -----------------------------------------------------
-- Table `vote`.`m_candidate`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vote`.`m_candidate` ;

CREATE  TABLE IF NOT EXISTS `vote`.`m_candidate` (
  `candidate_id` INT NOT NULL ,
  `name` VARCHAR(45) NOT NULL ,
  `description` TEXT NULL ,
  `thumbUrl` VARCHAR(255) NULL ,
  `party_id` VARCHAR(45) NULL COMMENT '党派ID' ,
  `new_flg` INT NULL COMMENT '新旧(新／前／元)' ,
  `elected_count` INT NULL COMMENT '当選回数' ,
  `birthday` DATETIME NULL ,
  `career` VARCHAR(45) NULL ,
  `reegist_date` DATETIME NOT NULL ,
  `update_date` TIMESTAMP NOT NULL ,
  PRIMARY KEY (`candidate_id`) ,
  INDEX `fk_m_candidate_m_party1_idx` (`party_id` ASC) ,
  CONSTRAINT `fk_m_candidate_m_party1`
    FOREIGN KEY (`party_id` )
    REFERENCES `vote`.`m_party` (`party_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vote`.`m_constituency_block`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vote`.`m_constituency_block` ;

CREATE  TABLE IF NOT EXISTS `vote`.`m_constituency_block` (
  `block_id` INT NOT NULL ,
  `name` VARCHAR(10) NULL ,
  `regist_date` DATETIME NOT NULL ,
  `update_date` TIMESTAMP NOT NULL ,
  PRIMARY KEY (`block_id`) )
ENGINE = InnoDB
COMMENT = '選挙区ブロックマスター';


-- -----------------------------------------------------
-- Table `vote`.`m_constituency`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vote`.`m_constituency` ;

CREATE  TABLE IF NOT EXISTS `vote`.`m_constituency` (
  `constituency_id` INT NOT NULL COMMENT '選挙区ID' ,
  `name` VARCHAR(45) NOT NULL ,
  `block_id` INT NULL ,
  `regist_date` DATETIME NULL ,
  PRIMARY KEY (`constituency_id`) ,
  INDEX `fk_m_constituency_m_constituency_block_idx` (`block_id` ASC) ,
  CONSTRAINT `fk_m_constituency_m_constituency_block`
    FOREIGN KEY (`block_id` )
    REFERENCES `vote`.`m_constituency_block` (`block_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '選挙区マスター';


-- -----------------------------------------------------
-- Table `vote`.`tbl_election_constituency`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vote`.`tbl_election_constituency` ;

CREATE  TABLE IF NOT EXISTS `vote`.`tbl_election_constituency` (
  `election_id` INT(11) NOT NULL ,
  `constituency_id` INT NOT NULL ,
  `regist_date` DATETIME NOT NULL ,
  PRIMARY KEY (`election_id`, `constituency_id`) ,
  INDEX `fk_m_election_has_m_constituency_m_constituency1_idx` (`constituency_id` ASC) ,
  INDEX `fk_m_election_has_m_constituency_m_election1_idx` (`election_id` ASC) ,
  CONSTRAINT `fk_m_election_has_m_constituency_m_election1`
    FOREIGN KEY (`election_id` )
    REFERENCES `vote`.`m_election` (`election_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_m_election_has_m_constituency_m_constituency1`
    FOREIGN KEY (`constituency_id` )
    REFERENCES `vote`.`m_constituency` (`constituency_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vote`.`tbl_election_candidate`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vote`.`tbl_election_candidate` ;

CREATE  TABLE IF NOT EXISTS `vote`.`tbl_election_candidate` (
  `election_id` INT(11) NOT NULL ,
  `constituency_id` INT NOT NULL ,
  `candidate_id` INT NOT NULL ,
  `regist_date` DATETIME NOT NULL ,
  PRIMARY KEY (`election_id`, `constituency_id`, `candidate_id`) ,
  INDEX `fk_m_election_has_m_constituency_has_m_candidate_m_candidat_idx` (`candidate_id` ASC) ,
  INDEX `fk_m_election_has_m_constituency_has_m_candidate_m_election_idx` (`election_id` ASC, `constituency_id` ASC) ,
  CONSTRAINT `fk_m_election_has_m_constituency_has_m_candidate_m_election_h1`
    FOREIGN KEY (`election_id` , `constituency_id` )
    REFERENCES `vote`.`tbl_election_constituency` (`election_id` , `constituency_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_m_election_has_m_constituency_has_m_candidate_m_candidate1`
    FOREIGN KEY (`candidate_id` )
    REFERENCES `vote`.`m_candidate` (`candidate_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `vote`.`m_election`
-- -----------------------------------------------------
START TRANSACTION;
USE `vote`;
INSERT INTO `vote`.`m_election` (`election_id`, `title`, `description`, `voting_date`, `regist_date`, `update_date`) VALUES (1, '衆議院総選挙', '衆議院総選挙です', '2012/12/16', '2012/12/02', '2012/12/02');
INSERT INTO `vote`.`m_election` (`election_id`, `title`, `description`, `voting_date`, `regist_date`, `update_date`) VALUES (2, '東京都知事選', '東京都知事選です', '2012/12/16', '2012/12/02', '2012/12/02');

COMMIT;

-- -----------------------------------------------------
-- Data for table `vote`.`m_candidate`
-- -----------------------------------------------------
START TRANSACTION;
USE `vote`;
INSERT INTO `vote`.`m_candidate` (`candidate_id`, `name`, `description`, `thumbUrl`, `party_id`, `new_flg`, `elected_count`, `birthday`, `career`, `reegist_date`, `update_date`) VALUES (1, 'テスト太郎', 'テスト太郎っす', 'http://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Taro_Aso_in_World_Economic_Forum_Annual_Meeting_in_Davos_%28cropped%29.jpg/200px-Taro_Aso_in_World_Economic_Forum_Annual_Meeting_in_Davos_%28cropped%29.jpg', NULL, NULL, NULL, '1999/01/01', NULL, '2012/12/4', '2012/12/4');

COMMIT;

-- -----------------------------------------------------
-- Data for table `vote`.`m_constituency_block`
-- -----------------------------------------------------
START TRANSACTION;
USE `vote`;
INSERT INTO `vote`.`m_constituency_block` (`block_id`, `name`, `regist_date`, `update_date`) VALUES (1, '北海道ブロック', '2012/12/3', '2012/12/3');
INSERT INTO `vote`.`m_constituency_block` (`block_id`, `name`, `regist_date`, `update_date`) VALUES (2, '東北ブロック', '2012/12/3', '2012/12/3');
INSERT INTO `vote`.`m_constituency_block` (`block_id`, `name`, `regist_date`, `update_date`) VALUES (3, '北関東ブロック', '2012/12/3', '2012/12/3');
INSERT INTO `vote`.`m_constituency_block` (`block_id`, `name`, `regist_date`, `update_date`) VALUES (4, '南関東ブロック', '2012/12/3', '2012/12/3');
INSERT INTO `vote`.`m_constituency_block` (`block_id`, `name`, `regist_date`, `update_date`) VALUES (5, '東京ブロック', '2012/12/3', '2012/12/3');
INSERT INTO `vote`.`m_constituency_block` (`block_id`, `name`, `regist_date`, `update_date`) VALUES (6, '北陸信越ブロック', '2012/12/3', '2012/12/3');
INSERT INTO `vote`.`m_constituency_block` (`block_id`, `name`, `regist_date`, `update_date`) VALUES (7, '東海ブロック', '2012/12/3', '2012/12/3');
INSERT INTO `vote`.`m_constituency_block` (`block_id`, `name`, `regist_date`, `update_date`) VALUES (8, '近畿ブロック', '2012/12/3', '2012/12/3');
INSERT INTO `vote`.`m_constituency_block` (`block_id`, `name`, `regist_date`, `update_date`) VALUES (9, '中国ブロック', '2012/12/3', '2012/12/3');
INSERT INTO `vote`.`m_constituency_block` (`block_id`, `name`, `regist_date`, `update_date`) VALUES (10, '四国ブロック', '2012/12/3', '2012/12/3');
INSERT INTO `vote`.`m_constituency_block` (`block_id`, `name`, `regist_date`, `update_date`) VALUES (11, '九州ブロック', '2012/12/3', '2012/12/3');

COMMIT;

-- -----------------------------------------------------
-- Data for table `vote`.`m_constituency`
-- -----------------------------------------------------
START TRANSACTION;
USE `vote`;
INSERT INTO `vote`.`m_constituency` (`constituency_id`, `name`, `block_id`, `regist_date`) VALUES (1, '北海道ブロック第1区', 1, '2012/12/3');
INSERT INTO `vote`.`m_constituency` (`constituency_id`, `name`, `block_id`, `regist_date`) VALUES (2, '北海道ブロック第2区', 2, '2012/12/3');
INSERT INTO `vote`.`m_constituency` (`constituency_id`, `name`, `block_id`, `regist_date`) VALUES (3, '北海道ブロック第3区', 1, '2012/12/3');
INSERT INTO `vote`.`m_constituency` (`constituency_id`, `name`, `block_id`, `regist_date`) VALUES (4, '北海道ブロック第4区', 1, '2012/12/3');
INSERT INTO `vote`.`m_constituency` (`constituency_id`, `name`, `block_id`, `regist_date`) VALUES (5, '北海道ブロック第5区', 1, '2012/12/3');
INSERT INTO `vote`.`m_constituency` (`constituency_id`, `name`, `block_id`, `regist_date`) VALUES (6, '北海道ブロック第6区', 1, '2012/12/3');
INSERT INTO `vote`.`m_constituency` (`constituency_id`, `name`, `block_id`, `regist_date`) VALUES (7, '北海道ブロック第7区', 1, '2012/12/3');
INSERT INTO `vote`.`m_constituency` (`constituency_id`, `name`, `block_id`, `regist_date`) VALUES (8, '北海道ブロック第8区', 1, '2012/12/3');
INSERT INTO `vote`.`m_constituency` (`constituency_id`, `name`, `block_id`, `regist_date`) VALUES (9, '北海道ブロック第9区', 1, '2012/12/3');
INSERT INTO `vote`.`m_constituency` (`constituency_id`, `name`, `block_id`, `regist_date`) VALUES (10, '北海道ブロック第10区', 1, '2012/12/3');
INSERT INTO `vote`.`m_constituency` (`constituency_id`, `name`, `block_id`, `regist_date`) VALUES (11, '北海道ブロック第11区', 1, '2012/12/3');
INSERT INTO `vote`.`m_constituency` (`constituency_id`, `name`, `block_id`, `regist_date`) VALUES (12, '北海道ブロック第12区', 1, '2012/12/3');
INSERT INTO `vote`.`m_constituency` (`constituency_id`, `name`, `block_id`, `regist_date`) VALUES (13, '東北ブロック第1区', 2, '2012/12/3');
INSERT INTO `vote`.`m_constituency` (`constituency_id`, `name`, `block_id`, `regist_date`) VALUES (14, '東北ブロック第2区', 2, '2012/12/3');
INSERT INTO `vote`.`m_constituency` (`constituency_id`, `name`, `block_id`, `regist_date`) VALUES (15, '東北ブロック第3区', 2, '2012/12/3');
INSERT INTO `vote`.`m_constituency` (`constituency_id`, `name`, `block_id`, `regist_date`) VALUES (16, '東北ブロック第4区', 2, '2012/12/3');
INSERT INTO `vote`.`m_constituency` (`constituency_id`, `name`, `block_id`, `regist_date`) VALUES (17, '北関東ブロック第1区', 3, '2012/12/3');

COMMIT;

-- -----------------------------------------------------
-- Data for table `vote`.`tbl_election_constituency`
-- -----------------------------------------------------
START TRANSACTION;
USE `vote`;
INSERT INTO `vote`.`tbl_election_constituency` (`election_id`, `constituency_id`, `regist_date`) VALUES (1, 1, '2012/12/4');

COMMIT;

-- -----------------------------------------------------
-- Data for table `vote`.`tbl_election_candidate`
-- -----------------------------------------------------
START TRANSACTION;
USE `vote`;
INSERT INTO `vote`.`tbl_election_candidate` (`election_id`, `constituency_id`, `candidate_id`, `regist_date`) VALUES (1, 1, 1, '2012/12/4');

COMMIT;
