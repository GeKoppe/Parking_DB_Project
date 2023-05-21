using System.Data.SqlClient;

namespace API.Models;

public class LongTermParker
{
    public int Id { get; set; }
    public string Kennzeichen { get; set; }
    public string Vorname { get; set; }
    public string Nachname { get; set; }

    public static LongTermParker CreateFromReader(SqlDataReader reader)
    {
        return new LongTermParker()
        {
            // Id = (int)reader["Id"],
            Kennzeichen = (string)reader["Kennzeichen"],
            Vorname = (string)reader["Vorname"],
            Nachname = (string)reader["Nachname"]
        };
    }
}