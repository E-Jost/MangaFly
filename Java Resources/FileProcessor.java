import java.io.IOException;
import java.util.Scanner;
import java.io.File;
import java.io.FileWriter;

public class FileProcessor
{
    public static void main(String[]args) throws IOException
    {
        Scanner in = new Scanner(System.in);

        System.out.println("Specify path to folder containing files to be processed:");

        processAll(in.nextLine());
    }

    //processes all volumes in a directory
    public static void processAll(String dirPath) throws IOException
    {
        StringScrubber sc = new StringScrubber();
        String path = sc.removeQuotations(dirPath);

        File fileDir = new File(path);
        String[] volumes = fileDir.list();

        for(int i = 0; i < volumes.length; i++)
        {
            processVolume(path + "\\" + volumes[i]);
        }
    }

    //processes a single volume by renaming all pages and generating JSON
    public static void processVolume(String sourcePath) throws IOException
    {
        StringScrubber sc = new StringScrubber();
        String path = sc.removeQuotations(sourcePath);

        File sourceDir = new File(path);
        String[] files = sourceDir.list();

        String title = getTitle(path);

        FileWriter myWriter = new FileWriter(title + ".json");

        myWriter.write("{\n");
        myWriter.write("\"" + "name" + "\": " + "\"" + title + "\"" + ",\n");
        myWriter.write("\"" + "numPages" + "\": " + (files.length) + ",\n");
        myWriter.write("\"" + "pages" + "\"" + ": [\n");

        for(int i = 0; i < files.length; i++)
        {
            File sFile = new File(path + "\\" + files[i]);
            String fileName = title + "-" + i + sc.getExtension(files[i]);
            sFile.renameTo(new File(path + "\\" + fileName));

            if(i == files.length - 1)
            {
                myWriter.write("\"" + fileName + "\"\n");
            }
            else
            {
                myWriter.write("\"" + fileName + "\",\n");
            }
            
        }

        myWriter.write("]\n");
        myWriter.write("}\n");

        myWriter.close();
    }

    private static String getTitle(String path)
    {
        for(int i = path.length() - 1; i > -1; i--)
        {
            if(path.charAt(i) == '\\')
            {
                return path.substring(i + 1);
            }
        }
        return "Error";
    }
}