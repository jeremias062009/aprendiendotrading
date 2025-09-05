import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Save, Eye, Bold, Italic, List, Image, Video,
  FileText, BookOpen, Layers, Smartphone
} from "lucide-react";

interface ContentEditorProps {
  type: "course" | "ebook" | "trading-concept" | "platform-tutorial" | "referral-link";
  title: string;
  placeholder: string;
  initialData?: any;
  onSave?: () => void;
}

export function ContentEditor({ type, title, placeholder, initialData, onSave }: ContentEditorProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    category: initialData?.category || "",
    level: initialData?.level || "beginner",
    platform: initialData?.platform || "binance",
    price: initialData?.price || "2000",
    url: initialData?.url || "",
    benefits: initialData?.benefits || [],
    isActive: initialData?.isActive ?? true,
  });

  const [newBenefit, setNewBenefit] = useState("");

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      let endpoint = "";
      switch (type) {
        case "course":
          endpoint = "/api/courses";
          break;
        case "ebook":
          endpoint = "/api/ebooks";
          break;
        case "trading-concept":
          endpoint = "/api/trading-concepts";
          break;
        case "platform-tutorial":
          endpoint = "/api/platform-tutorials";
          break;
        case "referral-link":
          endpoint = "/api/referral-links";
          break;
      }
      await apiRequest("POST", endpoint, data);
    },
    onSuccess: () => {
      toast({
        title: "Contenido guardado",
        description: "El contenido ha sido guardado exitosamente.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/${type}s`] });
      if (onSave) onSave();
      // Reset form
      setFormData({
        title: "",
        description: "",
        content: "",
        category: "",
        level: "beginner",
        platform: "binance",
        price: "2000",
        url: "",
        benefits: [],
        isActive: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error al guardar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    const dataToSave: any = {
      title: formData.title,
      description: formData.description,
      content: formData.content,
      isActive: formData.isActive,
    };

    switch (type) {
      case "course":
        dataToSave.level = formData.level;
        dataToSave.price = formData.price;
        break;
      case "ebook":
        dataToSave.category = formData.category;
        break;
      case "trading-concept":
        dataToSave.category = formData.category;
        dataToSave.formulas = {};
        dataToSave.examples = {};
        break;
      case "platform-tutorial":
        dataToSave.platform = formData.platform;
        dataToSave.steps = { steps: [] };
        break;
      case "referral-link":
        dataToSave.platform = formData.platform;
        dataToSave.url = formData.url;
        dataToSave.benefits = formData.benefits;
        break;
    }

    createMutation.mutate(dataToSave);
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }));
      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_: string, i: number) => i !== index)
    }));
  };

  const getIcon = () => {
    switch (type) {
      case "course":
        return <BookOpen className="h-5 w-5" />;
      case "ebook":
        return <FileText className="h-5 w-5" />;
      case "trading-concept":
        return <Layers className="h-5 w-5" />;
      case "platform-tutorial":
        return <Smartphone className="h-5 w-5" />;
      case "referral-link":
        return <Layers className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {getIcon()}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="content-title">Título</Label>
            <Input
              id="content-title"
              placeholder="Título del contenido"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              data-testid="input-content-title"
            />
          </div>

          {type === "course" && (
            <div className="space-y-2">
              <Label htmlFor="course-level">Nivel</Label>
              <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                <SelectTrigger data-testid="select-course-level">
                  <SelectValue placeholder="Seleccionar nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Principiante</SelectItem>
                  <SelectItem value="intermediate">Intermedio</SelectItem>
                  <SelectItem value="advanced">Avanzado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {(type === "trading-concept" || type === "ebook") && (
            <div className="space-y-2">
              <Label htmlFor="content-category">Categoría</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger data-testid="select-content-category">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="candlesticks">Velas Japonesas</SelectItem>
                  <SelectItem value="moving_averages">Medias Móviles</SelectItem>
                  <SelectItem value="fibonacci">Fibonacci</SelectItem>
                  <SelectItem value="support_resistance">Soporte y Resistencia</SelectItem>
                  <SelectItem value="indicators">Indicadores</SelectItem>
                  <SelectItem value="strategies">Estrategias</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {type === "platform-tutorial" && (
            <div className="space-y-2">
              <Label htmlFor="tutorial-platform">Plataforma</Label>
              <Select value={formData.platform} onValueChange={(value) => setFormData({ ...formData, platform: value })}>
                <SelectTrigger data-testid="select-tutorial-platform">
                  <SelectValue placeholder="Seleccionar plataforma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="binance">Binance</SelectItem>
                  <SelectItem value="bingx">BingX</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {type === "course" && (
            <div className="space-y-2">
              <Label htmlFor="course-price">Precio (ARS)</Label>
              <Input
                id="course-price"
                type="number"
                placeholder="2000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                data-testid="input-course-price"
              />
            </div>
          )}

          {type === "referral-link" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="referral-platform">Plataforma</Label>
                <Select value={formData.platform} onValueChange={(value) => setFormData({ ...formData, platform: value })}>
                  <SelectTrigger data-testid="select-referral-platform">
                    <SelectValue placeholder="Seleccionar plataforma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="binance">Binance</SelectItem>
                    <SelectItem value="bingx">BingX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="referral-url">URL del Enlace</Label>
                <Input
                  id="referral-url"
                  placeholder="https://..."
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  data-testid="input-referral-url"
                />
              </div>
            </>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="content-description">Descripción</Label>
          <Textarea
            id="content-description"
            placeholder="Descripción breve del contenido"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            data-testid="input-content-description"
          />
        </div>

        {/* Rich Text Editor Simulation */}
        <div className="space-y-2">
          <Label htmlFor="content-editor">Contenido</Label>
          <div className="border rounded-lg">
            {/* Toolbar */}
            <div className="flex items-center space-x-2 p-3 border-b bg-muted/30">
              <Button variant="outline" size="sm" data-testid="button-bold">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" data-testid="button-italic">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" data-testid="button-list">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" data-testid="button-image">
                <Image className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" data-testid="button-video">
                <Video className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Content Area */}
            <Textarea
              id="content-editor"
              placeholder={placeholder}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={12}
              className="border-0 resize-none focus-visible:ring-0"
              data-testid="textarea-content-editor"
            />
          </div>
        </div>

        {/* Benefits (for referral links) */}
        {type === "referral-link" && (
          <div className="space-y-4">
            <Label>Beneficios</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Agregar beneficio"
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addBenefit()}
                data-testid="input-new-benefit"
              />
              <Button onClick={addBenefit} variant="outline" data-testid="button-add-benefit">
                Agregar
              </Button>
            </div>
            
            {formData.benefits.length > 0 && (
              <div className="space-y-2">
                {formData.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">{benefit}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBenefit(index)}
                      data-testid={`button-remove-benefit-${index}`}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Badge variant={formData.isActive ? "default" : "secondary"}>
              {formData.isActive ? "Activo" : "Inactivo"}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" data-testid="button-preview">
              <Eye className="h-4 w-4 mr-2" />
              Vista Previa
            </Button>
            <Button 
              onClick={handleSave}
              disabled={createMutation.isPending || !formData.title || !formData.description}
              data-testid="button-save-content"
            >
              <Save className="h-4 w-4 mr-2" />
              {createMutation.isPending ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
