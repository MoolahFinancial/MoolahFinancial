CREATE TABLE [dbo].[answer] (
    [answer_id]   INT            IDENTITY (1, 1) NOT NULL,
    [answer_text] NVARCHAR (MAX) NOT NULL,
    [question_id] INT            NOT NULL,
    CONSTRAINT [PK_answer] PRIMARY KEY CLUSTERED ([answer_id] ASC),
    CONSTRAINT [FK_answer_question] FOREIGN KEY ([question_id]) REFERENCES [dbo].[question] ([question_id]) ON DELETE CASCADE ON UPDATE CASCADE
);

