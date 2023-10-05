<%@ page import="java.sql.*,java.io.*,java.util.*"%>
<HTML>
<HEAD>
<TITLE>Download Images</TITLE>
</HEAD>

<BODY>
	<br>
	<br>
	<table align="center" border=0 width="200px">
		<tr>
			<td colspan=2 align="center"><b>Download Images</b></td>
		</tr>
		<tr>
			<td colspan=2></td>
		</tr>
		<%
			String connectionURL = "jdbc:mysql://localhost:3306/test";
			Connection con = null;
			try {
				Class.forName("com.mysql.jdbc.Driver").newInstance();
				con = DriverManager
						.getConnection(connectionURL, "root", "root");
				Statement stmt = con.createStatement();
				String strQuery = "select id from image";
				ResultSet rs = stmt.executeQuery(strQuery);
				while (rs.next()) {
		%>
		<tr style="background-color: #efefef;">
			<td><%=rs.getInt(1)%></td>
			<td><a href="images.jsp?imgid=<%=rs.getInt(1)%>"> <img
					src="images.jsp?imgid=<%=rs.getInt(1)%>" width="50" height="50">
			</a></td>
		</tr>
		<%
			}
				rs.close();
				con.close();
				stmt.close();
			} catch (Exception e) {
				e.getMessage();
			}
		%>
	</table>
</BODY>
</HTML>