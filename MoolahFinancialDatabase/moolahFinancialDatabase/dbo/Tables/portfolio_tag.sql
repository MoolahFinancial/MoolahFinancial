CREATE TABLE [dbo].[portfolio_tag] (
    [portfolio_id] INT NOT NULL,
    [tag_id]       INT NOT NULL,
    CONSTRAINT [PK_portfolio_tag] PRIMARY KEY CLUSTERED ([portfolio_id] ASC, [tag_id] ASC),
    CONSTRAINT [FK_portfolio_tag_portfolio] FOREIGN KEY ([portfolio_id]) REFERENCES [dbo].[portfolio] ([portfolio_id]) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT [FK_portfolio_tag_tag] FOREIGN KEY ([tag_id]) REFERENCES [dbo].[tag] ([tag_id]) ON UPDATE CASCADE
);

