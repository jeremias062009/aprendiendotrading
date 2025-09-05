import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Search, Filter, Ban, CheckCircle, XCircle, 
  Users, UserCheck, UserX, DollarSign
} from "lucide-react";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  hasAccess: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Payment {
  id: string;
  userId: string;
  amount: string;
  currency: string;
  status: string;
  createdAt: string;
}

export function UserManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [accessFilter, setAccessFilter] = useState("all");

  // Mock data for demonstration - in real app this would come from API
  const mockUsers: User[] = [
    {
      id: "1",
      username: "juan_trader",
      email: "juan@example.com",
      role: "user",
      hasAccess: true,
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: "2", 
      username: "maria_investment",
      email: "maria@example.com",
      role: "user",
      hasAccess: false,
      createdAt: "2024-01-20T14:15:00Z",
      updatedAt: "2024-01-20T14:15:00Z"
    },
    {
      id: "3",
      username: "admin_user",
      email: "admin@example.com", 
      role: "admin",
      hasAccess: true,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    }
  ];

  const mockPayments: Payment[] = [
    {
      id: "1",
      userId: "1",
      amount: "2000",
      currency: "ARS",
      status: "completed",
      createdAt: "2024-01-15T10:35:00Z"
    }
  ];

  // In real app, replace with actual API calls
  const { data: users = mockUsers } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
    queryFn: () => Promise.resolve(mockUsers),
  });

  const { data: payments = mockPayments } = useQuery<Payment[]>({
    queryKey: ["/api/admin/payments"],
    queryFn: () => Promise.resolve(mockPayments),
  });

  const updateUserAccess = useMutation({
    mutationFn: async ({ userId, hasAccess }: { userId: string; hasAccess: boolean }) => {
      // In real app: await apiRequest("PATCH", `/api/admin/users/${userId}`, { hasAccess });
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Usuario actualizado",
        description: "El acceso del usuario ha sido actualizado.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error al actualizar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesAccess = accessFilter === "all" || 
                         (accessFilter === "with_access" && user.hasAccess) ||
                         (accessFilter === "without_access" && !user.hasAccess);
    
    return matchesSearch && matchesRole && matchesAccess;
  });

  const getUserPayment = (userId: string) => {
    return payments.find(payment => payment.userId === userId && payment.status === "completed");
  };

  const getInitials = (username: string) => {
    return username.split('_').map(part => part[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            <Users className="h-4 w-4 mr-1" />
            {users.length} Total
          </Badge>
          <Badge variant="outline" className="text-green-600 border-green-600">
            <UserCheck className="h-4 w-4 mr-1" />
            {users.filter(u => u.hasAccess).length} Con Acceso
          </Badge>
          <Badge variant="outline" className="text-red-600 border-red-600">
            <UserX className="h-4 w-4 mr-1" />
            {users.filter(u => !u.hasAccess).length} Sin Acceso
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtros</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar usuario</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Username o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                  data-testid="input-search-users"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Rol</label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger data-testid="select-role-filter">
                  <SelectValue placeholder="Filtrar por rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los roles</SelectItem>
                  <SelectItem value="user">Usuario</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Acceso</label>
              <Select value={accessFilter} onValueChange={setAccessFilter}>
                <SelectTrigger data-testid="select-access-filter">
                  <SelectValue placeholder="Filtrar por acceso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="with_access">Con acceso</SelectItem>
                  <SelectItem value="without_access">Sin acceso</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No se encontraron usuarios</h3>
              <p className="text-muted-foreground">
                {searchTerm || roleFilter !== "all" || accessFilter !== "all"
                  ? "Intenta ajustar los filtros de búsqueda"
                  : "No hay usuarios registrados en el sistema"}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Acceso</TableHead>
                  <TableHead>Pago</TableHead>
                  <TableHead>Registro</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  const userPayment = getUserPayment(user.id);
                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {getInitials(user.username)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium" data-testid={`user-username-${user.id}`}>
                              {user.username}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                          {user.role === "admin" ? "Admin" : "Usuario"}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {user.hasAccess ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <Badge variant={user.hasAccess ? "default" : "secondary"}>
                            {user.hasAccess ? "Activo" : "Sin acceso"}
                          </Badge>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        {userPayment ? (
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">
                              ${userPayment.amount} {userPayment.currency}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Sin pago</span>
                        )}
                      </TableCell>
                      
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateUserAccess.mutate({
                              userId: user.id,
                              hasAccess: !user.hasAccess
                            })}
                            disabled={updateUserAccess.isPending}
                            data-testid={`button-toggle-access-${user.id}`}
                          >
                            {user.hasAccess ? (
                              <>
                                <Ban className="h-4 w-4 mr-1" />
                                Suspender
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Activar
                              </>
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
