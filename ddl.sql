SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `vote` ;
CREATE SCHEMA IF NOT EXISTS `vote` DEFAULT CHARACTER SET utf8 ;
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
  `regist_user_id` BIGINT NOT NULL ,
  `regist_date` DATETIME NOT NULL ,
  `update_user_id` BIGINT NOT NULL ,
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
  `party_id` INT NULL COMMENT '党派ID' ,
  `new_flg` INT NULL COMMENT '新旧(新／前／元)' ,
  `elected_count` INT NULL COMMENT '当選回数' ,
  `birthday` DATETIME NULL ,
  `career` TEXT NULL ,
  `regist_user_id` BIGINT NOT NULL ,
  `regist_date` DATETIME NOT NULL ,
  `update_user_id` BIGINT NOT NULL ,
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
  `regist_user_id` BIGINT NULL ,
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
-- Table `vote`.`tbl_constituency_candidate`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vote`.`tbl_constituency_candidate` ;

CREATE  TABLE IF NOT EXISTS `vote`.`tbl_constituency_candidate` (
  `election_id` INT(11) NOT NULL ,
  `constituency_id` INT NOT NULL ,
  `candidate_id` INT NOT NULL ,
  `regist_user_id` BIGINT NOT NULL ,
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


-- -----------------------------------------------------
-- Table `vote`.`m_issue`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vote`.`m_issue` ;

CREATE  TABLE IF NOT EXISTS `vote`.`m_issue` (
  `issue_id` INT NOT NULL ,
  `title` VARCHAR(45) NOT NULL ,
  `description` TEXT NOT NULL ,
  `regist_user_id` BIGINT NOT NULL ,
  `regist_date` DATETIME NOT NULL ,
  PRIMARY KEY (`issue_id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `vote`.`tbl_constituency_issue`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vote`.`tbl_constituency_issue` ;

CREATE  TABLE IF NOT EXISTS `vote`.`tbl_constituency_issue` (
  `election_id` INT(11) NOT NULL ,
  `constituency_id` INT NOT NULL ,
  `issue_id` INT NOT NULL ,
  `regist_user_id` BIGINT NOT NULL ,
  `regist_date` DATETIME NOT NULL ,
  PRIMARY KEY (`election_id`, `constituency_id`, `issue_id`) ,
  INDEX `fk_tbl_election_constituency_has_m_issue_m_issue1_idx` (`issue_id` ASC) ,
  INDEX `fk_tbl_election_constituency_has_m_issue_tbl_election_const_idx` (`election_id` ASC, `constituency_id` ASC) ,
  CONSTRAINT `fk_tbl_election_constituency_has_m_issue_tbl_election_constit1`
    FOREIGN KEY (`election_id` , `constituency_id` )
    REFERENCES `vote`.`tbl_election_constituency` (`election_id` , `constituency_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_election_constituency_has_m_issue_m_issue1`
    FOREIGN KEY (`issue_id` )
    REFERENCES `vote`.`m_issue` (`issue_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vote`.`tbl_opinion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vote`.`tbl_opinion` ;

CREATE  TABLE IF NOT EXISTS `vote`.`tbl_opinion` (
  `opinion_id` INT NOT NULL ,
  `election_id` INT(11) NOT NULL ,
  `constituency_id` INT NOT NULL ,
  `candidate_id` INT NOT NULL ,
  `issue_id` INT NOT NULL ,
  `text` TEXT NULL ,
  `regist_user_id` BIGINT NOT NULL ,
  `regist_date` DATETIME NOT NULL ,
  `update_user_id` BIGINT NOT NULL ,
  `update_date` TIMESTAMP NOT NULL ,
  PRIMARY KEY (`election_id`, `constituency_id`, `candidate_id`, `issue_id`) ,
  INDEX `fk_tbl_election_candidate_has_m_issue_tbl_election_candidat_idx` (`election_id` ASC, `constituency_id` ASC, `candidate_id` ASC) ,
  INDEX `fk_tbl_issues_tbl_constituency_issue3_idx` (`issue_id` ASC) ,
  UNIQUE INDEX `opinion_id_UNIQUE` (`opinion_id` ASC) ,
  INDEX `ind_opinion_id` (`opinion_id` ASC) ,
  CONSTRAINT `fk_tbl_election_candidate_has_m_issue_tbl_election_candidate1`
    FOREIGN KEY (`election_id` , `constituency_id` , `candidate_id` )
    REFERENCES `vote`.`tbl_constituency_candidate` (`election_id` , `constituency_id` , `candidate_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_issues_tbl_constituency_issue3`
    FOREIGN KEY (`issue_id` )
    REFERENCES `vote`.`tbl_constituency_issue` (`issue_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vote`.`m_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vote`.`m_user` ;

CREATE  TABLE IF NOT EXISTS `vote`.`m_user` (
  `user_id` BIGINT(20) NOT NULL ,
  `oauth_type` INT(11) NOT NULL COMMENT '1:Facebook\\\\n2:….\\\\n' ,
  `auth_id` VARCHAR(255) NOT NULL ,
  `regist_date` DATETIME NOT NULL ,
  `last_login_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`user_id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


