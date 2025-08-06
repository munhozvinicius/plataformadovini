import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Bell } from 'lucide-react';
import RealProductCreator from '@/components/admin/RealProductCreator';
import RealHomeEditor from '@/components/admin/RealHomeEditor';
import { saveRealHomeData, loadRealHomeData } from '@/data/realHomeData';

export default function Admin() {
  // Estados para Atualizações REAIS
  const [updateData, setUpdateData] = useState({
    title: 'Sistema REAL Implementado',
    description: 'Agora o sistema funciona de verdade! Produtos criados aparecem no menu, páginas são acessíveis e dados persistem permanentemente.',
    date: new Date().toLocaleDateString('pt-BR')
  });

  // Carregar dados REAIS ao inicializar
  useEffect(() => {
    const homeData = loadRealHomeData();
    if (homeData && homeData.updates) {
      setUpdateData(homeData.updates);
    }
  }, []);

  // Função para salvar atualizações REAIS
  const saveUpdateData = () => {
    try {
      const homeData = loadRealHomeData();
      homeData.updates = updateData;
      const success = saveRealHomeData(homeData);
      
      if (success) {
        alert('Atualização salva com sucesso!\n\nA mudança já está visível na página inicial.');
      } else {
        throw new Error('Falha ao salvar');
      }
    } catch (error) {
      alert('Erro ao salvar atualização: ' + error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl gradient-purple flex items-center justify-center shadow-card">
          <Settings className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Administração REAL</h1>
          <p className="text-muted-foreground">
            Sistema que realmente funciona - produtos aparecem no menu e dados persistem.
          </p>
        </div>
      </div>

      <Tabs defaultValue="updates" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="updates" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Atualizações
          </TabsTrigger>
          <TabsTrigger value="create-product" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Criar Produto REAL
          </TabsTrigger>
          <TabsTrigger value="edit-home" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Editor da Home REAL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="updates" className="space-y-6">
          <Card className="shadow-modern">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Gerenciar Atualizações REAIS
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Edite o card de atualizações que aparece no topo da página inicial.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="update-title">Título</Label>
                <Input
                  id="update-title"
                  value={updateData.title}
                  onChange={(e) => setUpdateData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Título da atualização"
                />
              </div>
              
              <div>
                <Label htmlFor="update-description">Descrição</Label>
                <Textarea
                  id="update-description"
                  value={updateData.description}
                  onChange={(e) => setUpdateData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição da atualização"
                  rows={4}
                />
              </div>
              
              <div>
                <Label htmlFor="update-date">Data</Label>
                <Input
                  id="update-date"
                  value={updateData.date}
                  onChange={(e) => setUpdateData(prev => ({ ...prev, date: e.target.value }))}
                  placeholder="Data da atualização"
                />
              </div>
              
              <Button onClick={saveUpdateData} className="gradient-purple text-white">
                <Bell className="w-4 h-4 mr-2" />
                Salvar Atualização REAL
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create-product">
          <RealProductCreator />
        </TabsContent>

        <TabsContent value="edit-home">
          <RealHomeEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}

