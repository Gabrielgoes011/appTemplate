// ========================================
// TELA PRINCIPAL (Boas-vindas ao template)
// ========================================
// Tela inicial do template: dá as boas-vindas e mostra, em tempo real,
// se o frontend está conectado ao backend (via GET /health).

import { useEffect, useState } from 'react';
import { Card, Button, Chip, Spinner } from '@heroui/react';
import { FiActivity, FiRefreshCw, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

function Dashboard() {
  const { user } = useAuth();

  // Estados possíveis da conexão com o back: 'checando' | 'online' | 'offline'
  const [status, setStatus] = useState('checando');
  const [detalhe, setDetalhe] = useState(null);

  // Consulta o backend para saber se está no ar
  const verificarConexao = async () => {
    setStatus('checando');
    try {
      const { data } = await api.get('/health');
      setStatus('online');
      setDetalhe(data?.data ?? null);
    } catch {
      setStatus('offline');
      setDetalhe(null);
    }
  };

  // Verifica assim que a tela abre
  useEffect(() => {
    verificarConexao();
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* ── Cabeçalho de boas-vindas ──────────────────────────────── */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          Bem-vindo ao Template 🎉
        </h1>
        <p className="text-foreground-500">
          App criado por <strong>Gabriel Goes</strong>
          {user?.nome ? `. Você entrou como ${user.nome}` : ''}
        </p>
      </div>

      {/* ── Card de status da conexão com o backend ───────────────── */}
      <Card>
        <Card.Header className="flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <FiActivity size={20} />
            <Card.Title>Conexão com o backend</Card.Title>
          </div>

          <Button
            isIconOnly
            variant="ghost"
            onPress={verificarConexao}
            aria-label="Verificar conexão novamente"
            isPending={status === 'checando'}
          >
            <FiRefreshCw size={18} />
          </Button>
        </Card.Header>

        <Card.Content className="space-y-4">
          {status === 'checando' && (
            <div className="flex items-center gap-2 text-foreground-500">
              <Spinner size="sm" />
              <span>Verificando conexão com o servidor...</span>
            </div>
          )}

          {status === 'online' && (
            <div className="space-y-3">
              <Chip color="success" variant="flat" startContent={<FiCheckCircle size={16} />}>
                Conectado ao backend
              </Chip>
              <p className="text-sm text-foreground-500">
                O frontend conseguiu falar com a API em{' '}
                <code className="font-mono">
                  {import.meta.env.VITE_API_URL || 'http://localhost:3000'}
                </code>
                .
              </p>
              {detalhe?.ambiente && (
                <p className="text-sm text-foreground-500">
                  Ambiente do servidor: <strong>{detalhe.ambiente}</strong>
                </p>
              )}
            </div>
          )}

          {status === 'offline' && (
            <div className="space-y-3">
              <Chip color="danger" variant="flat" startContent={<FiXCircle size={16} />}>
                Backend offline
              </Chip>
              <p className="text-sm text-foreground-500">
                Não consegui falar com a API. Confirme se o backend está rodando
                (<code className="font-mono">npm run dev</code> na pasta do back) e
                tente novamente.
              </p>
            </div>
          )}
        </Card.Content>
      </Card>

      {/* ── Card informativo sobre o template ─────────────────────── */}
      <Card variant="secondary">
        <Card.Header>
          <Card.Title>Sobre este template</Card.Title>
          <Card.Description>
            Base pronta para começar novos projetos
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <ul className="list-disc pl-5 space-y-1 text-sm text-foreground-500">
            <li>Frontend em React + Vite + HeroUI (tema claro/escuro).</li>
            <li>Backend em Express com rotas de health check e login.</li>
            <li>Login simulado (sem banco de dados) para prototipar rápido.</li>
            <li>Layout responsivo com sidebar no desktop e menu inferior no mobile.</li>
          </ul>
        </Card.Content>
      </Card>
    </div>
  );
}

export default Dashboard;
