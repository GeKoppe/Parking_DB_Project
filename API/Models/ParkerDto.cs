using System.Data.SqlClient;

namespace API.Models;

public class ParkerDto
{
    public int Id { get; set; }
    public string Kennzeichen { get; set; }
    public DateTime EinfahrDatum { get; set; }
    public DateTime? AusfahrDatum { get; set; }
    public bool IstDauerparker { get; set; }

    public ParkerDto()
    {
        
    }
    public ParkerDto(Parker parker, bool istDauerparker)
    {
        Id = parker.Id;
        Kennzeichen = parker.Kennzeichen;
        EinfahrDatum = parker.EinfahrDatum;
        IstDauerparker = istDauerparker;
    }
    
    public ParkerDto(ParkerHistory parker, bool istDauerparker)
    {
        Id = parker.Id;
        Kennzeichen = parker.Kennzeichen;
        EinfahrDatum = parker.EinfahrDatum;
        AusfahrDatum = parker.AusfahrDatum;
        IstDauerparker = istDauerparker;
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