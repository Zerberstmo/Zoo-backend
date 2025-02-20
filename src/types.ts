// ENUM Typen basierend auf der Datenbank

export type Geschlecht = "Männlich" | "Weiblich" | "Unbekannt";

export type Verkaufsstandtyp = "Essen" | "Trinken" | "Souvenir";

export type Einnahmetyp = "Eintritt" | "Spende" | "Verkauf";

export type Ausgabetyp = "Gehalt" | "Instandhaltung" | "Futter";

export type Mitarbeiterrolle =
  | "Tierpfleger"
  | "Tierarzt"
  | "Verkäufer"
  | "Mitarbeiter";

export interface Gehege {
  id: number;
  name: string;
  groesse: number;
  instandhaltungskosten: number;
}

export interface Tier {
  id: number;
  name: string;
  art: string;
  geburtsdatum: string;
  geschlecht: Geschlecht;
  gehege_id: number;
  tierarzt_id: number;
}

export interface Tierarzt {
  id: number;
  name: string;
  spezialisierung: string;
  max_tiere: number;
}

export interface Tierpfleger {
  id: number;
  name: string;
}

export interface GehegeTierpfleger {
  gehege_id: number;
  tierpfleger_id: number;
}

export interface Verkaufsstand {
  id: number;
  name: string;
  typ: Verkaufsstandtyp;
  einnahmen: number;
  verkaeufer_id: number;
}

export interface Verkaeufer {
  id: number;
  name: string;
}

export interface ZooKonto {
  id: number;
  kontostand: number;
}

export interface Einnahme {
  id: number;
  typ: Einnahmetyp;
  betrag: number;
  datum: string;
  konto_id: number;
}

export interface Ausgabe {
  id: number;
  typ: Ausgabetyp;
  betrag: number;
  datum: string;
  konto_id: number;
}

export interface Besucher {
  id: number;
  datum: string;
  anzahl: number;
  einnahme_id: number;
}

export interface Spende {
  id: number;
  spender_name: string;
  betrag: number;
  datum: string;
  einnahme_id: number;
}

export interface Mitarbeiter {
  id: number;
  name: string;
  rolle: Mitarbeiterrolle;
  gehalt: number;
}

export interface Bild {
  id: number;
  tier_id: number;
  url: string;
  hochgeladen_von: number;
}

export type NewAnimal = Omit<Tier, "id">;
