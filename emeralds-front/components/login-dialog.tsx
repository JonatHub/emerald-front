"use client";
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/hooks/use-auth-store';
import { toast } from 'sonner';
import ForgotPasswordDialog from './forgot-password-dialog';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onOpenChange }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Por favor, ingresa tu usuario y contraseña.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas. Inténtalo de nuevo.');
      }

      const data = await response.json();
      
      // Aquí necesitaríamos otro endpoint para obtener los datos del usuario usando el token,
      // por ahora, usaremos datos de ejemplo.
      const userData = { id: '1', username: username, email: 'user@example.com' };

      login(data.access_token, userData);
      toast.success(`¡Bienvenido, ${username}!`);
      onOpenChange(false); // Cierra el modal al iniciar sesión
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setShowForgotPassword(false);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open && !showForgotPassword} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Iniciar Sesión</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </Button>
            <div className="text-center">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-emerald-600 hover:text-emerald-800 underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      <ForgotPasswordDialog
        open={showForgotPassword}
        onOpenChange={setShowForgotPassword}
        onBackToLogin={handleBackToLogin}
      />
    </>
  );
};

export default LoginDialog; 