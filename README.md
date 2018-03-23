#seCrypt

###(Encrypt-R-us)

![](https://github.com/rdjong/pinklog/raw/master/scrot.png)

seCrypt (Encrypt-R-us) Eindopdracht voor Sec2 week3

--

usage:

clone repository

```shell
npm install
npm start
```

De applicatie is geschreven in javascript, en draait op node
Ook heb ik een framework gebruikt: Express

De Data word opgeslagen in een noSQL database: MongoDB
De Data word encrypted met AES uit de crypto-js module

de Db slaat naam & message op, het wachtwoord is serialized in de message

