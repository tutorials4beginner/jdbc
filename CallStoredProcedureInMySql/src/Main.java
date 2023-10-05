import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ParameterMetaData;

public class Main {
  public static void main(String[] args) throws Exception {
    Connection conn = getMySqlConnection();
    // Step-2: identify the stored procedure
    String simpleProc = "{ call simpleproc(?) }";
    // Step-3: prepare the callable statement
    CallableStatement cs = conn.prepareCall(simpleProc);
    // Step-4: register output parameters ...
    cs.registerOutParameter(1, java.sql.Types.INTEGER);
    // Step-5: execute the stored procedures: proc3
    cs.execute();
    // Step-6: extract the output parameters
    int param1 = cs.getInt(1);
    System.out.println("param1=" + param1);
    // Step-7: get ParameterMetaData
    ParameterMetaData pmeta = cs.getParameterMetaData();
    if (pmeta == null) {
      System.out.println("Vendor does not support ParameterMetaData");
    } else {
      System.out.println(pmeta.getParameterType(1));
    }
    conn.close();
  }

  private static Connection getHSQLConnection() throws Exception {
    Class.forName("org.hsqldb.jdbcDriver");
    System.out.println("Driver Loaded.");
    String url = "jdbc:hsqldb:data/tutorial";
    return DriverManager.getConnection(url, "sa", "");
  }

  public static Connection getMySqlConnection() throws Exception {
    String driver = "org.gjt.mm.mysql.Driver";
    String url = "jdbc:mysql://localhost/demo2s";
    String username = "oost";
    String password = "oost";

    Class.forName(driver);
    Connection conn = DriverManager.getConnection(url, username, password);
    return conn;
  }

  public static Connection getOracleConnection() throws Exception {
    String driver = "oracle.jdbc.driver.OracleDriver";
    String url = "jdbc:oracle:thin:@localhost:1521:caspian";
    String username = "mp";
    String password = "mp2";

    Class.forName(driver); // load Oracle driver
    Connection conn = DriverManager.getConnection(url, username, password);
    return conn;
  }
}
