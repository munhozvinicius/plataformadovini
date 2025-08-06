import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Bell, Edit, Plus, Trash2, Bot, Package, Eye, EyeOff } from 'lucide-react';
import ProductEditor from '@/components/admin/ProductEditor';
import ProductCreator from '@/components/admin/ProductCreator';
import ProductOrderManager from '@/components/admin/ProductOrderManager';
import HomeEditor from '@/components/admin/HomeEditor';

export default function Admin() {
  // Estados para Atualizações
  const [updateData, setUpdateData] = useState({
    title: 'Última Atualização',
    description: 'Sistema atualizado com novas funcionalidades e melhorias na interface. Confira os novos recursos disponíveis na área administrativa.',
    date: '31/07/2025'
  });



  // Estados para Edição de Produtos
  const [selectedProduct, setSelectedProduct] = useState('vivo-sip');

  const [products, setProducts] = useState({});
  const [hiddenProducts, setHiddenProducts] = useState({});

  // Carregar dados do localStorage ao inicializar
  useEffect(() => {
    const savedUpdateData = localStorage.getItem('admin-update-data');
    if (savedUpdateData) {
      setUpdateData(JSON.parse(savedUpdateData));
    }

    const savedProducts = localStorage.getItem("admin-products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }

    const savedHiddenProducts = localStorage.getItem("admin-hidden-products");
    if (savedHiddenProducts) {
      setHiddenProducts(JSON.parse(savedHiddenProducts));
    }
  }, []);

  // Funções para Atualizações
  const saveUpdateData = () => {
    localStorage.setItem("admin-update-data", JSON.stringify(updateData));
    alert("Atualização salva com sucesso!");
  };

  // Funções para gerenciamento de produtos
  const deleteProduct = (productId) => {
    if (confirm("Tem certeza que deseja excluir este produto permanentemente?")) {
      // Remover da lista de produtos
      const updatedProducts = { ...products };
      delete updatedProducts[productId];
      setProducts(updatedProducts);
      localStorage.setItem("admin-products", JSON.stringify(updatedProducts));

      // Remover dados detalhados do produto
      localStorage.removeItem(`product-data-${productId}`);

      // Remover da lista de produtos ocultos se estiver lá
      const updatedHiddenProducts = { ...hiddenProducts };
      delete updatedHiddenProducts[productId];
      setHiddenProducts(updatedHiddenProducts);
      localStorage.setItem("admin-hidden-products", JSON.stringify(updatedHiddenProducts));

      alert("Produto excluído com sucesso!");
    }
  };

  const toggleProductVisibility = (productId) => {
    const updatedHiddenProducts = { ...hiddenProducts };
    
    if (updatedHiddenProducts[productId]) {
      // Produto está oculto, vamos mostrá-lo
      delete updatedHiddenProducts[productId];
    } else {
      // Produto está visível, vamos ocultá-lo
      updatedHiddenProducts[productId] = true;
    }
    
    setHiddenProducts(updatedHiddenProducts);
    localStorage.setItem("admin-hidden-products", JSON.stringify(updatedHiddenProducts));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full gradient-purple flex items-center justify-center shadow-card">
          <Settings className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Administração</h1>
          <p className="text-muted-foreground">Gerencie atualizações, cards e preços do sistema.</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="atualizacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="atualizacoes" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Atualizações
          </TabsTrigger>
          <TabsTrigger value="produtos" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Editar Produtos
          </TabsTrigger>
          <TabsTrigger value="desenvolver-produtos" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Desenvolver Produtos
          </TabsTrigger>
          <TabsTrigger value="ordem-produtos" className="flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Ordem dos Produtos
          </TabsTrigger>
          <TabsTrigger value="home-editor" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Editor da Home
          </TabsTrigger>
        </TabsList>

        {/* Aba Atualizações */}
        <TabsContent value="atualizacoes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Gerenciar Atualizações
              </CardTitle>
              <p className="text-muted-foreground">
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
              <Button onClick={saveUpdateData} className="w-full">
                <Bell className="w-4 h-4 mr-2" />
                Salvar Atualização
              </Button>
            </CardContent>
          </Card>
        </TabsContent>



        {/* Aba Desenvolver Produtos */}
        <TabsContent value="desenvolver-produtos">
          <ProductCreator />
        </TabsContent>

        {/* Aba Editar Produtos */}
        <TabsContent value="produtos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Editar Produtos
              </CardTitle>
              <p className="text-muted-foreground">
                Selecione um produto para editar suas características, preços e observações.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dropdown de Seleção de Produto Fixo no Topo */}
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <Label htmlFor="product-select" className="text-sm font-medium">
                    Selecionar Produto:
                  </Label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger className="w-[300px]">
                      <SelectValue placeholder="Selecione um produto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vivo-sip">📞 Vivo SIP</SelectItem>
                      <SelectItem value="vivo-0800">📞 Vivo 0800</SelectItem>
                      <SelectItem value="vivo-voz-negocios">🎤 Vivo Voz Negócios</SelectItem>
                      <SelectItem value="vivo-internet-fibra">📡 Vivo Internet (Fibra)</SelectItem>
                      <SelectItem value="vivo-internet-dedicada">🌐 Vivo Internet Dedicada</SelectItem>
                      <SelectItem value="combo-vivo-sip-internet-dedicada">📦 Combo Vivo SIP + Internet Dedicada</SelectItem>
                      <SelectItem value="licencas-microsoft">💻 Licenças Microsoft</SelectItem>
                      <SelectItem value="ajuda-ai">🤖 Ajuda AI</SelectItem>
                      {/* Produtos criados dinamicamente */}
                      {Object.entries(products).map(([productId, productName]) => (
                        <SelectItem key={productId} value={productId}>
                          {productName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Ícones de Ações */}
                {selectedProduct && (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleProductVisibility(selectedProduct)}
                      className={hiddenProducts[selectedProduct] ? "text-green-600" : "text-orange-600"}
                      title={hiddenProducts[selectedProduct] ? "Mostrar no menu lateral" : "Ocultar do menu lateral"}
                    >
                      {hiddenProducts[selectedProduct] ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteProduct(selectedProduct)}
                      className="text-red-600 hover:text-red-700"
                      title="Excluir produto permanentemente"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Editor de Produto */}
              {selectedProduct && (
                <div className="border-t pt-6">
                  <ProductEditor productId={selectedProduct} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Ordem dos Produtos */}
        <TabsContent value="ordem-produtos">
          <ProductOrderManager />
        </TabsContent>

        {/* Aba Editor da Home */}
        <TabsContent value="home-editor">
          <HomeEditor />
        </TabsContent>

      </Tabs>
    </div>
  );
}

