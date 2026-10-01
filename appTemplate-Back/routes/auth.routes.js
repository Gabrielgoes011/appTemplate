// ========================================
// ROTAS DE AUTENTICAÇÃO (MOCK, SEM BANCO)
// ========================================
// Como este é um TEMPLATE, o login NÃO valida contra um banco de dados.
// Qualquer e-mail/senha preenchidos são aceitos e geramos um JWT "fake"
// apenas para demonstrar o fluxo completo front <-> back.
//
// 👉 Quando tiver banco, substitua o conteúdo do handler /login por:
//    1) buscar o usuário por e-mail
//    2) comparar o hash da senha (bcrypt)
//    3) gerar o token com os dados reais do usuário

import { Router } from 'express';
import jwt from 'jsonwebtoken';
import httpResponse from '../utils/httpResponse.js';
import { loginLimiter } from '../middleware/rateLimiter.js';
import verificaToken from '../middleware/auth/verificaToken.js';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'segredo-de-desenvolvimento-trocar-em-producao';

// ── LOGIN (mock) ──────────────────────────────────────────────────────────
router.post('/login', loginLimiter, (req, res) => {
  const { email, senha } = req.body || {};

  // Validação básica dos campos (única regra do mock).
  if (!email || !senha) {
    return httpResponse.validationError(res, 'Informe e-mail e senha.');
  }

  // Usuário fake montado a partir do e-mail informado.
  const usuario = {
    id: 1,
    nome: email.split('@')[0] || 'Usuário',
    email,
    adm: true,
  };

  // Token válido por 8 horas só para o template funcionar ponta a ponta.
  const token = jwt.sign(usuario, JWT_SECRET, { expiresIn: '8h' });

  return httpResponse.success(res, 'Login realizado com sucesso!', { usuario, token });
});

// ── PERFIL (exemplo de rota protegida) ───────────────────────────────────
// Mostra como usar o verificaToken. O front pode chamar /me para
// recuperar os dados do usuário a partir do token salvo.
router.get('/me', verificaToken, (req, res) => {
  return httpResponse.success(res, 'Usuário autenticado.', { usuario: req.user });
});

export default router;
