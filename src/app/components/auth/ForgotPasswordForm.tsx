"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validare de bază
    if (!email) {
      setError("Vă rugăm să introduceți adresa de email.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Vă rugăm să completați ambele câmpuri pentru parolă.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Parolele nu se potrivesc.");
      return;
    }

    if (password.length < 8) {
      setError("Parola trebuie să aibă cel puțin 8 caractere.");
      return;
    }

    // Aici ar trebui să adăugați logica pentru resetarea parolei
    // De exemplu, apelarea unui API pentru a verifica emailul și a reseta parola

    // Simulăm o resetare reușită a parolei
    setSuccess(true);
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Recuperare Parolă</CardTitle>
        <CardDescription>
          Introduceți adresa de email și noua parolă pentru a reseta contul.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemplu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Noua Parolă</Label>
            <Input
              id="password"
              type="password"
              placeholder="Introduceți noua parolă"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmă Noua Parolă</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirmați noua parolă"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <AlertDescription>
                Parola a fost resetată cu succes. Vă puteți autentifica acum cu
                noua parolă.
              </AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full">
            Resetează Parola
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Vă amintiți parola?{" "}
          <a href="../" className="text-primary hover:underline">
            Autentificare
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
