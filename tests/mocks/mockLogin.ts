const validPass= 'chang3m3';
const hashPass= '$2a$12$cz1VDt6MEbvl7sn6Lju2buiVLyp2rU3m2zs8x0PosEhSKeDMFN5n.';

const semUser = {
  id: 2,
  username: '',
  password: validPass
};

const semPass = {
  id: 2,
  username: 'user',
  password: ''
};

const usuarioSumido = {
  id: 2,
  username: 'Troll',
  password: validPass
};

const aquiTem = {
  id: 1,
  username: 'Luar',
  vocation: 'Master',
  level: 99,
  password: hashPass
};

const esseExiste = {
  username: 'Luar',
  password: validPass
};

export default {
  semUser,
  semPass,
  usuarioSumido,
  aquiTem,
  esseExiste
};