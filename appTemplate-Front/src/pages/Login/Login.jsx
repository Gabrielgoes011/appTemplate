// ========================================
// PÁGINA DE LOGIN
// ========================================
// Usa componentes do HeroUI v3: Card, InputGroup, Button, Separator e toast.
// Chama a API e, se der certo, guarda o token com login() do AuthContext.

import { useState } from 'react';
import { Card, InputGroup, Button, Separator, toast } from '@heroui/react';
import { FiLayers, FiMail, FiLock, FiEye, FiEyeOff, FiZap } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

// Credenciais de exemplo: o backend aceita qualquer e-mail/senha (login simulado)
const CREDENCIAIS_TESTE = { email: 'teste@template.com', senha: '123456' };

function Login() {
  const { login } = useAuth();

  // Guardam o que o usuário digita
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const entrar = async (credenciais) => {
    setCarregando(true);

    try {
      // Ajuste a rota conforme seu backend
      const resposta = await api.post('/login', credenciais);

      // O backend responde { success, message, data }
      const { usuario, token } = resposta.data.data;
      login(usuario, token);
    } catch (erro) {
      toast.danger(erro.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // impede a página de recarregar
    entrar({ email, senha });
  };

  // Preenche e já entra com a conta de teste, só para prototipar rápido
  const handleEntrarComoTeste = () => {
    setEmail(CREDENCIAIS_TESTE.email);
    setSenha(CREDENCIAIS_TESTE.senha);
    entrar(CREDENCIAIS_TESTE);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="w-full max-w-sm space-y-6">
        {/* ── Marca do template ──────────────────────────────── */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10 text-primary">
            <FiLayers size={24} />
          </div>
          <h1 className="text-xl font-bold">appTemplate</h1>
          <p className="text-sm text-foreground-500">
            Template full-stack criado por <strong>Gabriel Goes</strong>
          </p>
        </div>

        <Card className="w-full">
          <Card.Header>
            <Card.Title>Bem-vindo de volta</Card.Title>
            <Card.Description>Entre para continuar no template</Card.Description>
          </Card.Header>

          <Card.Content>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <InputGroup>
                <InputGroup.Prefix>
                  <FiMail size={16} />
                </InputGroup.Prefix>
                <InputGroup.Input
                  type="email"
                  placeholder="E-mail"
                  aria-label="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>

              <InputGroup>
                <InputGroup.Prefix>
                  <FiLock size={16} />
                </InputGroup.Prefix>
                <InputGroup.Input
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Senha"
                  aria-label="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <InputGroup.Suffix>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    onPress={() => setMostrarSenha((v) => !v)}
                    aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {mostrarSenha ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>

              {/* isPending mostra o "carregando" no botão */}
              <Button type="submit" fullWidth isPending={carregando}>
                Entrar
              </Button>
            </form>

            <div className="flex items-center gap-3 my-4">
              <Separator className="flex-1" />
              <span className="text-xs text-foreground-500">ou</span>
              <Separator className="flex-1" />
            </div>

            <Button
              variant="secondary"
              fullWidth
              isPending={carregando}
              onPress={handleEntrarComoTeste}
            >
              <FiZap size={16} />
              Entrar com conta de teste
            </Button>
          </Card.Content>

          <Card.Footer>
            <p className="text-xs text-center text-foreground-500 w-full">
              Login simulado, sem banco de dados. Qualquer e-mail e senha funcionam.
            </p>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default Login;
