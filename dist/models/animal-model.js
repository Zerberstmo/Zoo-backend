import { getPool } from "../db/pool.js";
import { updateAnimalCompound } from "../db/queries.js";
import { HTTPException } from "../utils/HTTPException.js";
export const getAllAnimals = async () => {
    const queryResult = await getPool().query('SELECT * FROM "Tier"');
    return queryResult.rows;
};
export const getAnimalById = async (id) => {
    const queryResult = await getPool().query('SELECT * FROM "Tier" WHERE id = $1', [id]);
    return queryResult.rows.length > 0 ? queryResult.rows[0] : null;
};
export const addAnimal = async (newAnimal) => {
    const text = `INSERT INTO "Tier" (name, geschlecht, art) VALUES ($1, $2, $3) RETURNING *`;
    const values = [newAnimal.name, newAnimal.geschlecht, newAnimal.art];
    const response = await getPool().query(text, values);
    return response.rows[0];
};
export const deleteAnimal = async (id) => {
    const queryResult = await getPool().query('DELETE FROM "Tier" WHERE id = $1 RETURNING *', [id]);
    return queryResult.rows.length > 0 ? queryResult.rows[0] : null;
};
export const getAnimal = async (c) => {
    try {
        const animalId = Number(c.req.param("id"));
        if (isNaN(animalId)) {
            throw new HTTPException(400, {
                message: "Animal id must be of type integer",
            });
        }
        const result = await getAnimalById(animalId);
        if (!result) {
            throw new HTTPException(404, {
                message: `Animal with id ${animalId} does not exist!`,
            });
        }
        return c.json(result);
    }
    catch (error) {
        return handleError(error, c);
    }
};
export const assignAnimalToCompound = async (c) => {
    try {
        const animalId = Number(c.req.param("id"));
        const compoundId = Number(c.req.query("compoundId"));
        if (isNaN(animalId) || isNaN(compoundId)) {
            throw new HTTPException(400, {
                message: "Both animalId and compoundId must be of type integer",
            });
        }
        const updateResult = await updateAnimalCompound(animalId, compoundId);
        if (updateResult.rowCount === 0) {
            throw new HTTPException(404, {
                message: `Animal with id ${animalId} not found or compound not found`,
            });
        }
        return c.json(updateResult.rows[0]);
    }
    catch (error) {
        return handleError(error, c);
    }
};
const handleError = (error, c) => {
    if (error instanceof HTTPException) {
        return c.json({ message: error.message });
    }
    else if (error instanceof Error) {
        return c.json({ message: error.message }, { status: 500 });
    }
    return c.json({ message: "Unknown error occurred" }, { status: 500 });
};
