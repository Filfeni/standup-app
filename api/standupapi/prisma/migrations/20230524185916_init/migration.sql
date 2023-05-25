BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Standup] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [createdBy] INT NOT NULL,
    [disabled] BIT NOT NULL CONSTRAINT [Standup_disabled_df] DEFAULT 0,
    CONSTRAINT [Standup_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [auth0Id] NVARCHAR(250) NOT NULL,
    [email] NVARCHAR(255),
    [userName] NVARCHAR(255),
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[StandupUser] (
    [id] INT NOT NULL IDENTITY(1,1),
    [standupId] INT NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [StandupUser_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[StandupUpdate] (
    [id] INT NOT NULL IDENTITY(1,1),
    [wasDoing] NVARCHAR(4000),
    [willDo] NVARCHAR(4000),
    [blockers] NVARCHAR(4000),
    [createdDate] DATETIMEOFFSET NOT NULL,
    [modifiedDate] DATETIMEOFFSET,
    [missingInfo] BIT NOT NULL CONSTRAINT [StandupUpdate_missingInfo_df] DEFAULT 1,
    [disabled] BIT NOT NULL CONSTRAINT [StandupUpdate_disabled_df] DEFAULT 0,
    [standupUserId] INT NOT NULL,
    CONSTRAINT [StandupUpdate_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[StandupUser] ADD CONSTRAINT [StandupUser_standupId_fkey] FOREIGN KEY ([standupId]) REFERENCES [dbo].[Standup]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StandupUser] ADD CONSTRAINT [StandupUser_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[StandupUpdate] ADD CONSTRAINT [StandupUpdate_standupUserId_fkey] FOREIGN KEY ([standupUserId]) REFERENCES [dbo].[StandupUser]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
