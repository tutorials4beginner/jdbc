<%@ page import="java.lang.*"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.google.gson.*"%>
<%
	Integer rowToUpdate = -1;
	if (null != request.getParameter("id"))
	{
		try
		{
			rowToUpdate = Integer.parseInt(request.getParameter("id"));
		}
		catch (NumberFormatException nfe) {}
		{
		}		
	}
	String FirstName = request.getParameter("FirstName");
	String LastName = request.getParameter("LastName");
	String Title = request.getParameter("Title");
	String BirthDate = request.getParameter("BirthDate");
	//database connection
	// "jdbc:mysql://localhost:3306/northwind" - the database url of the form jdbc:subprotocol:subname
	Connection dbConnection = DriverManager.getConnection("jdbc:mysql://localhost:3306/northwind", "dbusername", "dbpassword");
	// update record in the database					
	String sql = "UPDATE employees SET FirstName=?, LastName=?, Title=?, BirthDate=? WHERE EmployeeID=?";
	PreparedStatement stmt = dbConnection.prepareStatement(sql);
	stmt.setString(1, FirstName);
	stmt.setString(2, LastName);
	stmt.setString(3, Title);
	stmt.setString(4, BirthDate);
	stmt.setInt(5, rowToUpdate);
			
	stmt.executeUpdate();
%>