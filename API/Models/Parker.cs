namespace API.Models;

public class Parker
{
    public int Id { get; set; }
    public string Kennzeichen { get; set; }
    public DateTime EinfahrDatum { get; set; }
    public DateTime? AusfahrDatum { get; set; }
}