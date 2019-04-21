CREATE TABLE [dbo].[question] (
    [question_id]   INT            IDENTITY (1, 1) NOT NULL,
    [question_text] NVARCHAR (MAX) NOT NULL,
    [question_type] NVARCHAR (30)  NOT NULL,
    CONSTRAINT [PK_question] PRIMARY KEY CLUSTERED ([question_id] ASC)
);

