CREATE TABLE [dbo].[portfolio] (
    [portfolio_id]    INT             IDENTITY (1, 1) NOT NULL,
    [title]           NVARCHAR (255)  NOT NULL,
    [description]     NVARCHAR (MAX)  NULL,
    [created_at]      DATETIME        NOT NULL,
    [updated_at]      DATETIME        NOT NULL,
    [is_active]       BIT             CONSTRAINT [DF_portfolio_is_active] DEFAULT ((1)) NOT NULL,
    [is_deactivated]  BIT             CONSTRAINT [DF_portfolio_is_deactivated] DEFAULT ((0)) NOT NULL,
    [photo]           IMAGE           NULL,
    [expected_return] DECIMAL (18, 2) NOT NULL,
    [risk]            DECIMAL (18, 2) NOT NULL,
    CONSTRAINT [PK_portfolio] PRIMARY KEY CLUSTERED ([portfolio_id] ASC)
);

