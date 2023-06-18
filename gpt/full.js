require("dotenv").config({path: ".env"});
const { Configuration, OpenAIApi } = require("openai");
const { saveOutput, shuffle } = require('../utils.js');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const get_names = (num = 1) => {
  const names = ["Emilia","Hannah","Mia","Sophia","Emma","Charlotte","Mila","Maja","Clara","Ella","Mathilda","Lea","Anna","Frieda","Lina","Emily","Lilly","Mira","Sarah","Lia","Lara","Leonie","Sophie","Ida","Alma","Juna","Maria","Leni","Marie","Nora","Amelie","Lena","Luisa","Olivia","Helena","Johanna","Zoe","Ava","Luna","Elisa","Liya","Paula","Mina","Victoria","Elena","Carla","Mara","Carlotta","Luise","Romy","Laura","Marlene","Nele","Eva","Alina","Tilda","Julia","Leyla","Amalia","Mariam","Merle","Martha","Amira","Hailey","Isabella","Antonia","Cleo","Aaliyah","Jasmin","Lotta","Elisabeth","Rosa","Amelia","Alva","Melina","Pauline","Malia","Ayla","Elina","Lisa","Zeynep","Ruby","Elif","Ela","Rosalie","Ada","Stella","Josephine","Ronja","Elli","Thea","Finja","Flora","Medina","Isabell","Livia","Fiona","Paulina","Nina","Freya","Valentina","Aurelia","Lucy","Malina","Laila","Melissa","Liv","Arya","Helene","Meryem","Kaja","Malou","Alicia","Yara","Theresa","Nisa","Lucia","Mayla","Amina","Anastasia","Anni","Edda","Pia","Alexandra","Azra","Fatima","Kira","Marla","Thalia","Linda","Lotte","Malea","Lana","Lola","Aurora","Chiara","Alia","Anouk","Jana","Milena","Diana","Aleyna","Elin","Selma","Liana","Elise","Alice","Wilma","Juli","Lou","Milla","Katharina","Nala","Annabell","Asya","Melek","Miriam","Alea","Mona","Amy","Emmi","Liyana","Luana","Nika","Fritzi","Hedi","Lilith","Linnea","Philippa","Dalia","Zoey","Liliana","Alisa","Amilia","Annika","Cataleya","Elea","Eliana","Malak","Layan","Mariella","Aylin","Celine","Emely","Lilia","Minna","Milana","Sena","Tara","Hilda","Daria","Felina","Toni","Juno","Leia","Lynn","Ylvi","Noah","Valerie","Evelyn","Janna","Samira","Ariana","Ivy","Jenny","Magdalena","Mathea","Naomi","Nayla","Alessia","Elsa","Esther","Helin","Aisha","Maira","Mathilde","Valeria","Zümra","Alissa","Asel","Käthe","Lene","Melia","Tessa","Carolina","Dua","Eda","Greta","Lilian","Luca","Masal","Noemi","Tala","Eleni","Hira","Nour","Adriana","Bella","Eleonora","Rebecca","Runa","Leona","Nila","Zehra","Amara","Helen","Hedda","Mika","Nela","Nia","Ophelia","Zarah","Amaya","Defne","Pina","Selin","Vanessa","Celina","Henriette","Jette","Liara","Miray","Smilla","Ellen","Esma","Leonora","Letizia","Melisa","Natalie","Nelly","Tuana","Adelina","Lieselotte","Selina","Melody","Rose","Angelina","Esila","Gloria","Jade","Larissa","Nadia","Nicole","Sila","Alba","Carina","Jolina","Jonna","Naya","Cara","Heidi","Ilayda","Jasmina","Neyla","Philine","Svea","Vivien","Wanda","Amal","Amanda","Carolin","Cecilia","Eliz","Feline","Giulia","Narin","Ruth","Florentine","Friederike","Hafsa","Hayat","Iva","Jamila","Lavin","Lore","Nilay","Tabea","Zahra","Bianca","Cosima","Enna","Evin","Felicitas","Leana","Liva","Lorena","Mascha","Tamara","Vera","Aya","Elissa","Felicia","Grace","Iris","Jolie","Malika","Malin","Nura","Skadi","Zora","Alena","Celia","Coco","Eliza","Jael","Lydia","Raya","Rita","Sonja","Ylva","Chloe","Ecrin","Hazal","Leandra","Madita","Milou","Nola","Palina","Theodora","Alara","Clea","Eleanor","Fenja","Iman","Khadija","Masa","Nike","Tina","Veronika","Alin","Amar","Charlie","Elizabeth","Joana","Layal","Luzie","Nova","Penelope","Yaren","Eslem","Gerda","Lamis","Larin","Lila","Lisbeth","Marlena","Mavi","Safiya","Selena","Sidra","Abigail","Aurelie","Dilara","Evelina","Holly","Lilou","Maliya","Meva","Nefes","Salma","Shirin","Tamina","Tasnim","Anisa","Erika","Fatma","Franka","Hermine","Joleen","Laya","Lenja","Lilo","Liz","Lorin","Nehir","Pola","Polly","Ria","Viola","Wilhelmine","Angela","Anita","Annelie","Arina","Dora","Elaine","Jennifer","Jona","Kalea","Kiana","Kim","Leen","Leonore","Manessa","Marleen","Melis","Michelle","Minel","Rüya","Salome","Xenia","Ajla","Asiya","Asmin","Camilla","Eleyna","Emine","Huda","Irma","Natalia","Rahel","Sienna","Sina","Talin","Zahraa","An","Beatrice","Cassandra","Edith","Fiene","Havin","Ikra","Janne","Jessica","June","Kimberly","Margarete","Marina","Melanie","Millie","Noura","Rayan","Sama","Sare","Adele","Agnes","Almira","Anastasija","Astrid","Ayliz","Chloé","Christina","Dana","Dorothea","Dunya","Emilija","Gabriella","Hanne","Inaya","Jella","Kayla","Lani","Lua","Lucía","Lujain","Miley","Minh","Naima","Stefania","Tiana","Una","Yagmur","Yusra","Agatha","Ayana","Ayat","Carmen","Eleonore","Eloise","Enya","Esra","Mai","Maxima","Miral","Rania","Rhea","Samantha","Taly","Mohammed","Noah","Leon","Matteo","Elias","Emil","Louis","Adam","Oskar","Henry","Liam","Finn","Karl","Luca","Lukas","Paul","Theodor","Anton","Leo","Levi","Felix","Jakob","Theo","Maximilian","Milan","Jonas","Ben","Alexander","David","Ali","Arthur","Jona","Jannis","Jonathan","Milo","Raphael","Moritz","Aaron","Leonard","Malik","Erik","Max","Lio","Bruno","Linus","Samuel","Daniel","Mika","Benjamin","Philipp","Joshua","Julius","Johann","Adrian","Amir","Hamza","Julian","Carlo","Frederik","Valentin","Mats","Gabriel","Vincent","Konstantin","Maxim","Tim","Niklas","Ilyas","Toni","Yasin","Bela","Fritz","Omar","Emilio","Lennard","Edgar","Levin","Ibrahim","Viktor","Friedrich","Yusuf","Jan","Miran","Mattis","Tom","Leonardo","Lian","Nicolas","Ole","Jasper","Rio","Kilian","Kian","Marc","Charlie","Fabian","Jannik","Till","Aras","Fiete","Oliver","Caspar","Hasan","Arian","Enno","Leopold","Ahmad","Simon","Ayaz","Luan","Emir","Pepe","Justus","Dennis","Gustav","Marlon","Hugo","Lasse","Nils","Leander","Luke","Malte","Nico","Robin","Elio","Alex","Elian","Ömer","Aiden","Mustafa","Youssef","August","Matti","Jonte","Michael","Juri","Musa","Ludwig","William","Damian","Joris","Mert","Nathan","Ahmet","Florian","Sam","Mehmet","Janosch","Martin","Rayan","Younes","Neo","Nino","Piet","Yunus","Ferdinand","Richard","Noel","Otto","Josef","Elia","Franz","Jaron","Mio","Albert","Emilian","Hannes","John","Lino","Dean","Ilay","Mahir","Mikail","Benedikt","Hussein","Jayden","Joel","Karim","Leano","Lennox","Antonio","Christian","Issa","Nael","Timo","Lias","Can","Eddy","Dominik","Jakub","Nikita","Sebastian","Benno","Johannes","Kaan","Lion","Mirac","Willi","Mailo","Ryan","Alfred","Matthias","Abdullah","Colin","Diego","Kevin","Khaled","Konrad","Emanuel","Jamal","Bennet","Jamie","Jascha","Lionel","Nikolai","Bilal","Kiyan","Magnus","Thomas","Alessio","Henrik","Ivan","Jari","Kai","Lenny","Mahmoud","Otis","Tristan","Zayn","Eymen","James","Jaro","Keno","Malek","Minh","Stefan","Tobias","Jannes","Nick","Connor","Ian","Silas","Tiago","Georg","Isa","Wilhelm","Alan","Bo","Enes","Sami","Taha","Yahya","Ari","Finley","Lijan","Louie","Marten","Thore","Lev","Robert","Umut","Anthony","Johnny","Junis","Kalle","Marlo","Phil","Salih","Thilo","Adem","Elijah","Jad","Timur","Vito","Armin","Idris","Joscha","Kasimir","Alparslan","Elliot","Hadi","Jack","Kerem","Ruben","Ensar","Ismail","Jibril","Karam","Kuzey","Marco","Wim","Yigit","Amar","Antoni","Arne","Leonidas","Taim","Cosmo","Janne","Markus","Matei","Taavi","Tyler","Amin","Azad","Merlin","Miro","Nelio","Pablo","Titus","Alwin","Hans","Kolja","Kuno","Lars","Leandro","Manuel","Samir","Eli","Emin","Eren","Miron","Peter","Valentino","Darius","Efe","Hendrik","Jason","Mikael","Selim","Aziz","Carlos","Ethan","Hanno","Hektor","Lou","Mahdi","Marcel","Noam","Abdul","Dion","Dylan","Mael","Osman","Tammo","Tino","Avi","Jordan","Kurt","Tommi","Abbas","Alvar","Arvid","Kadir","Miles","Berat","Brian","Gregor","Lorenz","Batuhan","Bjarne","Clemens","Harry","Henning","Isaac","Khalil","Lorenzo","Marvin","Miko","Nevio","Nuri","Ragnar","Andy","Baran","Casper","Darian","Dario","Enzo","Jonne","Lean","Leif","Nathaniel","Roman","Rudi","Santiago","Alessandro","Anas","Andreas","Aslan","Jano","Julien","Mirza","Quinn","Zain","Arda","Christopher","Dante","Eduard","Fabio","Fridolin","Laurin","Lenn","Michel","Nathanael","Zaid","Atlas","Casimir","Flynn","Fred","Karan","Laurenz","Lounis","Nikola","Poyraz","Said","Samu","Yaman","Zeyd","Aram","Ayan","Bastian","Ediz","Erwin","Frido","Ilja","Ivar","Ivo","Jesse","Kenan","Lazar","Mike","Milas","Moussa","Musab","Nilo","Nolan","Rami","Tamino","Willem","Adnan","Chris","Edward","Eliyas","Gia","Harun","Hoàng","Leonas","Miguel","Tamo","Viggo","Wanja","Yakup","Arno","Aurelio","Hüseyin","Jon","Lewis","Luciano","Romeo","Seyit","Thies","Abel","Ares","Burak","Charles","Danilo","Edin","Eray","Jamil","Kiano","Levent","Neil","Pavel","Timon","Yuri","Amos","Caleb","Cayden","Danny","Dian","Egon","Elmar","Emre","Halil","Ilai","Ismael","Kirill","Leonid","Naim","Nilas","Noyan","Noé","Teoman","Thorin","Valerio","Yazan","Yunis","Yusef","Alen","Björn","Bogdan","Camilo","Cem","Damien","Damir","Diyar","Edis","Ege","Eliano","Fatih","Ilian","Imran","Jesper","Joud","Kamil","Leonhard","Levian","Loki","Marian","Mario","Marius","Maurice","Merdan","Noar","Pino","Sinan"];
  shuffle(names);
  return names.slice(0, num);
};

(async () => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    functions: [
      {
          "name": "get_names",
          "description": "Get an array of names of people",
          "parameters": {
              "type": "object",
              "properties": {
                  "num": {
                      "type": "integer",
                      "description": "Number of names to return",
                  }
              },
              "required": ["num"],
          },
      }
    ],
    function_call: "auto",
    temperature: 1, // 0 - 2
    // top_p: 1, // use either top_p or temperature
    n: 3,
    stream: false,
    // stop: ["K.O."],
    max_tokens: 2048,
    presence_penalty: 0, // -2 - 2
    frequency_penalty: 0, // -2 - 2
    /*logit_bias: { // https://platform.openai.com/tokenizer
      1608: -100 // iversity
    },*/
    messages: [
      {role: "system", content: "You are a helpful assistant."},
      {role: "user", content: "Give me a list of 10 potential baby names."}
    ],
  });
  saveOutput('full', response);  
})();