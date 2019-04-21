CREATE TABLE [dbo].[holding] (
    [holding_id]    INT            IDENTITY (1, 1) NOT NULL,
    [holding_name]  NVARCHAR (255) NOT NULL,
    [weight]        DECIMAL (4, 3) NOT NULL,
    [fees_per_year] DECIMAL (5, 4) NOT NULL,
    [portfolio_id]  INT            NOT NULL,
    CONSTRAINT [PK_holding] PRIMARY KEY CLUSTERED ([holding_id] ASC),
    CONSTRAINT [FK_holding_portfolio] FOREIGN KEY ([portfolio_id]) REFERENCES [dbo].[portfolio] ([portfolio_id]) ON DELETE CASCADE ON UPDATE CASCADE
);

