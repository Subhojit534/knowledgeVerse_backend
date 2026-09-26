import { v4 as uuidv4 } from 'uuid';
const isValidUUID = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
console.log(isValidUUID('duelist_128185_25285'));
