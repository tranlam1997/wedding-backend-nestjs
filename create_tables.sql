-- Cấu trúc bảng cho users
CREATE TABLE `Role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Permission` (
  `id` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `RolePermission` (
  `role_id` INT NOT NULL,
  `permission_id` VARCHAR(32) NOT NULL,
  FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`permission_id`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (`role_id`, `permission_id`)
);

CREATE TABLE `Client` (
  `version` VARCHAR(21) NULL,
  `type` VARCHAR(20) NULL,
  `value` VARCHAR(50) NULL
);

CREATE TABLE `User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `display_name` VARCHAR(50) NULL,
  `password` VARCHAR(100) NULL,
  `photoURL` VARCHAR(128) NULL,
  `photoID` VARCHAR(21) NULL,
  `backgroundID` VARCHAR(21) NULL,
  `uid` VARCHAR(32) NULL,
  `email` VARCHAR(128) NULL,
  `tel` VARCHAR(12) NULL,
  `provider` VARCHAR(50) NULL,
  `provider_id` VARCHAR(20) NULL,
  `email_verified` BOOLEAN NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role_id` INT NOT NULL,
  `active` BOOLEAN NOT NULL,
  `client_version` VARCHAR(32) NOT NULL DEFAULT '',
  `client_type` VARCHAR(20) NULL DEFAULT '',
  UNIQUE (`email`),
  INDEX (provider),
  INDEX (provider),
  UNIQUE (`uid`),
  INDEX (`active`),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- CREATE administrative_regions TABLE
CREATE TABLE administrative_regions (
  id integer NOT NULL,
  name varchar(255) NOT NULL,
  name_en varchar(255) NOT NULL,
  code_name varchar(255) NULL,
  code_name_en varchar(255) NULL,
  CONSTRAINT administrative_regions_pkey PRIMARY KEY (id)
);

-- CREATE administrative_units TABLE
CREATE TABLE administrative_units (
  id integer NOT NULL,
  full_name varchar(255) NULL,
  full_name_en varchar(255) NULL,
  short_name varchar(255) NULL,
  short_name_en varchar(255) NULL,
  code_name varchar(255) NULL,
  code_name_en varchar(255) NULL,
  CONSTRAINT administrative_units_pkey PRIMARY KEY (id)
);

-- CREATE provinces TABLE
CREATE TABLE provinces (
  code varchar(20) NOT NULL,
  name varchar(255) NOT NULL,
  name_en varchar(255) NULL,
  full_name varchar(255) NOT NULL,
  full_name_en varchar(255) NULL,
  code_name varchar(255) NULL,
  administrative_unit_id integer NULL,
  administrative_region_id integer NULL,
  CONSTRAINT provinces_pkey PRIMARY KEY (code)
);

-- provinces foreign keys
ALTER TABLE
  provinces
ADD
  CONSTRAINT provinces_administrative_region_id_fkey FOREIGN KEY (administrative_region_id) REFERENCES administrative_regions(id);

ALTER TABLE
  provinces
ADD
  CONSTRAINT provinces_administrative_unit_id_fkey FOREIGN KEY (administrative_unit_id) REFERENCES administrative_units(id);

-- CREATE districts TABLE
CREATE TABLE districts (
  code varchar(20) NOT NULL,
  name varchar(255) NOT NULL,
  name_en varchar(255) NULL,
  full_name varchar(255) NULL,
  full_name_en varchar(255) NULL,
  code_name varchar(255) NULL,
  province_code varchar(20) NULL,
  administrative_unit_id integer NULL,
  CONSTRAINT districts_pkey PRIMARY KEY (code)
);

-- districts foreign keys
ALTER TABLE
  districts
ADD
  CONSTRAINT districts_administrative_unit_id_fkey FOREIGN KEY (administrative_unit_id) REFERENCES administrative_units(id);

ALTER TABLE
  districts
ADD
  CONSTRAINT districts_province_code_fkey FOREIGN KEY (province_code) REFERENCES provinces(code);

-- CREATE wards TABLE
CREATE TABLE wards (
  code varchar(20) NOT NULL,
  name varchar(255) NOT NULL,
  name_en varchar(255) NULL,
  full_name varchar(255) NULL,
  full_name_en varchar(255) NULL,
  code_name varchar(255) NULL,
  district_code varchar(20) NULL,
  administrative_unit_id integer NULL,
  CONSTRAINT wards_pkey PRIMARY KEY (code)
);

-- wards foreign keys
ALTER TABLE
  wards
ADD
  CONSTRAINT wards_administrative_unit_id_fkey FOREIGN KEY (administrative_unit_id) REFERENCES administrative_units(id);

ALTER TABLE
  wards
ADD
  CONSTRAINT wards_district_code_fkey FOREIGN KEY (district_code) REFERENCES districts(code);

CREATE TABLE `Customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `name_en` VARCHAR(50) NOT NULL,
  `tel` VARCHAR(20) NULL,
  `addr` VARCHAR(20) NULL,
  `province_code` VARCHAR(5) NULL,
  `district_code` VARCHAR(5) NULL,
  `ward_code` VARCHAR(6) NULL,
  `photoURL` VARCHAR(128) NULL,
  `email` VARCHAR(128) NULL,
  `delegate_person` VARCHAR(50) NULL,
  `delegate_mobile` VARCHAR(20) NULL,
  `company` VARCHAR(100) NULL,
  `note` VARCHAR(150) NULL,
  `group_id` VARCHAR(21) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX(`tel`),
  INDEX(`delegate_mobile`),
  INDEX (name),
  FULLTEXT (name_en),
  INDEX (email),
  INDEX (delegate_person),
  FOREIGN KEY (`group_id`) REFERENCES `CustomerGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (`province_code`) REFERENCES `provinces`(`code`) ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    FOREIGN KEY (`district_code`) REFERENCES `districts`(`code`) ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    FOREIGN KEY (`ward_code`) REFERENCES `wards`(`code`) ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    PRIMARY KEY (`id`)
);

