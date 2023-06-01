CREATE OR ALTER PROCEDURE updateUserDetails(
	@userid VARCHAR(200), @username VARCHAR(100),
	@fullname VARCHAR(200), @email VARCHAR(150),
	@phonenumber INT, @password VARCHAR(250)
)
AS
BEGIN
	UPDATE Users SET 
		USERNAME=@username, 
		FULLNAME=@fullname, EMAIL=@email,
		PHONENUMBER=@phonenumber, UPASSWORD=@password
	WHERE USERID=@userid
END
