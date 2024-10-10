// uncomment to use TXT, comment to use DB
// import { createContato, readContatos, readContatoById, updateContato, deleteContato, inicializarPersistencia } from './businessrulestxt.js';

// uncomment to use DB, comment to use TXT
import { createContato, readContatos, readContatoById, updateContato, deleteContato, inicializarPersistencia } from './businessrulesdb.js';

export { createContato, readContatos, readContatoById, updateContato, deleteContato, inicializarPersistencia }