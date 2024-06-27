-- DropForeignKey
ALTER TABLE `userinfo` DROP FOREIGN KEY `UserInfo_userId_fkey`;

-- AddForeignKey
ALTER TABLE `UserInfo` ADD CONSTRAINT `UserInfo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
