/*
  Warnings:

  - A unique constraint covering the columns `[auth0Id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accepted` to the `StandupUser` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Standup] ALTER COLUMN [description] NVARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE [dbo].[StandupUser] ADD [accepted] BIT NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_auth0Id_key] UNIQUE NONCLUSTERED ([auth0Id]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
