using System.Data.SqlClient;

namespace API.Models;

public class Parker
{
    public int Id { get; set; }
    public string Kennzeichen { get; set; }
    public DateTime EinfahrDatum { get; set; }
    public DateTime? AusfahrDatum { get; set; }

    public static Parker CreateFromReader(SqlDataReader reader)
    {
        var ausfahrDatum = reader["Ausfahrtdatum"];

        return new Parker()
        {
            
            Id = (int)reader["Id"],
            Kennzeichen = (string)reader["Kennzeichen"],
            EinfahrDatum = (DateTime)reader["Einfahrtdatum"],
            AusfahrDatum = ausfahrDatum.GetType() == typeof(DBNull) ? null : (DateTime)ausfahrDatum
        };
    }
}