import { Hono } from "hono";
import {
  getAllAnimals,
  getAnimal,
  addAnimal,
  deleteAnimal,
  assignAnimalToCompound,
  updateAnimal,
} from "../models/animal-model.js";

export const animalsRouter = new Hono();

animalsRouter.get("/all", async (c) => {
  const animals = await getAllAnimals();
  return c.json(animals);
});

animalsRouter.get("/getId/:id", getAnimal);

animalsRouter.post("/add", async (c) => {
  const newAnimal = await c.req.json();
  const addedAnimal = await addAnimal(newAnimal);
  return c.json(addedAnimal, { status: 201 });
});

animalsRouter.put("/update/:id", async (c) => {
  const animalId = Number(c.req.param("id"));
  const updatedFields = await c.req.json();

  if (isNaN(animalId)) {
    return c.json({ message: "Animal id must be an integer" }, { status: 400 });
  }

  const updatedAnimal = await updateAnimal(animalId, updatedFields);
  if (!updatedAnimal) {
    return c.json(
      { message: `Animal with id ${animalId} not found` },
      { status: 404 }
    );
  }

  return c.json(updatedAnimal);
});
animalsRouter.delete("/delete/:id", async (c) => {
  const animalId = Number(c.req.param("id"));
  const deletedAnimal = await deleteAnimal(animalId);
  if (!deletedAnimal) {
    return c.json(
      { message: `Animal with id ${animalId} not found` },
      { status: 404 }
    );
  }
  return c.json(deletedAnimal);
});

animalsRouter.post("/:id/assign-compound", assignAnimalToCompound);
