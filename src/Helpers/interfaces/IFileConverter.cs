namespace KalkulatorWILKS.Helpers.interfaces;

public interface IFileConverter
{
    Task<byte[]> ConvertToByteAsync(IFormFile file, CancellationToken ct);
    IFormFile ConvertToFile(byte[] byteArr, string title, string fileName);
}