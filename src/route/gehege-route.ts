import { Hono } from "hono";
import type { Context } from "hono/jsx";
import { getPool } from "../db/pool.js";
import { log } from "console";

export const compoundRouter = new Hono();

type patchgehege = {
  name?: string;
  groesse?: number;
  instandhaltungskosten?: number;
};

compoundRouter.patch("/:id", async (c) => {
  const patchbody = (await c.req.json) as patchgehege;
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

  const updateText =
    "UPDATE Gehege SET Name=$1, groesse=$2, instandhaltungskosten=$3 WHERE id=$4";
  const updateValues = [
    updateBody.name,
    updateBody.groesse,
    updateBody.instandhaltungskosten,
    compoundID,
  ];
  const updateResult = getPool().query(updateText);
  log("Update von Gehegewerten.");

  const joinQueryResult = await getPool().query(
    'SELECT * FROM "Personal_gehebe" WHERE gehege_id = $1',
    [compoundId]
  );
  const compoundJoin = joinQueryResult.rows;
});
