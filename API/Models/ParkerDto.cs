using System.Data.SqlClient;

namespace API.Models;

public class ParkerDto
{
    public int Id { get; set; }
    public string Kennzeichen { get; set; }
    public DateTime EinfahrDatum { get; set; }
    public DateTime AusfahrDatum { get; set; }
    public bool IstDauerparker { get; set; }
    public double Kosten { get; set; }

    public ParkerDto()
    {
        
    }
    public ParkerDto(Parker parker, bool istDauerparker)
    {
        Id = parker.Id;
        Kennzeichen = parker.Kennzeichen;
        EinfahrDatum = parker.EinfahrDatum;
        AusfahrDatum = parker.EinfahrDatum;
        IstDauerparker = istDauerparker;
    }
    
    public ParkerDto(ParkerHistory parker, bool istDauerparker, double kosten)
    {
        Id = parker.Id;
        Kennzeichen = parker.Kennzeichen;
        EinfahrDatum = parker.EinfahrDatum;
        AusfahrDatum = parker.AusfahrDatum;
        IstDauerparker = istDauerparker;
        Kosten = kosten;
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