"use client";
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!formData.email.includes('@')) {
      toast.error('Por favor ingresa un email válido');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          username: formData.username,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar usuario');
      }

      const data = await response.json();
      toast.success('¡Registro exitoso! Ya puedes iniciar sesión');
      router.push('/');
    } catch (error: any) {
      toast.error(error.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Crear Cuenta
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Únete a nuestra comunidad y descubre productos únicos
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="firstName"
                placeholder="Nombre"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <Input
                name="lastName"
                placeholder="Apellido"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            
            <Input
              name="username"
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            
            <Input
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleInputChange}
            />
            
            <Input
              name="address"
              placeholder="Dirección"
              value={formData.address}
              onChange={handleInputChange}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="city"
                placeholder="Ciudad"
                value={formData.city}
                onChange={handleInputChange}
              />
              <Input
                name="postalCode"
                placeholder="Código Postal"
                value={formData.postalCode}
                onChange={handleInputChange}
              />
            </div>
            
            <Input
              name="password"
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirmar Contraseña"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <Link 
                  href="/" 
                  className="text-emerald-600 hover:text-emerald-800 underline font-medium"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage; 