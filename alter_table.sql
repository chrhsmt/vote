alter table m_constituency add column `is_prefecture` TINYINT(1) NOT NULL DEFAULT false;
alter table m_constituency add column `is_municipality` TINYINT(1) NOT NULL DEFAULT false;