CREATE TABLE `CustomerGroup` (
  `id` VARCHAR(21) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  INDEX (name),
  PRIMARY KEY(`id`)
);

CREATE TABLE `Place` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `photoID` VARCHAR(21) NULL,
  `settings` VARCHAR(4000) NULL,
  PRIMARY KEY (`id`),
  INDEX(`name`)
);

CREATE TABLE `EventType` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `color` VARCHAR(10) NULL,
  `template` TEXT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Attachment` (
  `id` VARCHAR(21) NOT NULL,
  `user_id` INT NULL,
  `filename` VARCHAR(100) NOT NULL,
  `size` INT NULL,
  `width` INT NULL,
  `height` INT NULL,
  `type` VARCHAR(20) NULL,
  `preview_id` VARCHAR(21) NULL,
  `time` BIGINT NULL,
  PRIMARY KEY (`id`),
  INDEX(`type`),
  INDEX(`size`),
  INDEX(`time`),
  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE
);

CREATE TABLE `Event` (
  `id` VARCHAR(21) NOT NULL,
  `title` VARCHAR(100) NULL,
  `title_en` VARCHAR(100) NULL,
  `guest_estimate` VARCHAR(100) NULL,
  `table_count` SMALLINT NOT NULL DEFAULT 0,
  `table_size` SMALLINT NOT NULL DEFAULT 0,
  `feedback` VARCHAR(250) NULL,
  `start_time` BIGINT NULL,
  `end_time` BIGINT NULL,
  `type_id` INT NOT NULL,
  `place_id` INT NULL,
  `place_note` VARCHAR(200) NULL,
  `backup_place_id` INT NULL,
  `deposit` INT NOT NULL DEFAULT 0,
  `deposit_note` VARCHAR(200) NULL,
  `is_cancel` BOOLEAN NULL,
  `checklist` TEXT NULL,
  `customer_id` INT NULL,
  `user_id` INT NULL,
  `enable_chat` BOOLEAN NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FULLTEXT (`title_en`),
  INDEX (`is_cancel`),
  INDEX (`customer_id`),
  INDEX (`enable_chat`),
  INDEX (`user_id`),
  INDEX (`start_time`),
  INDEX (`end_time`),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    FOREIGN KEY (`place_id`) REFERENCES `Place`(`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    FOREIGN KEY (`backup_place_id`) REFERENCES `Place`(`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE
);

ALTER TABLE
  `Event`
ADD
  `date_time` VARCHAR(20) AS (
    DATE_FORMAT(
      FROM_UNIXTIME(LEFT(`start_time`, char_length(`start_time`) -3)),
      '%Y-%m-%d %H:%i:%s'
    )
  );



CREATE TABLE `Menu` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `amount` VARCHAR(100) NULL,
  `price` INT NOT NULL,
  INDEX(`name`),
  INDEX(`price`),
  PRIMARY KEY (`id`)
);

CREATE TABLE `EventMenu` (
  `event_id` VARCHAR(21) NOT NULL,
  `menu_id` INT NOT NULL,
  `price` INT NOT NULL,
  `amount` VARCHAR(100) NULL,
  INDEX(`price`),
  FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`menu_id`) REFERENCES `Menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `EventAttachment` (
  `event_id` VARCHAR(21) NOT NULL,
  `attachment_id` VARCHAR(21) NOT NULL,
  FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`attachment_id`) REFERENCES `Attachment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX(`event_id`),
  INDEX(`attachment_id`)
);

CREATE TABLE `ChatRoom` (
  `id` VARCHAR(21) NOT NULL,
  `name` VARCHAR(100) NULL,
  `photoID` VARCHAR(21) NULL,
  `backgroundID` VARCHAR(21) NULL,
  `type` VARCHAR(10) NULL,
  -- event | empty
  `description` VARCHAR(200) NULL,
  `extra` VARCHAR(1000) NULL,
  `creator_id` INT NULL,
  `created_at` BIGINT NULL,
  INDEX (`name`),
  INDEX(`type`),
  FOREIGN KEY (`creator_id`) REFERENCES `User`(`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    PRIMARY KEY (`id`)
);

