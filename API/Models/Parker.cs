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
        return new Parker()
        {
            Id = (int)reader["Id"],
            Kennzeichen = (string)reader["Kennzeichen"],
            EinfahrDatum = (DateTime)reader["Einfahrtdatum"],
            AusfahrDatum = (DateTime)reader["Ausfahrtdatum"]
        };
    }
}

public class PostParkerDto
{
    public int Parker_Id { get; set; }
    public int Lot_Id { get; set; }
}