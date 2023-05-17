using System.Data.SqlClient;

namespace API.Models;

public class LongTermParkerDto
{
    public string Kennzeichen { get; set; }
    public string Vorname { get; set; }
    public string Nachname { get; set; }
    
    public static LongTermParkerDto CreateFromReader(SqlDataReader reader)
    {
        return new LongTermParkerDto()
        {
            Kennzeichen = (string)reader["Kennzeichen"],
            Vorname = (string)reader["Vorname"],
            Nachname = (string)reader["Nachname"]
        };
    }
}