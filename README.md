# FAQ Chat Bot

An AI-powered assistant for your FAQ on your web site. The bot is designed to live in a <iframe>. It provides the best possible answers to your visitors' questions.

# How it works?

First of all, you need a list of FAQ as a CSV file (this is the only supported file format for now). Then you upload the file using the admin panel. Once the back-end gets the file it then hands it to RASA (https://github.com/RasaHQ/rasa). RASA creates data models and trains the data. Once RASA is done with the data then it provides you a uniq link (this part is not ready yet) which you will then place in a <iframe> on your web site.

Once everything is set up, your visitors can now ask their questions via the chat screen you placed on your web site, and the chat bot tries to do its best.

# Contributors
- [Cahit Yigit](https://github.com/cahitihac)
- [Ridvan Kotan](https://github.com/kotanridvan)
- [Halil Ibrahim Aksoy](https://github.com/halilibrahimaksoy)
- [Muhammet Cakir](https://github.com/MuhammetCakir)

# License
MIT