using System.Data.SqlClient;

namespace API.Models;

public class ParkerDto
{
    public int Id { get; set; }
    public string Kennzeichen { get; set; }
    public DateTime EinfahrDatum { get; set; }

    public ParkerDto()
    {
        
    }
    public ParkerDto(Parker parker)
    {
        Id = parker.Id;
        Kennzeichen = parker.Kennzeichen;
        EinfahrDatum = parker.EinfahrDatum;
    }
    
    public static ParkerDto CreateFromReader(SqlDataReader reader)
    {
        return new ParkerDto()
        {
            
            Id = (int)reader["Id"],
            Kennzeichen = (string)reader["Kennzeichen"],
            EinfahrDatum = (DateTime)reader["Einfahrtdatum"],
        };
    }
}