const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Estamos en API");
});

router.get("/json", (req, res, next) => {
  res.send({
    glossary: {
      title: "example glossary",
      GlossDiv: {
        title: "S",
        GlossList: {
          GlossEntry: {
            ID: "SGML",
            SortAs: "SGML",
            GlossTerm: "Standard Generalized Markup Language",
            Acronym: "SGML",
            Abbrev: "ISO 8879:1986",
            GlossDef: {
              para:
                "A meta-markup language, used to create markup languages such as DocBook.",
              GlossSeeAlso: ["GML", "XML"]
            },
            GlossSee: "markup"
          }
        }
      }
    }
  });
});

// Contact From
router.post("/contact", (req, res) => {
  const { name } = req.body;
  return res.json({
    status: "OK",
    name,
    msg: "Se editaron correctamente los campos."
  });
});

module.exports = router;
