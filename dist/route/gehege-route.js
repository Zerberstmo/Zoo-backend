import { Hono } from "hono";
import { getPool } from "../db/pool.js";
import { log } from "console";
export const compoundRouter = new Hono();
compoundRouter.patch("/:id", async (c) => {
    const patchbody = (await c.req.json);
    const queryResult = await getPool().query('SELECT * FROM ("Gehege" JOIN "');
    const patchObjekt = {
        name: patchbody.name,
        groesse: patchbody.groesse,
        instandhaltungskosten: patchbody.instandhaltungskosten,
    };
    const updateBody = {
        // ...compoundFromDatabase,
        ...patchObjekt,
    };
    const updateText = "UPDATE Gehege SET Name=$1, groesse=$2, instandhaltungskosten=$3 WHERE id=$4";
    const updateValues = [
        updateBody.name,
        updateBody.groesse,
        updateBody.instandhaltungskosten,
        // compoundID,
    ];
    const updateResult = getPool().query(updateText);
    log("Update von Gehegewerten.");
    const joinQueryResult = await getPool().query('SELECT * FROM "Personal_gehebe" WHERE gehege_id = $1');
    const compoundJoin = joinQueryResult.rows;
});
