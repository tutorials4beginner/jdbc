<%@ page import="java.lang.*"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.google.gson.*"%>
<%
	String FirstName = request.getParameter("FirstName");
	String LastName = request.getParameter("LastName");
	String Title = request.getParameter("Title");
	String BirthDate = request.getParameter("BirthDate");
	if (FirstName == null || LastName == null || Title == null || BirthDate == null)
		return;
	//database connection
	// "jdbc:mysql://localhost:3306/northwind" - the database url of the form jdbc:subprotocol:subname
	Connection dbConnection = DriverManager.getConnection("jdbc:mysql://localhost:3306/northwind", "dbusername", "dbpassword");
	// insert record into the database
	String sql = "INSERT INTO employees (FirstName, LastName, Title, BirthDate) VALUES (?, ?, ?, ?)";
	PreparedStatement stmt = dbConnection.prepareStatement(sql);
	stmt.setString(1, FirstName);
	stmt.setString(2, LastName);
	stmt.setString(3, Title);
	stmt.setString(4, BirthDate);
			
	stmt.executeUpdate();
	
	Statement selectStmt = dbConnection.createStatement();
	ResultSet resultSet = selectStmt.executeQuery("SELECT LAST_INSERT_ID() as 'LastId'");
	resultSet.next();
	String lastInsertId = resultSet.getString("LastId");
	out.print(lastInsertId);
	out.flush();
%>