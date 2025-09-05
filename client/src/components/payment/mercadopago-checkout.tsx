import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  CreditCard, Shield, CheckCircle, Copy, 
  DollarSign, Clock, AlertTriangle, Loader2
} from "lucide-react";

interface MercadoPagoCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency: string;
}

export function MercadoPagoCheckout({ isOpen, onClose, amount, currency }: MercadoPagoCheckoutProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [paymentStep, setPaymentStep] = useState<"info" | "payment" | "success">("info");
  const [paymentId, setPaymentId] = useState<string>("");

  const createPayment = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Usuario no autenticado");
      
      const response = await apiRequest("POST", "/api/payments", {
        amount: amount.toString(),
        currency,
      });
      return await response.json();
    },
    onSuccess: (payment) => {
      setPaymentId(payment.id);
      setPaymentStep("payment");
      toast({
        title: "Pago iniciado",
        description: "Procede con el pago usando los datos proporcionados.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error al iniciar pago",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const confirmPayment = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", `/api/payments/${paymentId}/confirm`, {
        status: "completed",
        mercadopagoId: `MP-${Date.now()}`, // Simulation
      });
    },
    onSuccess: () => {
      setPaymentStep("success");
      toast({
        title: "¡Pago confirmado!",
        description: "Tu acceso premium ha sido activado.",
      });
      // Refresh user data to show updated access
      window.location.reload();
    },
    onError: (error: any) => {
      toast({
        title: "Error al confirmar pago",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado",
      description: "Información copiada al portapapeles.",
    });
  };

  const handleClose = () => {
    setPaymentStep("info");
    setPaymentId("");
    onClose();
  };

  if (!user) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span>Autenticación Requerida</span>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              Debes iniciar sesión para realizar un pago.
            </p>
            <Button asChild data-testid="button-goto-auth">
              <a href="/auth">Iniciar Sesión</a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Checkout MercadoPago</span>
          </DialogTitle>
        </DialogHeader>

        {paymentStep === "info" && (
          <div className="space-y-6">
            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumen del Pago</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Acceso Premium Completo</span>
                  <span className="font-semibold">${amount} {currency}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total a Pagar</span>
                  <span className="text-primary">${amount} {currency}</span>
                </div>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Qué incluye el acceso premium?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Todos los cursos de trading",
                    "eBooks detallados y actualizados",
                    "Tutoriales de Binance y BingX",
                    "Calculadoras interactivas",
                    "Estrategias avanzadas",
                    "Soporte personalizado 24/7",
                    "Acceso de por vida",
                    "Actualizaciones gratuitas"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>Pago 100% Seguro:</strong> Procesado a través de MercadoPago con 
                encriptación SSL. Tu información financiera está protegida.
              </AlertDescription>
            </Alert>

            <div className="flex items-center justify-between pt-4">
              <Button variant="outline" onClick={handleClose} data-testid="button-cancel-payment">
                Cancelar
              </Button>
              <Button 
                onClick={() => createPayment.mutate()}
                disabled={createPayment.isPending}
                className="px-8"
                data-testid="button-proceed-payment"
              >
                {createPayment.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <CreditCard className="h-4 w-4 mr-2" />
                )}
                Proceder al Pago
              </Button>
            </div>
          </div>
        )}

        {paymentStep === "payment" && (
          <div className="space-y-6">
            {/* Payment Instructions */}
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                <strong>Instrucciones de Pago:</strong> Realiza la transferencia usando los datos 
                de abajo. El acceso se activará automáticamente al confirmar el pago.
              </AlertDescription>
            </Alert>

            {/* Payment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Datos para Transferencia</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">CVU MercadoPago</label>
                      <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                        <code className="flex-1 font-mono text-sm" data-testid="text-cvu-payment">
                          0000003100041434897381
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard("0000003100041434897381")}
                          data-testid="button-copy-cvu"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Titular</label>
                      <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                        <span className="flex-1 font-medium">Jeremias062009</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard("Jeremias062009")}
                          data-testid="button-copy-name"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Monto a Transferir</label>
                      <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                        <span className="font-bold text-xl text-primary" data-testid="text-payment-amount">
                          ${amount} {currency}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">ID de Pago</label>
                      <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                        <code className="flex-1 font-mono text-sm text-muted-foreground">
                          {paymentId}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(paymentId)}
                          data-testid="button-copy-payment-id"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Confirmation Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Pasos para Confirmar el Pago</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Badge className="mt-0.5">1</Badge>
                    <div>
                      <p className="font-medium">Realiza la transferencia</p>
                      <p className="text-sm text-muted-foreground">
                        Usa los datos de arriba en tu app de MercadoPago o banco
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge className="mt-0.5">2</Badge>
                    <div>
                      <p className="font-medium">Confirma el pago</p>
                      <p className="text-sm text-muted-foreground">
                        Haz clic en "Confirmar Pago" una vez realizada la transferencia
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge className="mt-0.5">3</Badge>
                    <div>
                      <p className="font-medium">Acceso activado</p>
                      <p className="text-sm text-muted-foreground">
                        Tu acceso premium se activará inmediatamente
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between pt-4">
              <Button variant="outline" onClick={handleClose} data-testid="button-cancel-checkout">
                Cancelar
              </Button>
              <Button 
                onClick={() => confirmPayment.mutate()}
                disabled={confirmPayment.isPending}
                className="px-8"
                data-testid="button-confirm-payment"
              >
                {confirmPayment.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Confirmar Pago
              </Button>
            </div>
          </div>
        )}

        {paymentStep === "success" && (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">¡Pago Confirmado!</h3>
              <p className="text-muted-foreground">
                Tu acceso premium ha sido activado exitosamente.
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-4">
                  Ahora tienes acceso completo a:
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Todos los cursos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>eBooks premium</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Tutoriales plataformas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Calculadoras interactivas</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleClose} className="px-8" data-testid="button-close-success">
              Comenzar a Aprender
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
