CREATE OR ALTER PROCEDURE getUserByid(@userid VARCHAR(200))
AS
BEGIN
	SELECT * FROM Users WHERE USERID=@userid AND ISDELETED=0
END