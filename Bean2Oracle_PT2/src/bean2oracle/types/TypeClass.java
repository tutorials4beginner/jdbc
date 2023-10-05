package bean2oracle.types;

import java.sql.Array;
import java.sql.SQLData;
import java.sql.SQLException;
import java.sql.SQLInput;
import java.sql.SQLOutput;

/**
 * Learn to pass Java Bean Objects to a Oracle Procedure or Function
 * 
 * 
 */
public class TypeClass implements SQLData {
	public static final String ORACLE_OBJECT_NAME = "CLASS_TYPE";
	public static final String ORACLE_CLASS_ARRAY_NAME = "ARR_CLASS";

	private Long number;
	private String desc;
	private Array users;

	public String getSQLTypeName() throws SQLException {
		return ORACLE_OBJECT_NAME;
	}

	public void readSQL(SQLInput stream, String typeName) throws SQLException {
		setNumber(stream.readLong());
		setDesc(stream.readString());
		setUsers(stream.readArray());
	}

	public void writeSQL(SQLOutput stream) throws SQLException {
		stream.writeLong(getNumber());
		stream.writeString(getDesc());
		stream.writeArray(getUsers());
	}

	public Long getNumber() {
		return number;
	}

	public void setNumber(Long number) {
		this.number = number;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public Array getUsers() {
		return users;
	}

	public void setUsers(Array users) {
		this.users = users;
	}
}
