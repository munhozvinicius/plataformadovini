import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Trash2, Eye, EyeOff, Plus, Save, RotateCcw, Edit3 } from 'lucide-react';
import DynamicTable from './DynamicTable';
import { useProducts } from '../../hooks/useProducts';

const ProductEditor = () => {
  const { products, updateProduct, deleteProduct, toggleProductVisibility, loading } = useProducts();
  const [selectedProductId, setSelectedProductId] = useState('');
  const [productData, setProductData] = useState({
    name: '',
    emoji: '📞',
    characteristics: '',
    characteristics_title: 'Características Principais',
    pricing_table: [],
    pricing_table_title: 'Tabela de Preços',
    observations: '',
    observations_title: 'Observações Importantes',
    ai_agents: []
  });
  const [editingTitles, setEditingTitles] = useState({
    characteristics: false,
    pricing: false,
    observations: false
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedProductId && products.length > 0) {
      const product = products.find(p => p.id === selectedProductId);
      if (product) {
        setProductData({
          name: product.name || '',
          emoji: product.emoji || '📞',
          characteristics: product.characteristics || '',
          characteristics_title: product.characteristics_title || 'Características Principais',
          pricing_table: product.pricing_table || [],
          pricing_table_title: product.pricing_table_title || 'Tabela de Preços',
          observations: product.observations || '',
          observations_title: product.observations_title || 'Observações Importantes',
          ai_agents: product.ai_agents || []
        });
      }
    }
  }, [selectedProductId, products]);

  const handleSave = async () => {
    if (!selectedProductId) return;
    
    setSaving(true);
    try {
      await updateProduct(selectedProductId, productData);
      alert('Produto atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar produto: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (productId) => {
    if (confirm('Tem certeza que deseja excluir este produto permanentemente?')) {
      try {
        await deleteProduct(productId);
        if (selectedProductId === productId) {
          setSelectedProductId('');
        }
        alert('Produto excluído com sucesso!');
      } catch (error) {
        alert('Erro ao excluir produto: ' + error.message);
      }
    }
  };

  const handleToggleVisibility = async (productId) => {
    try {
      await toggleProductVisibility(productId);
      alert('Visibilidade do produto alterada com sucesso!');
    } catch (error) {
      alert('Erro ao alterar visibilidade: ' + error.message);
    }
  };

  const updateField = (field, value) => {
    setProductData(prev => ({ ...prev, [field]: value }));
  };

  const addAiAgent = () => {
    const newAgent = {
      id: Date.now().toString(),
      title: 'Nome do agente IA',
      description: 'Descrição do agente IA',
      url: 'https://exemplo.com'
    };
    setProductData(prev => ({
      ...prev,
      ai_agents: [...prev.ai_agents, newAgent]
    }));
  };

  const updateAiAgent = (agentId, field, value) => {
    setProductData(prev => ({
      ...prev,
      ai_agents: prev.ai_agents.map(agent =>
        agent.id === agentId ? { ...agent, [field]: value } : agent
      )
    }));
  };

  const removeAiAgent = (agentId) => {
    setProductData(prev => ({
      ...prev,
      ai_agents: prev.ai_agents.filter(agent => agent.id !== agentId)
    }));
  };

  const handleTitleEdit = (section, newTitle) => {
    updateField(`${section}_title`, newTitle);
    setEditingTitles(prev => ({ ...prev, [section]: false }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Carregando produtos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">✏️ Editar Produtos</h2>
          <p className="text-gray-600">
            Selecione um produto para editar seu conteúdo, preços e configurações.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Restaurar Padrão
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!selectedProductId || saving}
          >
            <Save className="w-4 h-4 mr-1" />
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </div>

      {/* Dropdown de Seleção de Produto */}
      <Card>
        <CardHeader>
          <CardTitle>Selecionar Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha um produto para editar" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.emoji} {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedProductId && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleVisibility(selectedProductId)}
                  className="text-blue-600 border-blue-300 hover:bg-blue-50"
                >
                  {products.find(p => p.id === selectedProductId)?.visible ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-1" />
                      Ocultar
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-1" />
                      Mostrar
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(selectedProductId)}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Excluir
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedProductId && (
        <Tabs defaultValue="characteristics" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="characteristics">Características</TabsTrigger>
            <TabsTrigger value="pricing">Tabela de Preços</TabsTrigger>
            <TabsTrigger value="observations">Observações</TabsTrigger>
            <TabsTrigger value="ai-agents">Agentes IA</TabsTrigger>
          </TabsList>

          <TabsContent value="characteristics" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {editingTitles.characteristics ? (
                    <Input
                      value={productData.characteristics_title}
                      onChange={(e) => updateField('characteristics_title', e.target.value)}
                      onBlur={() => handleTitleEdit('characteristics', productData.characteristics_title)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleTitleEdit('characteristics', productData.characteristics_title);
                        }
                      }}
                      className="text-lg font-semibold"
                      autoFocus
                    />
                  ) : (
                    <CardTitle 
                      className="cursor-pointer hover:text-blue-600 flex items-center gap-2"
                      onClick={() => setEditingTitles(prev => ({ ...prev, characteristics: true }))}
                    >
                      {productData.characteristics_title}
                      <Edit3 className="w-4 h-4 opacity-50" />
                    </CardTitle>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={productData.characteristics}
                  onChange={(e) => updateField('characteristics', e.target.value)}
                  placeholder="Descreva as características principais do produto..."
                  rows={6}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {editingTitles.pricing ? (
                    <Input
                      value={productData.pricing_table_title}
                      onChange={(e) => updateField('pricing_table_title', e.target.value)}
                      onBlur={() => handleTitleEdit('pricing', productData.pricing_table_title)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleTitleEdit('pricing', productData.pricing_table_title);
                        }
                      }}
                      className="text-lg font-semibold"
                      autoFocus
                    />
                  ) : (
                    <CardTitle 
                      className="cursor-pointer hover:text-blue-600 flex items-center gap-2"
                      onClick={() => setEditingTitles(prev => ({ ...prev, pricing: true }))}
                    >
                      {productData.pricing_table_title}
                      <Edit3 className="w-4 h-4 opacity-50" />
                    </CardTitle>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <DynamicTable
                  data={productData.pricing_table}
                  onChange={(newData) => updateField('pricing_table', newData)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="observations" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {editingTitles.observations ? (
                    <Input
                      value={productData.observations_title}
                      onChange={(e) => updateField('observations_title', e.target.value)}
                      onBlur={() => handleTitleEdit('observations', productData.observations_title)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleTitleEdit('observations', productData.observations_title);
                        }
                      }}
                      className="text-lg font-semibold"
                      autoFocus
                    />
                  ) : (
                    <CardTitle 
                      className="cursor-pointer hover:text-blue-600 flex items-center gap-2"
                      onClick={() => setEditingTitles(prev => ({ ...prev, observations: true }))}
                    >
                      {productData.observations_title}
                      <Edit3 className="w-4 h-4 opacity-50" />
                    </CardTitle>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={productData.observations}
                  onChange={(e) => updateField('observations', e.target.value)}
                  placeholder="Digite observações importantes sobre o produto..."
                  rows={6}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-agents" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>🤖 Agentes IA</CardTitle>
                  <Button onClick={addAiAgent} variant="outline">
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar Agente
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {productData.ai_agents.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Nenhum agente IA configurado. Clique em "Adicionar Agente" para começar.
                  </p>
                ) : (
                  productData.ai_agents.map((agent) => (
                    <Card key={agent.id} className="border border-purple-200">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium">Título do Agente</h5>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeAiAgent(agent.id)}
                              className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <Input
                            placeholder="Nome do agente IA"
                            value={agent.title}
                            onChange={(e) => updateAiAgent(agent.id, 'title', e.target.value)}
                          />
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Descrição</label>
                            <Textarea
                              placeholder="Descrição do agente IA"
                              value={agent.description}
                              onChange={(e) => updateAiAgent(agent.id, 'description', e.target.value)}
                              rows={2}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Link de Acesso</label>
                            <Input
                              placeholder="URL do agente IA"
                              value={agent.url}
                              onChange={(e) => updateAiAgent(agent.id, 'url', e.target.value)}
                            />
                          </div>
                          
                          {/* Preview do botão */}
                          {agent.title && agent.url && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-600 mb-2">Preview do botão:</p>
                              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                🔗 Acessar {agent.title}
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ProductEditor;

