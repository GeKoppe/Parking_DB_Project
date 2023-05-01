namespace API.Models;

public class NewParkerOutputDto
{
    public int Id{ get; set; }
    public bool Dauerparker { get; set; }
    public string? Vorname { get; set; }
    public string? Nachname { get; set; }
}