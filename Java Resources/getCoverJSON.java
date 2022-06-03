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

        String seriesPath = "C:/Users/ewanr/Desktop/manga project/Display/res/Series/Berserk";

        File seriesDir = new File(seriesPath);
        String[] volumes = seriesDir.list();

        volumes = removeJSONFile(volumes);

        Arrays.sort(volumes, new VolumeNameComparator());

        FileWriter myWriter = new FileWriter("covers.txt");
        /*
        for(int i = 0; i < volumes.length; i++)
        {
            System.out.println(volumes[i]);
        }
        */
        for(int i = 0; i < volumes.length; i++)
        {
            File vol = new File(seriesPath + "\\" + volumes[i]);
            String[] pages = vol.list();
            pages = removeJSONFile(pages);
            Arrays.sort(pages, new PageNameComparator());
            myWriter.write("\""+pages[0]+"\",\n");
        }

        myWriter.close();
    }

    private static String[] removeJSONFile(String[] list)
    {
        int numJSONFiles = 0;
        boolean[] isJSON = new boolean[list.length];

        for(int i = 0; i < list.length; i++)
        {
            String fileName = list[i];
            for(int x = fileName.length()-1; x > -1; x--)
            {
                if(fileName.charAt(x) == '.')
                {
                    if(fileName.substring(x).equals(".json"))
                    {
                        isJSON[i] = true;
                        numJSONFiles++;
                    }
                }
            }
        }

        String[] newList = new String[list.length - numJSONFiles];
        int newListIndex = 0;
        for(int i = 0; i < list.length; i++)
        {
            if(!isJSON[i])
            {
                newList[newListIndex] = list[i];
                newListIndex++;
            }
        }
        return newList;
    }
}

class VolumeNameComparator implements Comparator<String>
{
    public int compare(String s1, String s2)
    {
        if(getVolVal(s1) > getVolVal(s2))
        {
            return 1;
        }
        else if(getVolVal(s1) < getVolVal(s2))
        {
            return -1;
        }
        else
        {
            return 0;
        }
    }

    private int getVolVal(String v)
    {
        for(int i = v.length()-1; i > -1; i--)
        {
            if(v.charAt(i) == 'v')
            {
                return Integer.parseInt(v.substring(i + 1));
            }
        }
        return -1;
    }
}

class PageNameComparator implements Comparator<String>
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