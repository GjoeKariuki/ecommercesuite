CREATE OR ALTER PROCEDURE deleteProduct(@pid VARCHAR(200))
AS 
BEGIN
UPDATE Products SET isDeleted=1 WHERE PID=@pid 
END

EXEC deleteProduct '234'