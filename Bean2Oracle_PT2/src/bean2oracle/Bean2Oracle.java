package bean2oracle;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Map;

import oracle.jdbc.OracleTypes;
import bean2oracle.types.TypeClass;
import bean2oracle.types.TypeUser;

/**
 * Learn to pass Java Bean Objects to a Oracle Procedure or Function
 * 
 * 
 */
public class Bean2Oracle {

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		Connection connection = null;

		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			connection = DriverManager
					.getConnection("jdbc:oracle:thin:@127.0.0.1:1521:orcl",
							"user1", "iltwat");

			// Mapping necessary types
			Map<String, Class<?>> typeMaps = connection.getTypeMap();
			typeMaps.put(TypeUser.ORACLE_OBJECT_NAME, TypeUser.class);
			typeMaps.put(TypeClass.ORACLE_OBJECT_NAME, TypeClass.class);

			// TODO uncomment to test

			// insertUser(user, connection);

			/*
			 * TypeUser userQry = new TypeUser(); userQry.setName("Name");
			 * 
			 * selectUsers(userQry, connection);
			 */

			/*
			 * TypeClass classQry = new TypeClass(); classQry.setNumber(1L);
			 * 
			 * selectClasses(classQry, connection);
			 */

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			closeConnection(connection, null);
		}
	}

	/**
	 * Insert method
	 * 
	 * @param typeUser
	 *            - Object inserted in table
	 * @param conn
	 *            - Database connection
	 */
	private static void insertUser(TypeUser typeUser, Connection conn) {
		CallableStatement cs = null;
		try {
			cs = conn.prepareCall("{call PAC_BEAN.PRO_INSERT_USER(?)}");
			cs.setObject("usu", typeUser);
			cs.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			closeConnection(null, cs);
		}
	}

	/**
	 * Select method
	 * 
	 * @param typeUserQry
	 *            - Query object used to get information
	 * @param conn
	 *            - Database connection
	 */
	private static void selectUsers(TypeUser typeUserQry, Connection conn) {
		CallableStatement cs = null;
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");

		try {
			conn.getTypeMap().put(TypeUser.ORACLE_USER_ARRAY_NAME,
					TypeUser[].class);
			cs = conn.prepareCall("{call PAC_BEAN.PRO_SELECT_USER(?,?)}");
			cs.registerOutParameter("user_return", OracleTypes.ARRAY,
					TypeUser.ORACLE_USER_ARRAY_NAME);
			cs.setObject("usu", typeUserQry);
			cs.execute();
			
			Object[] array = (Object[]) cs.getArray("user_return").getArray();

			for (Object obj : array) {
				System.out.println("Name: " + ((TypeUser) obj).getName());
				System.out.println("Height: " + ((TypeUser) obj).getHeight());
				System.out.println("Birth: "
						+ sdf.format(((TypeUser) obj).getBirth()));
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			closeConnection(null, cs);
		}
	}

	public static void selectClasses(TypeClass classQry, Connection conn) {
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
		CallableStatement cs = null;

		try {
			conn.getTypeMap().put(TypeClass.ORACLE_CLASS_ARRAY_NAME,
					TypeClass[].class);
			conn.getTypeMap().put(TypeUser.ORACLE_USER_ARRAY_NAME,
					TypeUser[].class);

			cs = conn.prepareCall("{call PAC_BEAN.PRO_SELECT_CLASS(?,?)}");

			cs.registerOutParameter("class_return", OracleTypes.ARRAY,
					TypeClass.ORACLE_CLASS_ARRAY_NAME);

			cs.setObject("clas", classQry);

			cs.execute();

			Object[] array = (Object[]) cs.getArray("class_return").getArray();

			for (Object obj : array) {
				TypeClass objClass = ((TypeClass) obj);

				System.out.println("Description: " + objClass.getDesc());

				Object[] userArray = (Object[]) objClass.getUsers().getArray();
				for (Object user : userArray) {
					System.out
							.println("\tName: " + ((TypeUser) user).getName());
					System.out.println("\tHeight: "
							+ ((TypeUser) user).getHeight());
					System.out
							.println("\tBirth: "
									+ sdf.format(((TypeUser) user).getBirth())
									+ "\r\n");
				}
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			closeConnection(conn, cs);
		}
	}

	/**
	 * Close connection
	 * 
	 * @param conn
	 *            - Connection
	 * @param ps
	 *            - Prepared Statement
	 */
	private static void closeConnection(Connection conn, PreparedStatement ps) {
		try {
			if (ps != null) {
				ps.close();
			}
			if (conn != null) {
				conn.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
