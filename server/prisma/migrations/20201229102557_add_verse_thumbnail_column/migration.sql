-- AlterTable
ALTER TABLE `Post` ADD COLUMN     `thumbnail` VARCHAR(191) NOT NULL DEFAULT 'none',
    ADD COLUMN     `verse` VARCHAR(191) NOT NULL DEFAULT 'none';
