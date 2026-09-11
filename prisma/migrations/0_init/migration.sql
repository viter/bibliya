-- CreateTable
CREATE TABLE `bibliya` (
    `id` INTEGER NOT NULL,
    `knyha` VARCHAR(100) NOT NULL,
    `rozdil` MEDIUMTEXT NOT NULL,
    `text` MEDIUMTEXT NOT NULL,
    `zavit` VARCHAR(255) NOT NULL DEFAULT 'sz',

    FULLTEXT INDEX `bibliya_text_idx`(`text`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `katehoriyi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `katehoriya` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tsytaty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `categoryid` INTEGER NOT NULL,
    `tsytata` MEDIUMTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(128) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `salt` VARCHAR(128) NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `typ` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

