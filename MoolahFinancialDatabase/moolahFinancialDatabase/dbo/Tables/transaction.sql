CREATE TABLE [dbo].[transaction] (
    [user_id]           INT      NOT NULL,
    [portfolio_id]      INT      NOT NULL,
    [transaction_id]    INT      IDENTITY (1, 1) NOT NULL,
    [investment_time]   DATETIME NOT NULL,
    [investment_amount] MONEY    NOT NULL,
    [is_sale]           BIT      NOT NULL,
    CONSTRAINT [PK_transaction] PRIMARY KEY CLUSTERED ([transaction_id] ASC),
    CONSTRAINT [FK_transaction_portfolio] FOREIGN KEY ([portfolio_id]) REFERENCES [dbo].[portfolio] ([portfolio_id]) ON UPDATE CASCADE,
    CONSTRAINT [FK_transaction_user] FOREIGN KEY ([user_id]) REFERENCES [dbo].[user] ([user_id]) ON UPDATE CASCADE
);

