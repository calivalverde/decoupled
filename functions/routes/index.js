const express = require("express");
const router = express.Router();

const admin = require("firebase-admin");

const serviceAccount = require("../../config/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://decoupled-95c8c.firebaseio.com"
});

const db = admin.firestore();

router.get("/", (req, res, next) => {
  res.send("Estamos en API");
});

router.get("/pets", async (req, res, next) => {
  try {
    const petsSnapshot = await db.collection("pet").get();
    const pets = [];
    petsSnapshot.forEach(doc => {
      pets.push({
        id: doc.id,
        ...doc.data()
      });
    });
    res.json(pets);
  } catch (e) {
    console.log(e);
  }
});

router.get("/pets/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("id is blank");
    const pet = await db
      .collection("pet")
      .doc(id)
      .get();
    if (!pet.exists) {
      throw new Error("pet does not exists");
    }
    res.json({
      data: pet.data()
    });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
