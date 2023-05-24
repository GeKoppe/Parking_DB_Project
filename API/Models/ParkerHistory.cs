using System.Data.SqlClient;

namespace API.Models;

public class ParkerHistory
{
    public int Id { get; set; }
    public string Kennzeichen { get; set; }
    public DateTime EinfahrDatum { get; set; }
    public DateTime AusfahrDatum { get; set; }
    
    public static ParkerHistory CreateFromReader(SqlDataReader reader)
    {
        return new ParkerHistory()
        {
            Id = (int)reader["Id"],
            Kennzeichen = (string)reader["Kennzeichen"],
            EinfahrDatum = (DateTime)reader["Einfahrdatum"],
            AusfahrDatum = (DateTime)reader["Ausfahrdatum"],
        };
    }
}