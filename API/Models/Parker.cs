using System.Data.SqlClient;

namespace API.Models;

public class Parker
{
    public int Id { get; set; }
    public string Kennzeichen { get; set; }
    public DateTime EinfahrDatum { get; set; }

    public static Parker CreateFromReader(SqlDataReader reader)
    {
        return new Parker()
        {
            
            Id = (int)reader["Id"],
            Kennzeichen = (string)reader["Kennzeichen"],
            EinfahrDatum = (DateTime)reader["Einfahrdatum"],
        };
    }
}