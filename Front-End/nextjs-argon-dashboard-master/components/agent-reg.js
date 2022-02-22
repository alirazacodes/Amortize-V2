import { v4 as uuid } from 'uuid';
// import { userSession } from './auth';
import { userSession } from "../pages/_app";
import { Storage } from '@stacks/storage';

const AGENTINFO_TABLE = 'AGENTINFO_TABLE.json';

export async function saveAgentInfo(agentinfo, previousAgent) {
    const storage = new Storage({ userSession });
    var agents = [];
    agents.push(agentinfo);
    // const previousAgent = await fetchAgentInfo();
    previousAgent.forEach(element => {
        agents.push(element);
    });
    return await storage.putFile(AGENTINFO_TABLE, JSON.stringify({ agents }));
}

export const defaultAgentInfo =
{
    STXAddress: "",
    Phone: "",
    FirstName: "",
    LastName: "",
    Estate: "",
    id: uuid(),
};

export async function fetchAgentInfo() {
    const storage = new Storage({ userSession });
    try {

        const agentInfoJSON = await storage.getFile(AGENTINFO_TABLE);
        if (agentInfoJSON) {
            const json = JSON.parse(agentInfoJSON);
            return json.agents;
        }
    } catch (error) {
        console.log(error);
        // var agents = [];
        // agents.push(defaultAgentInfo);
        return [];
    }
}

export async function removeAgentInfo(AgentAddress, previousAgent) {
    const storage = new Storage({ userSession });
    var agents = [];
    // agents.push(agentinfo);
    // const previousAgent = await fetchAgentInfo();
    previousAgent.forEach(element => {
        if (element.STXAddress != AgentAddress) {
            agents.push(element);
        }
    });
    return await storage.putFile(AGENTINFO_TABLE, JSON.stringify({ agents }));
}

