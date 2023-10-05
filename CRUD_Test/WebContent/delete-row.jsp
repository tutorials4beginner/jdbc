<%@ page import="java.lang.*"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.google.gson.*"%>
<%
	Integer rowToDelete = -1;
	if (null != request.getParameter("row"))
	{
		try
		{
			rowToDelete = Integer.parseInt(request.getParameter("row"));
		}
		catch (NumberFormatException nfe) {}
		{
		}		
	}
	
	//database connection
	// "jdbc:mysql://localhost:3306/northwind" - the database url of the form jdbc:subprotocol:subname
	Connection dbConnection = DriverManager.getConnection("jdbc:mysql://localhost:3306/northwind", "dbusername", "dbpassword");
	// delete specified record from the database
	String sql = "DELETE FROM employees WHERE EmployeeID = ?";
	PreparedStatement stmt = dbConnection.prepareStatement(sql);
	stmt.setInt(1, rowToDelete);
			
	stmt.executeUpdate();
	
%>