CREATE TABLE [dbo].[tag] (
    [tag_id]   INT            IDENTITY (1, 1) NOT NULL,
    [tag_name] NVARCHAR (255) NOT NULL,
    CONSTRAINT [PK_tag] PRIMARY KEY CLUSTERED ([tag_id] ASC)
);

