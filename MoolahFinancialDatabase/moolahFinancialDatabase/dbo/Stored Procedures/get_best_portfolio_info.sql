
CREATE PROCEDURE [dbo].[get_best_portfolio_info]
@userID int
AS 
	SELECT TOP 1 [portfolio].[portfolio_id], COUNT (*) AS common_tags
	FROM (((([dbo].[user]
	LEFT JOIN [dbo].[user_tag]
	ON [user].user_id = [user_tag].user_id)
	LEFT JOIN [dbo].[tag]
	ON [user_tag].tag_id = [tag].tag_id)
	LEFT JOIN [dbo].[portfolio_tag]
	ON [tag].tag_id = [portfolio_tag].tag_id)
	LEFT JOIN [dbo].[portfolio]
	ON [portfolio_tag].portfolio_id = [portfolio].portfolio_id)
	WHERE [user].user_id = @userID
	GROUP BY [user_tag].tag_id, [portfolio].portfolio_id
	ORDER BY common_tags DESC;