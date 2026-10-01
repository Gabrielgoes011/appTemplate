// ========================================
// 🧭 ROTAS DA API
// ========================================
// Ponto central das rotas. Importe aqui os routers de cada módulo
// (ex: usuarios, produtos) conforme o projeto crescer.
//
// Neste template há apenas:
//   GET  /api/health  → usado pelo front para mostrar "conectado ao back"
//   POST /api/login   → login SIMULADO (não valida banco, só devolve um token)

import { Router } from 'express';

import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';

const router = Router();

router.use(healthRoutes);
router.use(authRoutes);

export default router;
