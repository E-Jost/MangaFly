import java.util.Scanner;
import java.io.IOException;
import java.io.File;
import java.io.FileWriter;
import java.util.Arrays;
import java.util.Comparator;

public class getCoverJSON
{
    public static void main(String[]args) throws IOException
    {
        StringScrubber sc = new StringScrubber();

        String seriesPath = "C:/Users/ewanr/Desktop/MangaFly/res/Series/Berserk";

        File seriesDir = new File(seriesPath);
        String[] volumes = seriesDir.list();

        Arrays.sort(volumes, new FileNameComparator());

        FileWriter myWriter = new FileWriter("filename.txt");

        for(int i = 0; i < volumes.length; i++)
        {
            System.out.println(volumes[i]);
        }

        for(int i = 0; i < volumes.length; i++)
        {
            File vol = new File(seriesPath + "\\" + volumes[i]);
            String[] pages = vol.list();
            //Arrays.sort(pages, new FileNameComparator());
            myWriter.write("\""+pages[1]+"\",\n");
        }

        myWriter.close();
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
            //System.out.println(s.charAt(i) + " " + i);
            //System.out.println(s.charAt(i) == '.');
            if(s.charAt(i) == '.')
            {
                periodInd = i;
            }
            if(s.charAt(i) == '-')
            {
                dashInd = i + 1;
                //System.out.println(s + " " + dashInd + " " + periodInd);
                return Integer.parseInt(s.substring(dashInd, periodInd));
            }
        }
        return -1;
    }
}