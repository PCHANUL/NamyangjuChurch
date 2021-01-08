-- CreateTable
CREATE TABLE `bible_korHRV` (
    `book` INT NOT NULL,
    `chapter` INT NOT NULL,
    `verse` INT NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`book`,`chapter`,`verse`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
