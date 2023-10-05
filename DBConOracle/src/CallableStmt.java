import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;


public class CallableStmt {
	public static void main(String[] args) throws Exception {
	    String driver = "oracle.jdbc.driver.OracleDriver";
	    Class.forName(driver).newInstance();
	    System.out.println("Connecting to database...");
	    String jdbcUrl = "jdbc:oracle:thin:@localhost:1521:ORCL";
	    Connection conn = DriverManager.getConnection(jdbcUrl, "yourName", "mypwd");
	    CallableStatement cstmt = conn.prepareCall("{call getEmpName (?,?)}");
	    cstmt.setInt(1, 111111111);
	    cstmt.registerOutParameter(2, java.sql.Types.VARCHAR);
	    cstmt.execute();
	    String empName = cstmt.getString(2);
	    System.out.println(empName);
	    conn.close();
	}
}
