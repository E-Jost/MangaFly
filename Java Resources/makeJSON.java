import java.util.Scanner;
import java.io.IOException;
import java.io.File;
import java.io.FileWriter;
import java.util.Arrays;
import java.util.Comparator;

public class makeJSON
{
    public static void main(String[]args) throws IOException
    {
        Scanner in = new Scanner(System.in);

        System.out.println("Source Path:");

        StringScrubber sc = new StringScrubber();
        String path = sc.removeQuotations(in.nextLine());
        File sourceDir = new File(path);
        String[] files = sourceDir.list();

        String title = getTitle(path);
        System.out.println(title);

        Arrays.sort(files, new FileNameComparator());

        FileWriter myWriter = new FileWriter(title + ".json");

        myWriter.write("{\n");
        myWriter.write("\"" + "name" + "\": " + "\"" + title + "\"" + ",\n");
        myWriter.write("\"" + "numPages" + "\": " + (files.length - 1) + ",\n");
        myWriter.write("\"" + "pages" + "\"" + ": [\n");
        for(int i = 0; i < files.length - 1; i++)
        {
            myWriter.write("\""+files[i]+"\",\n");
        }
        myWriter.write("\""+files[files.length - 1]+"\"\n");
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

class FileNameComparator implements Comparator<String>
{
    public int compare(String s1, String s2)
    {
        if(getNumVal(s1) > getNumVal(s2))
        {
            return 1;
        }
        else if(getNumVal(s1) < getNumVal(s2))
        {
            return -1;
        }
        else
        {
            return 0;
        }
    }

    public int getNumVal(String s)
    {
        int periodInd = 0;
        int dashInd = 0;
        for(int i = s.length()-1; i > -1; i--)
        {
            if(s.charAt(i) == '.')
            {
                periodInd = i;
            }
            if(s.charAt(i) == '-')
            {
                dashInd = i + 1;
                return Integer.parseInt(s.substring(dashInd, periodInd));
            }
        }
        return -1;
    }
}