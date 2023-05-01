using System.Data.SqlClient;

namespace API.Models;

public class Parker
{
    public int Id { get; set; }
    public string Kennzeichen { get; set; }
    public bool Dauerparker { get; set; }
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

public class NewParkerOutputDto
{
    public int Parker_Id { get; set; }
    public int Lot_Id { get; set; }
}