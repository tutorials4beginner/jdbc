<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.google.gson.*"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<%
		// (A) database connection
		// "jdbc:mysql://localhost:3306/northwind" - the database url of the form jdbc:subprotocol:subname
		// "dbusername" - the database user on whose behalf the connection is being made
		// "dbpassword" - the user's password
		Connection dbConnection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root",
				"iltwat");
		// (B) retrieve necessary records from database
		Statement getFromDb = dbConnection.createStatement();
		ResultSet employees = getFromDb
				.executeQuery("SELECT EmployeeID, FirstName, LastName, Title, BirthDate FROM employees");
		// (C) format returned ResultSet as a JSON array
		JsonArray recordsArray = new JsonArray();
		while (employees.next()) {
			JsonObject currentRecord = new JsonObject();
			currentRecord.add("EmployeeID", new JsonPrimitive(employees.getString("EmployeeId")));
			currentRecord.add("FirstName", new JsonPrimitive(employees.getString("FirstName")));
			currentRecord.add("LastName", new JsonPrimitive(employees.getString("LastName")));
			currentRecord.add("Title", new JsonPrimitive(employees.getString("Title")));
			currentRecord.add("BirthDate", new JsonPrimitive(employees.getString("BirthDate")));
			recordsArray.add(currentRecord);
		}
		// (D)
		out.print(recordsArray);
		out.flush();
	%>
</body>
</html>