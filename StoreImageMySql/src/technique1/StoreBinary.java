package technique1;
/*
 * Binary data is stored and retrieved from the database 
 * using streams in connection with prepared statements and resultsets. 
 * This minimal application stores an image file in the database, 
 * then it retrieves the binary data from the database and 
 * converts it back to an image.
 * */

import java.sql.*;
import java.io.*;
import java.awt.*;
import java.awt.Image;

/**
 * Storing and retrieving images from a MySQL database
 */
public class StoreBinary {
	private static String driverName = "sun.jdbc.odbc.JdbcOdbcDriver";
	private Statement stmt = null;
	private Connection conn = null;

	public StoreBinary() {
	}

	/**
	 * Strips path prefix from filenames
	 * 
	 * @param fileName
	 * @return the base filename
	 */
	public static String getBaseName(String fileName) {
		int ix = fileName.lastIndexOf("");
		if (ix < 0)
			return fileName;
		return fileName.substring(ix + 1);
	}

	/**
	 * Store a binary (image) file in the database using a prepared statement.
	 * 
	 * @param fileName
	 * @return true if the operation succeeds
	 * @throws Exception
	 */
	public boolean storeImageFile(String fileName) throws Exception {
		if (!connect("test", "root", "")) {
			return false;
		}

		FileInputStream in = new FileInputStream(fileName);
		int len = in.available();
		String baseName = StoreBinary.getBaseName(fileName);
		PreparedStatement pStmt = conn
				.prepareStatement("insert into image_tab values (?,?,?)");
		pStmt.setString(1, baseName);
		pStmt.setInt(2, len);
		pStmt.setBinaryStream(3, in, len);
		pStmt.executeUpdate();
		in.close();
		System.out.println("Stored: " + baseName + ", length: " + len);
		return true;
	}

	/**
	 * Retrieve the biary file data from the DB and convert it to an image
	 * 
	 * @param fileName
	 * @return
	 * @throws Exception
	 */
	public Image getImageFile(String fileName) throws Exception {
		String baseName = StoreBinary.getBaseName(fileName);
		ResultSet rs = stmt
				.executeQuery("select * from image_tab where image_name='"
						+ baseName + "'");
		if (!rs.next()) {
			System.out.println("Image:" + baseName + " not found");
			return null;
		}
		int len = rs.getInt(2);

		byte[] b = new byte[len];
		InputStream in = rs.getBinaryStream(3);
		int n = in.read(b);
		System.out.println("n: " + n);
		in.close();
		Image img = Toolkit.getDefaultToolkit().createImage(b);
		System.out
				.println("Image: " + baseName + " retrieved ok, size: " + len);
		return img;
	}

	/**
	 * Establish database connection
	 * 
	 * @param dbName
	 * @param dbUser
	 * @param dbPassword
	 * @return true if the operation succeeds
	 */
	public boolean connect(String dbName, String dbUser, String dbPassword) {
		try {
			Class.forName(driverName);
		} catch (ClassNotFoundException ex) {
			ex.printStackTrace();
			return false;
		}
		try {
			conn = DriverManager.getConnection("jdbc:odbc:" + dbName, dbUser,
					dbPassword);
			stmt = conn.createStatement();
		} catch (SQLException ex1) {
			ex1.printStackTrace();
			return false;
		}
		return true;
	}

	/******************************************
	 * MAIN stub driver for testing the class.
	 */
	public static void main(String[] args) {
		String fileName = "c:\\mpf128.jpg";
		StoreBinary sb = new StoreBinary();
		try {
			if (sb.storeImageFile(fileName)) {
				// stored ok, now get it back again
				Image img = sb.getImageFile(fileName);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}
