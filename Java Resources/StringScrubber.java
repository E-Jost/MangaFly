public class StringScrubber
{
    public StringScrubber()
    {}

    public String removeQuotations(String cp)
    {
        if(cp.length() != 0)
        {
            if(cp.charAt(0) == '"' && cp.charAt(cp.length() - 1) == '"')
            {
                return cp.substring(1, cp.length() - 1);
            }
        }
        return cp;
    }

    public String getTag(String fName)
    {
        return getSeNum(fName) + getEpNum(fName);
    }

    private String getEpNum(String fName)
    {
        String episodeNum = "E00";
        for(int i = 0; i < fName.length(); i++)
        {
            if(fName.charAt(i) == 'E' || fName.charAt(i) == 'e')
            {
                if(i + 3 <= fName.length() - 1)
                {
                    if(isDigit(fName.charAt(i + 1)) && isDigit(fName.charAt(i + 2)))
                    {
                        episodeNum = fName.substring(i, i+3);
                    }
                }
            }
        }
        return episodeNum;
    }

    private String getSeNum(String fName)
    {
        String seasonNum = "S00";
        for(int i = 0; i < fName.length(); i++)
        {
            if(fName.charAt(i) == 'S' || fName.charAt(i) == 's')
            {
                if(i + 3 <= fName.length() - 1)
                {
                    if(isDigit(fName.charAt(i + 1)) && isDigit(fName.charAt(i + 2)))
                    {
                        seasonNum = fName.substring(i, i+3);
                    }
                }
            }
        }
        return seasonNum;
    }

    private boolean isDigit(char c)
    {
        int asciiVal = (int) c;
        if(asciiVal >= 48 && asciiVal <= 57)
        {
            return true;
        }
        return false;
    }

    public String getExtension(String fName)
    {
        String extension = "";
        for(int i = fName.length() - 1; i >= 0; i--)
        {
            if(fName.charAt(i) == '.')
            {
                extension = fName.substring(i);
                return extension;
            }
        }
        return extension;
    }
}