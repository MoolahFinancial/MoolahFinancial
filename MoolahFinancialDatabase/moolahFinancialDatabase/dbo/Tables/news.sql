CREATE TABLE [dbo].[news] (
    [portfolio_id]  INT            NOT NULL,
    [news_id]       INT            IDENTITY (1, 1) NOT NULL,
    [title]         NVARCHAR (255) NOT NULL,
    [time_of_story] DATETIME       NOT NULL,
    [author]        NVARCHAR (255) NOT NULL,
    [source]        NVARCHAR (255) NULL,
    [created_at]    DATETIME       NOT NULL,
    [updated_at]    DATETIME       NOT NULL,
    [article_url]   NVARCHAR (255) NULL,
    [content]       NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_news] PRIMARY KEY CLUSTERED ([news_id] ASC),
    CONSTRAINT [FK_news_portfolio] FOREIGN KEY ([portfolio_id]) REFERENCES [dbo].[portfolio] ([portfolio_id]) ON DELETE CASCADE ON UPDATE CASCADE
);

