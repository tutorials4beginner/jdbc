package com.eds.hms.dbcon;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConCallableStmt {

	static String driver = "oracle.jdbc.driver.OracleDriver";
	String jdbcUrl = "jdbc:oracle:thin:@localhost:1521:ORCL";
	String orauser = "scott";
	String password = "eds123";
	Connection conn = null;
	CallableStatement cstmt = null;

	static {
		try {
			Class.forName(driver).newInstance();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		System.out.println("Driver Loaded...");
	}

	public void execute(String proc) {

		try {
			conn = DriverManager.getConnection(jdbcUrl, orauser, password);
			cstmt = conn.prepareCall("{call " + proc);
			cstmt.setInt(1, 111111111);
			cstmt.registerOutParameter(2, java.sql.Types.VARCHAR);
			cstmt.execute();
			String empName = cstmt.getString(2);

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if (conn != null)
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
		}

	}
}
