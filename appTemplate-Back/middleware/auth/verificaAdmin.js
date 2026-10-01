// ========================================
// MIDDLEWARE: VERIFICA ADMIN
// ========================================
// Restringe rotas de gestão a usuários admin.
// Precisa rodar DEPOIS do verificaToken, que injeta req.user (campo "adm").

import httpResponse from '../../utils/httpResponse.js';

const verificaAdmin = (req, res, next) => {
  if (!req.user?.adm) {
    return httpResponse.forbidden(res, 'Acesso restrito a administradores.');
  }
  next();
};

export default verificaAdmin;
