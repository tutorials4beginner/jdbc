package bean2oracle.types;

import java.sql.SQLData;
import java.sql.SQLException;
import java.sql.SQLInput;
import java.sql.SQLOutput;
import java.util.Date;

/**
 * Learn to pass Java Bean Objects to a Oracle Procedure or Function
 * 
 * 
 */
public class TypeUser implements SQLData {
	public static final String ORACLE_OBJECT_NAME = "USER_TYPE";
	public static final String ORACLE_USER_ARRAY_NAME = "ARR_USERS";

	private String name;
	private Float height;
	private Date birth;

	public TypeUser() {
		height = 0F;
	}

	public String getSQLTypeName() throws SQLException {
		return ORACLE_OBJECT_NAME;
	}

	public void readSQL(SQLInput stream, String typeName) throws SQLException {
		setName(stream.readString());
		setHeight(stream.readFloat());
		setBirth(stream.readDate());
	}

	public void writeSQL(SQLOutput stream) throws SQLException {
		stream.writeString(getName());
		stream.writeFloat(getHeight());
		stream.writeDate(getBirth() != null ? new java.sql.Date(getBirth()
				.getTime()) : null);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Float getHeight() {
		return height;
	}

	public void setHeight(Float height) {
		this.height = height;
	}

	public Date getBirth() {
		return birth;
	}

	public void setBirth(Date birth) {
		this.birth = new Date(birth.getTime());
	}
}
