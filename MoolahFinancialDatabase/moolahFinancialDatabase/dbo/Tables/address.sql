CREATE TABLE [dbo].[address] (
    [user_id]            INT            NOT NULL,
    [address_id]         INT            IDENTITY (1, 1) NOT NULL,
    [first_line]         NVARCHAR (255) NOT NULL,
    [second_line]        NVARCHAR (255) NULL,
    [suite_number]       NVARCHAR (255) NULL,
    [city]               NVARCHAR (255) NOT NULL,
    [state]              NCHAR (2)      NOT NULL,
    [postal_code]        NVARCHAR (10)  NOT NULL,
    [is_deactivated]     BIT            CONSTRAINT [DF_address_is_deactivated] DEFAULT ((0)) NOT NULL,
    [is_primary_address] BIT            CONSTRAINT [DF_primary_address] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_address] PRIMARY KEY CLUSTERED ([address_id] ASC),
    CONSTRAINT [FK_address_user] FOREIGN KEY ([user_id]) REFERENCES [dbo].[user] ([user_id]) ON UPDATE CASCADE
);

