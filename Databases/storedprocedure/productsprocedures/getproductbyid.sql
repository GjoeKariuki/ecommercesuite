CREATE OR ALTER PROCEDURE getproductByid(@pid VARCHAR(200))
AS 
BEGIN
SELECT * FROM Products WHERE PID=@pid AND isDeleted=0
END
EXEC getproductByid '23423'