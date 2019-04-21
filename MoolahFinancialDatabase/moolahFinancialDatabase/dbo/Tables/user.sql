CREATE TABLE [dbo].[user] (
    [user_id]                     INT            IDENTITY (1, 1) NOT NULL,
    [first_name]                  NVARCHAR (255) NOT NULL,
    [middle_name]                 NVARCHAR (255) NULL,
    [last_name]                   NVARCHAR (255) NOT NULL,
    [email]                       NVARCHAR (255) NOT NULL,
    [password]                    NVARCHAR (255) NOT NULL,
    [date_of_birth]               DATETIME       NULL,
    [citizenship]                 NVARCHAR (255) NULL,
    [notification_preference]     INT            CONSTRAINT [DF_user_notification_preference] DEFAULT ((1)) NOT NULL,
    [ssn]                         INT            NULL,
    [primary_phone]               NVARCHAR (30)  NULL,
    [secondary_phone]             NVARCHAR (30)  NULL,
    [is_deactivated]              BIT            CONSTRAINT [DF_user_is_deactivated] DEFAULT ((0)) NOT NULL,
    [email_is_validated]          BIT            CONSTRAINT [DF_email_is_validated] DEFAULT ((0)) NOT NULL,
    [has_completed_questionnaire] BIT            CONSTRAINT [DF_has_completed_questionnaire] DEFAULT ((0)) NOT NULL,
    [risk]                        DECIMAL (2, 2) NULL,
    CONSTRAINT [PK_user] PRIMARY KEY CLUSTERED ([user_id] ASC),
    CONSTRAINT [AK_user_email] UNIQUE NONCLUSTERED ([email] ASC)
);