CREATE TABLE `Participant` (
  `id` VARCHAR(21) NOT NULL,
  `user_id` INT NULL,
  `room_id` VARCHAR(21) NOT NULL,
  `time` BIGINT NOT NULL,
  UNIQUE(`user_id`, `room_id`),
  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`room_id`) REFERENCES `ChatRoom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Message` (
  `id` VARCHAR(21) NOT NULL,
  `parent_id` INT NULL,
  `user_id` INT NOT NULL,
  `room_id` VARCHAR(21) NULL,
  `time` BIGINT NOT NULL,
  `content` VARCHAR(2000) NULL,
  `likes` VARCHAR(4000) NULL,
  `updated_at` BIGINT NULL,
  INDEX(`time`),
  FOREIGN KEY (`room_id`) REFERENCES `ChatRoom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (`id`)
);

ALTER TABLE
  `Message`
ADD
  `date_time` VARCHAR(20) AS (
    DATE_FORMAT(
      FROM_UNIXTIME(LEFT(`time`, char_length(`time`) -3)),
      '%Y-%m-%d %H:%i:%s'
    )
  );



CREATE TABLE `MessageSeen` (
  `room_id` VARCHAR(21) NOT NULL,
  `user_id` INT NOT NULL,
  `last_seen_id` VARCHAR(21) NOT NULL,
  `time` BIGINT NOT NULL,
  FOREIGN KEY (`room_id`) REFERENCES `ChatRoom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`last_seen_id`) REFERENCES `Message`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE
  `MessageSeen`
ADD
  `date_time` VARCHAR(20) AS (
    DATE_FORMAT(
      FROM_UNIXTIME(LEFT(`time`, char_length(`time`) -3)),
      '%Y-%m-%d %H:%i:%s'
    )
  );

CREATE TABLE `MessageAttachment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `message_id` VARCHAR(21) NOT NULL,
  `attachment_id` VARCHAR(21) NOT NULL,
  FOREIGN KEY (`message_id`) REFERENCES `Message`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`attachment_id`) REFERENCES `Attachment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Transaction` (
  `id` VARCHAR(21) NOT NULL,
  `value` BIGINT,
  `date` BIGINT,
  `is_cash` BOOLEAN,
  `is_income` BOOLEAN,
  `sender` VARCHAR(50) NULL,
  `receiver` VARCHAR(50) NULL,
  `phone_number` VARCHAR(14) NULL,
  `note` VARCHAR(150),
  PRIMARY KEY (`id`)
);

CREATE TABLE `EventTransaction` (
  `event_id` VARCHAR(21) NOT NULL,
  `transaction_id` VARCHAR(21) NOT NULL,
  FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`transaction_id`) REFERENCES `Transaction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (`event_id`, `transaction_id`)
);

CREATE TABLE `TransactionAttachment` (
  `attachment_id` VARCHAR(21) NOT NULL,
  `transaction_id` VARCHAR(21) NOT NULL,
  FOREIGN KEY (`attachment_id`) REFERENCES `Attachment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`transaction_id`) REFERENCES `Transaction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY(`transaction_id`, `attachment_id`)
);

CREATE TABLE `PlaceAttachment` (
  `place_id` INT NOT NULL,
  `attachment_id` VARCHAR(21) NOT NULL,
  FOREIGN KEY (`place_id`) REFERENCES `Place`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`attachment_id`) REFERENCES `Attachment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);