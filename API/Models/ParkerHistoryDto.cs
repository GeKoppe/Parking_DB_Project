namespace API.Models;

public class ParkerHistoryDto
{
    public int Id { get; set; }
    public string Kennzeichen { get; set; }
    public DateTime EinfahrDatum { get; set; }
    public DateTime AusfahrDatum { get; set; }
    public bool IstDauerparker { get; set; }
    public double Kosten { get; set; }

    public ParkerHistoryDto(ParkerHistory parker, bool istDauerparker, double kosten)
    {
        Id = parker.Id;
        Kennzeichen = parker.Kennzeichen;
        EinfahrDatum = parker.EinfahrDatum;
        AusfahrDatum = parker.AusfahrDatum;
        IstDauerparker = istDauerparker;
        Kosten = kosten;
    }
}