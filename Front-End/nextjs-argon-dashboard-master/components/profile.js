import { v4 as uuid } from 'uuid';
// import { userSession } from './auth';
import { userSession } from "../pages/_app";
import { Storage } from '@stacks/storage';

const USERINFO_TABLE = 'USERINFO_TABLE.json';
const USERPIC = 'USERPIC.jpg';
export async function saveUserInfo(userinfo)
{
  const storage = new Storage({ userSession });
  return await storage.putFile(USERINFO_TABLE, JSON.stringify({ userinfo }));
}

export const defaultUserInfo = 
{
    Username: "",
    EmailAddress: "",
    FirstName: "",
    LastName: "",
    id: uuid(),
};

export async function fetchUserInfo()
{
  const storage = new Storage({ userSession });
  try {
    
    const userInfoJSON = await storage.getFile(USERINFO_TABLE);
    if (userInfoJSON) {
      const json = JSON.parse(userInfoJSON);
      return json.userinfo;
    }
  } catch (error) {
    return defaultUserInfo;
  }
}

const imageFileOptions = {
  encrypt: false,
  contentType: "image/jpg",
  dangerouslyIgnoreEtag: true,
};

export async function saveUserPic(userPic)
{
  const storage = new Storage({ userSession });
  // const imageFileOptions = {
  //   encrypt: false,
  //   contentType: "image/jpeg",
  //   dangerouslyIgnoreEtag: true,
  // };
  return await storage.putFile(USERPIC, userPic, imageFileOptions);
}

// const defaultUserPic = "assets/img/Amortize-pics/btc-amortize.jpg"

export async function fetchUserPic()
{
  const storage = new Storage({ userSession });
  try {
    
    const userPic = await storage.getFile(USERPIC, {decrypt: false, contentType: "image/jpg"});
    if (userPic) {
      // const json = JSON.parse(userInfoJSON);
      return userPic;
    }
  } catch (error) {
    console.log(error)
    return null;
  }
}



