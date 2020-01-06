import java.io.*;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Main {
    static String nlu = "data/nlu.md";
    static String stories = "data/stories.md";
    static String domain = "domain.yml";

    public static void main(String[] args) {
        List<List<String>> records = new ArrayList<>();
        try {
            BufferedReader br = new BufferedReader(new FileReader(args[0]));
            String line;
            while ((line = br.readLine()) != null) {
                String[] values = line.split(";");
                records.add(Arrays.asList(values));
            }

            BufferedWriter nluWriter = new BufferedWriter(new FileWriter(nlu, false));
            BufferedWriter storiesWriter = new BufferedWriter(new FileWriter(stories, false));
            BufferedWriter domainWriter = new BufferedWriter(new FileWriter(domain, false));

            domainWriter.write("intents:");
            boolean asd = true & false;

            for (int i = 0; i < records.size(); i++) {
                nluWriter.write("## intent:question" + i);
                nluWriter.newLine();
                nluWriter.write("- " + records.get(i).get(0));
                nluWriter.newLine();
                nluWriter.newLine();

                storiesWriter.write("## Story" + i);
                storiesWriter.newLine();
                storiesWriter.write("* question" + i);
                storiesWriter.newLine();
                storiesWriter.write("  - utter_answer" + i);
                storiesWriter.newLine();
                storiesWriter.newLine();


                domainWriter.newLine();
                domainWriter.write("  - question" + i);
            }

            domainWriter.newLine();
            domainWriter.newLine();
            domainWriter.write("actions:");
            for (int i = 0; i < records.size(); i++) {

                domainWriter.newLine();
                domainWriter.write("  - utter_answer" + i);
            }
            domainWriter.newLine();
            domainWriter.newLine();
            domainWriter.write("templates:");
            for (int i = 0; i < records.size(); i++) {
                domainWriter.newLine();
                domainWriter.write(" utter_answer" + i + ":");
                domainWriter.newLine();
                domainWriter.write("  - text: \"" + records.get(i).get(1).replaceAll("\"","'") + "\"");
                domainWriter.newLine();
            }
            nluWriter.close();
            storiesWriter.close();
            domainWriter.close();


        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
