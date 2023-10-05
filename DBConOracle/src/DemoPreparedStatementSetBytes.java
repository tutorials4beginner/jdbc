import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class DemoPreparedStatementSetBytes {
	public static Connection getConnection() throws Exception {
		String driver = "org.gjt.mm.mysql.Driver";
		String url = "jdbc:mysql://localhost/databaseName";
		String username = "root";
		String password = "root";
		Class.forName(driver);
		Connection conn = DriverManager.getConnection(url, username, password);
		return conn;
	}

	public static void main(String[] args) throws Exception {
		byte[] shortData = "www.java2s.com".getBytes();
		byte[] longData = "www.java2s.com".getBytes();

		Connection conn = null;
		PreparedStatement pstmt = null;
		try {
			conn = getConnection();
			String query = "insert into bytes_table (id, short_data, long_data) values(?, ?, ?)";

			pstmt = conn.prepareStatement(query);
			pstmt.setString(1, "0001");
			pstmt.setBytes(2, shortData);
			pstmt.setBytes(3, longData);

			int rowCount = pstmt.executeUpdate();
			System.out.println("rowCount=" + rowCount);
		} finally {
			pstmt.close();
			conn.close();
		}
	}
}
