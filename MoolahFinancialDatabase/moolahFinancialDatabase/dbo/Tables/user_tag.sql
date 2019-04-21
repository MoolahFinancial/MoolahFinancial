CREATE TABLE [dbo].[user_tag] (
    [user_id]         INT            NOT NULL,
    [tag_id]          INT            NOT NULL,
    [question_text]   NVARCHAR (255) NOT NULL,
    [question_answer] NVARCHAR (255) NULL,
    CONSTRAINT [PK_user_tag] PRIMARY KEY CLUSTERED ([user_id] ASC, [tag_id] ASC, [question_text] ASC),
    CONSTRAINT [FK_user_tag_tag] FOREIGN KEY ([tag_id]) REFERENCES [dbo].[tag] ([tag_id]) ON UPDATE CASCADE,
    CONSTRAINT [FK_user_tag_user] FOREIGN KEY ([user_id]) REFERENCES [dbo].[user] ([user_id]) ON UPDATE CASCADE
);

