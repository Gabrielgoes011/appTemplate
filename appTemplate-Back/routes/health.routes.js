// ========================================
// ROTA DE HEALTH CHECK
// ========================================
// Usada pelo front para mostrar "conectado ao backend".
// Não depende de banco de dados, responde sempre que o servidor está no ar.

import { Router } from 'express';
import httpResponse from '../utils/httpResponse.js';

const router = Router();

router.get('/', (req, res) => {
  return httpResponse.success(res, 'API online', {
    status: 'ok',
    ambiente: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

export default router;
