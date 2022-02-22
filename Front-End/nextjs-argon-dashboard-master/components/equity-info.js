import { v4 as uuid } from 'uuid';
// import { userSession } from './auth';

import { userSession } from "../pages/_app";

import { Storage } from '@stacks/storage';

const EQUITYINFO_TABLE = 'EQUITYINFO_TABLE.json';

export async function saveEquityInfo( equityinfo)
{
  const storage = new Storage({ userSession });
  return await storage.putFile(EQUITYINFO_TABLE, JSON.stringify({ equityinfo }));
}

export const defaultEquityInfo = 
{
    ValueOfHome: "",
    CurrentMorgageBalance: "",
    TermLength: "",
    id: uuid(),
};

export async function fetchEquityInfo()
{
  const storage = new Storage({ userSession });
  try {
    const equityInfoJSON = await storage.getFile(EQUITYINFO_TABLE);
    if (equityInfoJSON) {
      const json = JSON.parse(equityInfoJSON);
      return json.equityinfo;
    }
  } catch (error) {
    return defaultEquityInfo;
  }
}


