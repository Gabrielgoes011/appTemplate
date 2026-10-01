// ========================================
// SERVER (ponto de entrada do backend)
// ========================================
// Carrega as variáveis de ambiente, importa o app Express e sobe a porta.

import './config/env.js'; // precisa vir ANTES de qualquer uso de process.env
import app from './modules/app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  const ambiente = (process.env.NODE_ENV || 'development').toUpperCase();
  console.log('\n============================================');
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📍 Ambiente: ${ambiente}`);
  console.log('============================================\n');
});
